import React from "react";
import PageWrapper from "../wrapper/PageWrapper";
import "./CreateShop.css";
import FormGenerator from "./../../components/form generator/";
import PageTitle from "../../components/page title/PageTitle";

const fields = [
  {
    dbName: "name",
    required: true,
    label: "What is this? What are you selling? ",
    placeholder: "Name of item...",
    fieldType: FormGenerator.FieldTypes.INPUT,
  },
  {
    dbName: "size",
    label: "Are there different sizes of the item?",
    placeholder: "Enter size here...",
    fieldType: FormGenerator.FieldTypes.INPUT,
  },
  {
    dbName: "variation",
    label: "Are there different variations of the item?",
    placeholder: "Enter variant here...",
    fieldType: FormGenerator.FieldTypes.INPUT,
  },
  {
    dbName: "price",
    label: "People love low prices, just so you know",
    placeholder: "Enter Price in rupees(Rs) here...",
    fieldType: FormGenerator.FieldTypes.INPUT,
    required: true,
  },
  {
    dbName: "image",
    required: true,
    label:
      "Its helps if people know what they are buying. You should add a photo!",
    placeholder: "Select a photo of your item from your device",
    fieldType: FormGenerator.FieldTypes.MEDIAUPLOAD,
  },
];
function CreateShopItem() {
  return (
    <PageWrapper>
      <div className="create-shop-container">
        <PageTitle
          className="intro-box"
          subtitle="Add items that you sell to your shops, thats how people can buy from you"
          title="Add Shop Item"
        />

        <div className="form-area">
          <FormGenerator fields={fields} />
        </div>
      </div>
    </PageWrapper>
  );
}

export default CreateShopItem;
