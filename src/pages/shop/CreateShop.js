import React from "react";
import PageWrapper from "../wrapper/PageWrapper";
import "./CreateShop.css";
import FormGenerator from "./../../components/form generator/";
import PageTitle from "../../components/page title/PageTitle";

const fields = [
  {
    dbName: "shop_name",
    required: true,
    label: "What would you like your shop to be known as? ",
    placeholder: "Enter shop name here...",
    fieldType: FormGenerator.FieldTypes.INPUT,
  },
  {
    dbName: "shop_description",
    required: true,
    label:
      "Briefly indicate what kind of items you will be selling in this shop ",
    placeholder: "Shop description here...",
    fieldType: FormGenerator.FieldTypes.TEXTAREA,
  },
  {
    dbName: "image",
    required: true,
    label: "Provide a cover photo for your shop",
    placeholder: "Select photo from your device",
    fieldType: FormGenerator.FieldTypes.MEDIAUPLOAD,
  },
];
function CreateShop() {
  return (
    <PageWrapper>
      <div className="create-shop-container">
        <PageTitle
          className="intro-box"
          subtitle="You are an entrepreneur, create as many shops as you want to group
            your stock"
          title="Create Your Shop"
        />

        <div className="form-area">
          <FormGenerator fields={fields} />
        </div>
      </div>
    </PageWrapper>
  );
}

export default CreateShop;
