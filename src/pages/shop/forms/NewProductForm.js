import React, { useEffect } from "react";
import PageWrapper from "../../wrapper/PageWrapper";
import FormGenerator from "../../../components/form generator";
import PageTitle from "../../../components/page title/PageTitle";
import { reduxAddNewProduct } from "../../../redux/actions/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PREVIOUS_PAGE } from "../../../redux/ReduxConstants";
import { pop } from "../../../components/form generator/shared/utils/utils";
import Notification from "../../../components/form generator/notification/Notification";
import Loader from "../../../components/cover loader/Loader";
import FirebaseImageUploader from "../../../shared/classes/ImageUploader";
import { CREATE_A_PRODUCT, UPDATE_A_PRODUCT } from "../../../api/urls";
import { contentHasChanged } from "../../../shared/js/utils";

const PRODUCT_FORM = "product_form";
function NewProductForm({ products, shops, addProductToShop, explorer }) {
  const [old, setOldFormContent] = useState({});
  const [itemToEdit, setItemToEdit] = useState({});
  const [notification, setNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const isInEditMode = id;
  const goto = useNavigate();

  const getValue = (key, cb) => {
    var value;
    if (isInEditMode) {
      value = (itemToEdit || [])[key];
      if (cb) return cb(value);
      return value;
    }

    value = old[key] || "";
    if (cb) return cb(value);
    return value;
  };

  const fields = [
    !isInEditMode && {
      fieldType: FormGenerator.FieldTypes.DROPDOWN,
      placeholder: "Choose shop the item should be in...",
      label: "Which shop should this product be in?",
      name: "Shop",
      data: shops || [],
      labelExtractor: (shop) => shop?.name,
      valueExtractor: (shop) => shop?.id,
      dbName: "shop",
      type: "full",
      required: true,
      value: getValue("shops", (shops) => (shops || [])[0]),
    },
    {
      fieldType: FormGenerator.FieldTypes.INPUT,
      placeholder: "Enter name of item... Eg. Leggings, chips, burger",
      label: "What is this? What are customers buying?",
      name: " Item Name",
      dbName: "name",
      _generics: { maxLength: "50" },
      required: true,
      value: getValue("name"),
    },
    {
      fieldType: FormGenerator.FieldTypes.INPUT,
      placeholder: "Enter price in rupees. Eg 210",
      label:
        "The big question, how much? Just so you know, the lower the better!",
      name: "Item Price",
      dbName: "price",
      _generics: { min: 0, type: "number" },
      required: true,
      value: getValue("price") || 0,
      validator: (value) => [
        value >= 0,
        "You cannot add a negative number as 'price'",
      ],
    },
    {
      fieldType: FormGenerator.FieldTypes.MEDIAUPLOAD,
      label:
        "Well, its better if your customers can see what they are buying....",
      placeholder: "Upload an image",
      name: "image",
      dbName: "image",
      required: true,
      value: getValue("image"),
    },
    {
      fieldType: FormGenerator.FieldTypes.INPUT,
      placeholder: "Eg. Large, or XXL",
      label: "Many of them like it large! What size is this in? (optional)",
      name: " Size",
      dbName: "size",
      value: getValue("size"),
    },
    {
      fieldType: FormGenerator.FieldTypes.INPUT,
      placeholder: "Enter variation (20 chars)",
      label: "What variant is this? Spicy? Short? Omicron? (optional)",
      name: "Variation",
      dbName: "variation",
      value: getValue("variation"),
    },
  ];

  const sendUpdatesToApi = (data, cb) => {
    explorer
      .send(UPDATE_A_PRODUCT, "POST", data)
      .then((response) => {
        setLoading(false);
        if (!response.success)
          return setNotification({ message: response.error.message });
        cb && cb(response.data);
      })
      .catch((e) => {
        setLoading(false);
        setNotification({ message: e.toString() });
      });
  };

  const userHasChangedImage = (data) => {
    const old = itemToEdit?.image;
    const current = data?.image;
    if (old !== current) return true;
    return false;
  };

  const updateProductInBackend = (data, cb) => {
    if (!contentHasChanged(data, itemToEdit)) return goto(PREVIOUS_PAGE);
    data.shop_id = data.shop?.id;
    delete data.shop;
    const apiBody = { product_id: itemToEdit?.id, data }; // put id back in
    console.log("I am the api body bro", apiBody);
    if (!userHasChangedImage(data)) return sendUpdatesToApi(apiBody, cb);
    // -------- User has changed image so upload new image and delete other one, then save changes--------
    uploadShopCoverPhoto(data.image.file, (url, error) => {
      if (error) {
        setLoading(false);
        return setNotification({ type: "bad", message: error?.toString() });
      }
      FirebaseImageUploader.deleteImageFromStorage(itemToEdit?.image);
      apiBody.data.image = url;
      sendUpdatesToApi(apiBody, cb);
    });
  };

  const updateProduct = (data) => {
    const { rest, index, found } = pop(
      products,
      (item) => item?.id?.toString() === id?.toString()
    );
    if (!found) return;
    setLoading(true);
    updateProductInBackend(data, (newProduct) => {
      rest.splice(index, 0, newProduct);
      addProductToShop(rest);
      goto(PREVIOUS_PAGE);
      localStorage.removeItem(PRODUCT_FORM);
    });
  };

  const submit = (data, resetForm) => {
    setNotification(null);
    if (isInEditMode) return updateProduct(data);
    createProduct(data, resetForm);
  };

  const createProduct = (data, resetForm) => {
    setLoading(true);
    data.image = data.image.file;
    data.shop_id = data.shop.id;
    delete data.shop;
    createBackendProduct(data, (newProduct) => {
      addProductToShop([newProduct, ...(products || [])]);
      resetForm && resetForm();
      localStorage.removeItem(PRODUCT_FORM);
      setOldFormContent({});
    });
  };

  const uploadShopCoverPhoto = (image, cb) => {
    FirebaseImageUploader.uploadImageToFirebase(
      FirebaseImageUploader.SHOP_PHOTO_BUCKET,
      image,
      (url) => cb && cb(url),
      (error) => {
        cb && cb(null, error);
        console.log("IMAGE_UPLOAD_ERROR:", error);
      }
    );
  };

  const createBackendProduct = (data, cb) => {
    uploadShopCoverPhoto(data.image, (url, error) => {
      if (error) {
        setLoading(false);
        return setNotification({ type: "bad", message: error?.toString() });
      }
      console.log("This is the data to be sent", data);
      data.image = url;
      explorer
        .send(CREATE_A_PRODUCT, "POST", data)
        .then((response) => {
          if (response.error.status)
            return setNotification({
              message: response?.error?.message,
            });
          setLoading(false);
          cb && cb(response.data);
        })
        .catch((e) => {
          setLoading(false);
          console.log("BACKEND_SHOP_CREATING_ERROR", e.toString());
        });
    });
  };

  useEffect(() => {
    const content = JSON.parse(localStorage.getItem(PRODUCT_FORM) || "{}");
    setOldFormContent(content);
  }, []);

  useEffect(() => {
    if (isInEditMode) {
      const found = products?.find(
        (item) => item.id?.toString() === id.toString()
      );
      setItemToEdit(found || {});
    }
  }, []);

  const saveFormProgress = (formState) => {
    var form = formState.form || {};
    form = { ...form }; // just to unlink reference from main object, cos I want to delete the image field
    delete form.image;
    localStorage.setItem(PRODUCT_FORM, JSON.stringify(form));
  };

  return (
    <PageWrapper showBack>
      <PageTitle
        title={isInEditMode ? "Update Your Product" : "Create New Product"}
        subtitle={
          isInEditMode
            ? "Edit your product with the prefilled form below"
            : "Select one of your shops, add an item you sell -- its that easy!"
        }
      />
      {notification && (
        <Notification message={notification.message} type="bad" />
      )}
      <FormGenerator
        onSubmit={submit}
        fields={fields}
        actionText={isInEditMode ? "Update Product" : "Submit New Product"}
        formWillUnMount={(data) => !isInEditMode && saveFormProgress(data)}
      />

      {loading && <Loader label="We are creating your shop..." />}
    </PageWrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.userProducts,
    shops: state.userShops,
    explorer: state.explorer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addProductToShop: reduxAddNewProduct,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm);
