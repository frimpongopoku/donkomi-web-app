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

const PRODUCT_FORM = "product_form";
function NewProductForm({ products, shops, addProductToShop }) {
  const [old, setOldFormContent] = useState({});
  const [itemToEdit, setItemToEdit] = useState({});
  const { id } = useParams();
  const isInEditMode = id;
  const goto = useNavigate();

  const getValue = (key) => {
    if (isInEditMode) return (itemToEdit || [])[key];
    return old[key] || "";
  };

  const fields = [
    {
      fieldType: FormGenerator.FieldTypes.DROPDOWN,
      placeholder: "Choose shop the item should be in...",
      label: "Which shop should this product be in?",
      name: "Shop",
      data: ["Akwesi's shops", "Biibi Kisok", "Bombo"],
      dbName: "shop_id",
      type: "full",
      required: true,
      value: getValue("shop_id"),
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

  const updateProduct = (data) => {
    const { rest, index, found } = pop(
      products,
      (item) => item?.id?.toString() === id?.toString()
    );
    if (!found) return;
    rest.splice(index, 0, data);
    addProductToShop(rest);
    goto(PREVIOUS_PAGE);
    localStorage.removeItem(PRODUCT_FORM);
  };

  const submit = (data, resetForm) => {
    if (isInEditMode) return updateProduct(data);
    createProduct(data, resetForm);
  };

  const createProduct = (data, resetForm) => {
    addProductToShop([
      { id: Date.now().toString(), ...data },
      ...(products || []),
    ]);
    resetForm && resetForm();
    localStorage.removeItem(PRODUCT_FORM);
    setOldFormContent({});
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
    <PageWrapper>
      <PageTitle
        title={isInEditMode ? "Update Your Product" : "Create New Product"}
        subtitle={
          isInEditMode
            ? "Edit your product with the prefilled form below"
            : "Select one of your shops, add an item you sell -- its that easy!"
        }
      />

      <FormGenerator
        onSubmit={submit}
        fields={fields}
        actionText={isInEditMode ? "Update Product" : "Submit New Product"}
        formWillUnMount={(data) => !isInEditMode && saveFormProgress(data)}
      />
    </PageWrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.userProducts,
    shops: state.userShops,
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
