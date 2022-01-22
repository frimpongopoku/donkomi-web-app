import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FormGenerator from "../../../components/form generator";
import PageTitle from "../../../components/page title/PageTitle";
import {
  reduxAddNewShop,
  reduxUpdateFormHolder,
} from "../../../redux/actions/actions";
import PageWrapper from "../../wrapper/PageWrapper";

const SHOP_FORM = "shop_form";
function NewShopForm({ shops, addShopToRedux }) {
  const [old, setOldFormContent] = useState({});
  const fields = [
    {
      name: "shop name",
      dbName: "shop_name",
      fieldType: FormGenerator.FieldTypes.INPUT,
      label: "This is where you give your shop a cool name!",
      placeholder: "Enter the name of your shop....",
      maxLength: 20,
      required: true,
      value: old["shop_name"] || "",
    },
    {
      name: "shop description",
      dbName: "about_shop",
      fieldType: FormGenerator.FieldTypes.TEXTAREA,
      label:
        "People need to know the kind of items you sell in this shop. Use the textbox to tell them...",
      placeholder: "Enter a brief description of the kind of items you sell...",
      maxLength: 300,
      required: true,
      value: old["about_shop"] || "",
    },
    {
      name: "cover photo",
      dbName: "image",
      fieldType: FormGenerator.FieldTypes.MEDIAUPLOAD,
      label: "Add a photo that best represents your shop",
      maxLength: 300,
      required: true,
    },
  ];

  const submit = (data, resetForm) => {
    console.log("I am teh submitted data", data);
    addShopToRedux([data, ...(shops || [])]);
    resetForm && resetForm();
    localStorage.removeItem(SHOP_FORM);
    setOldFormContent({});
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

  return (
    <PageWrapper>
      <PageTitle
        title="Create New Shop"
        subtitle="Use the form below to add a new shop. All the cool sellers dont sell burgers and TVs in the same shop, they create new shops for each kind of product!"
      />
      <FormGenerator
        fields={fields}
        onSubmit={submit}
        actionText="Submit New Shop"
        formWillUnMount={(data) => saveFormProgress(data)}
      />
    </PageWrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    formHolder: state.form,
    shops: state.userShops,
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
