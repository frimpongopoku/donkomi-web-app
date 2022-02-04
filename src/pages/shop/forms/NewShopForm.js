import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { CREATE_A_SHOP, UPDATE_A_SHOP } from "../../../api/urls";
import FormGenerator from "../../../components/form generator";
import { pop } from "../../../components/form generator/shared/utils/utils";
import PageTitle from "../../../components/page title/PageTitle";
import {
  reduxAddNewShop,
  reduxUpdateFormHolder,
} from "../../../redux/actions/actions";
import { PREVIOUS_PAGE } from "../../../redux/ReduxConstants";
import PageWrapper from "../../wrapper/PageWrapper";
import FirebaseImageUploader from "./../../../shared/classes/ImageUploader";
import Loader from "../../../components/cover loader/Loader";
import Notification from "../../../components/form generator/notification/Notification";
import { contentHasChanged } from "../../../shared/js/utils";
const SHOP_FORM = "shop_form";
function NewShopForm({ shops, addShopToRedux, explorer }) {
  const [old, setOldFormContent] = useState({});
  const [itemToEdit, setItemToEdit] = useState({});
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const isInEditMode = id;
  const goto = useNavigate();

  const getValue = (key) => {
    if (isInEditMode) return (itemToEdit || [])[key];
    return old[key];
  };
  const fields = [
    {
      name: "shop name",
      dbName: "name",
      fieldType: FormGenerator.FieldTypes.INPUT,
      label: "This is where you give your shop a cool name!",
      placeholder: "Enter the name of your shop....",
      maxLength: 20,
      required: true,
      value: getValue("name"),
    },
    {
      name: "shop description",
      dbName: "description",
      fieldType: FormGenerator.FieldTypes.TEXTAREA,
      label:
        "People need to know the kind of items you sell in this shop. Use the textbox to tell them...",
      placeholder: "Enter a brief description of the kind of items you sell...",
      maxLength: 300,
      required: true,
      value: getValue("description"),
    },
    {
      name: "cover photo",
      dbName: "image",
      fieldType: FormGenerator.FieldTypes.MEDIAUPLOAD,
      label: "Add a photo that best represents your shop",
      maxLength: 300,
      required: true,
      value: getValue("image"),
    },
  ];

  const userHasChangedImage = (data) => {
    const old = itemToEdit?.image;
    const current = old?.image;
    if (old !== current) return true;
    return false;
  };

  const sendUpdatesToApi = (data, cb) => {
    explorer
      .send(UPDATE_A_SHOP, "POST", data)
      .then((response) => {
        if (response.error.status)
          return setNotification({ message: response.error.messsage });
        cb && cb(response.data);
      })
      .catch((e) => setNotification({ message: e.toString() }));
  };
  const updateShopInBackend = (data, cb) => {
    if (!contentHasChanged(data, itemToEdit)) return goto(PREVIOUS_PAGE);
    if (!userHasChangedImage(data)) sendUpdatesToApi(data, cb);
    // -------- User has changed image so upload new image and delete other one, then save changes--------
    uploadShopCoverPhoto(data.image, (url, error) => {
      if (error) {
        setLoading(false);
        return setNotification({ type: "bad", message: error?.toString() });
      }
      data.image = url;
      sendUpdatesToApi(data, cb);
    });
  };
  const updateShop = (data) => {
    const { rest, index, found } = pop(
      shops,
      (item) => item?.id?.toString() === id?.toString()
    );
    if (!found) return;
    updateShopInBackend(data, (updatedShop) => {
      rest.splice(index, 0, updatedShop);
      addShopToRedux(rest);
      goto(PREVIOUS_PAGE);
      localStorage.removeItem(SHOP_FORM);
    });
  };

  const submit = (data, resetForm) => {
    if (isInEditMode) return updateShop(data);
    createShop(data, resetForm);
  };

  const createShop = (data, resetForm) => {
    data.image = data.image.file;
    setLoading(true);
    createBackendShop(data, (newShop) => {
      addShopToRedux([newShop, ...(shops || [])]);
      resetForm && resetForm();
      localStorage.removeItem(SHOP_FORM);
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

  const createBackendShop = (data, cb) => {
    uploadShopCoverPhoto(data.image, (url, error) => {
      if (error) {
        setLoading(false);
        return setNotification({ type: "bad", message: error?.toString() });
      }
      data.image = url;
      explorer
        .send(CREATE_A_SHOP, "POST", data)
        .then((response) => {
          if (response.error.status)
            return setNotification({
              type: "bad",
              message: response?.error?.message,
            });

          cb && cb(response.data);
        })
        .catch((e) => {
          setLoading(false);
          console.log("BACKEND_SHOP_CREATING_ERROR", e.toString());
        });
    });
  };

  const saveFormProgress = (formState) => {
    var form = formState.form || {};
    form = { ...form }; // just to unlink reference from main object, cos I want to delete the image field
    delete form.image;
    localStorage.setItem(SHOP_FORM, JSON.stringify(form));
  };

  useEffect(() => {
    const content = JSON.parse(localStorage.getItem(SHOP_FORM) || "{}");
    setOldFormContent(content);
  }, []);

  useEffect(() => {
    if (isInEditMode) {
      const found = shops?.find(
        (item) => item.id?.toString() === id.toString()
      );
      setItemToEdit(found || {});
    }
  }, []);

  return (
    <PageWrapper showBack={true}>
      <PageTitle
        title={isInEditMode ? "Edit Your Shop" : "Create New Shop"}
        subtitle={
          isInEditMode
            ? "Make changes to your shop with the form below"
            : "Use the form below to add a new shop. All the cool sellers dont sell burgers and TVs in the same shop, they create new shops for each kind of product!"
        }
      />
      {notification && (
        <Notification message="This is anotification bro" type="bad" />
      )}
      <FormGenerator
        fields={fields}
        onSubmit={submit}
        actionText={isInEditMode ? "Update Shop" : "Submit New Shop"}
        formWillUnMount={(data) => !isInEditMode && saveFormProgress(data)}
      />

      {loading && <Loader label="We are creating your shop..." />}
    </PageWrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    formHolder: state.form,
    shops: state.userShops,
    explorer: state.explorer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      saveInStore: reduxUpdateFormHolder,
      addShopToRedux: reduxAddNewShop,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(NewShopForm);
