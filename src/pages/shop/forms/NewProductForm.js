import React, { useEffect } from "react";
import PageWrapper from "../../wrapper/PageWrapper";
import FormGenerator from "../../../components/form generator";
import PageTitle from "../../../components/page title/PageTitle";
import { reduxAddNewProduct } from "../../../redux/actions/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useState } from "react";

const PRODUCT_FORM = "product_form";
function NewProductForm({ products, shops, addProductToShop }) {
  const [old, setOldFormContent] = useState({});
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
      value: old?.shop_id,
    },
    {
      fieldType: FormGenerator.FieldTypes.INPUT,
      placeholder: "Enter name of item... Eg. Leggings, chips, burger",
      label: "What is this? What are customers buying?",
      name: " Item Name",
      dbName: "name",
      _generics: { maxLength: "50" },
      required: true,
      value: old?.name || 0,
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
      value: old?.price || 0,
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
      value: old?.image,
    },
    {
      fieldType: FormGenerator.FieldTypes.INPUT,
      placeholder: "Eg. Large, or XXL",
      label: "Many of them like it large! What size is this in? (optional)",
      name: " Size",
      dbName: "size",
      value: old?.size || "",
    },
    {
      fieldType: FormGenerator.FieldTypes.INPUT,
      placeholder: "Enter variation (20 chars)",
      label: "What variant is this? Spicy? Short? Omicron? (optional)",
      name: "Variation",
      dbName: "variation",
      value: old?.variation || "",
    },
  ];

  const submit = (data, resetForm) => {
    addProductToShop([data, ...(products || [])]);
    resetForm && resetForm();
    localStorage.removeItem(PRODUCT_FORM);
    setOldFormContent({});
  };

  useEffect(() => {
    const content = JSON.parse(localStorage.getItem(PRODUCT_FORM) || "{}");
    setOldFormContent(content);
  }, []);

  const saveFormProgress = (formState) => {
    var form = formState.form || {};
    form = { ...form }; // just to unlink reference from main object, cos I want to delete the image field
    delete form.image;
    localStorage.setItem(PRODUCT_FORM, JSON.stringify(form));
  };

  console.log("I am the products", products);

  return (
    <PageWrapper>
      <PageTitle
        title="Create New Product"
        subtitle="Select one of your shops, add an item you sell -- its that easy!"
      />

      <FormGenerator
        onSubmit={submit}
        fields={fields}
        actionText="Submit New Product"
        formWillUnMount={(data) => saveFormProgress(data)}
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
