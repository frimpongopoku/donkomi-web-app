import React from "react";
import PageWrapper from "../wrapper/PageWrapper";
import "./CreateShop.css";
import FormGenerator from "./../../components/form generator/";
import PageTitle from "../../components/page title/PageTitle";

const fields = [
  {
    dbName: "shop_name",
    required: true,
    label:
      "What would you like your shop to be known as? ( Victor's liquor store? Abena's shoe den? ) ",
    placeholder: "Enter shop name here...",
    fieldType: FormGenerator.FieldTypes.INPUT,
  },
  {
    dbName: "about_shop",
    required: true,
    label:
      "Briefly indicate what kind of items you will be selling in this shop ",
    placeholder: "Shop description here...",
    fieldType: FormGenerator.FieldTypes.TEXTAREA,
  },
  {
    dbName: "image",
    required: true,
    label: "People love images! Add a photo that best describes your shop.",
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
          <FormGenerator
            fields={fields}
            onChange={(state) => {
              console.log("THis be the onchangestate", state);
            }}
          />
        </div>
      </div>
    </PageWrapper>
  );
}

export default CreateShop;
