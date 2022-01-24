import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import FormGenerator from "../../../components/form generator";
import { pop } from "../../../components/form generator/shared/utils/utils";
import PageTitle from "../../../components/page title/PageTitle";
import {
  reduxAddNewShop,
  reduxUpdateFormHolder,
} from "../../../redux/actions/actions";
import { PREVIOUS_PAGE } from "../../../redux/ReduxConstants";
import PageWrapper from "../../wrapper/PageWrapper";

const SHOP_FORM = "shop_form";
function NewShopForm({ shops, addShopToRedux }) {
  const [old, setOldFormContent] = useState({});
  const [itemToEdit, setItemToEdit] = useState({});
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

  const updateShop = (data) => {
    const { rest, index, found } = pop(
      shops,
      (item) => item?.id?.toString() === id?.toString()
    );
    if (!found) return;
    rest.splice(index, 0, data);
    addShopToRedux(rest);
    goto(PREVIOUS_PAGE);
    localStorage.removeItem(SHOP_FORM);
  };

  const submit = (data, resetForm) => {
    if (isInEditMode) return updateShop(data);
    createShop(data, resetForm);
  };

  const createShop = (data, resetForm) => {
    addShopToRedux([{ id: Date.now()?.toString(), ...data }, ...(shops || [])]);
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
      <FormGenerator
        fields={fields}
        onSubmit={submit}
        actionText={isInEditMode ? "Update Shop" : "Submit New Shop"}
        formWillUnMount={(data) => !isInEditMode && saveFormProgress(data)}
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
