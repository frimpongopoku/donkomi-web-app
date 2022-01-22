import React from "react";
import PageWrapper from "../../wrapper/PageWrapper";
import FormGenerator from "../../../components/form generator";
import PageTitle from "../../../components/page title/PageTitle";
function NewProductForm() {
  const fields = [
    {
      fieldType: FormGenerator.FieldTypes.INPUT,
      placeholder: "Enter name of item... Eg. Leggings, chips, burger",
      label: "What is this? What am I buying?",
      name: " Item Name",
      dbName: "name",
      _generics: { maxLength: "50" },
      required: true,
    },
    {
      fieldType: FormGenerator.FieldTypes.INPUT,
      placeholder: "Eg. Large, or XXL",
      label: "Many of them like it large! What size is this in? (optional)",
      name: " Size",
      dbName: "size",
    },
    {
      fieldType: FormGenerator.FieldTypes.INPUT,
      placeholder: "Enter variation (20 chars)",
      label: "What variant is this? Spicy? Short? Omicron? (optional)",
      name: "Variation",
      dbName: "variation",
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
    },
    {
      fieldType: FormGenerator.FieldTypes.DROPDOWN,
      placeholder: "Choose shop the item should be in...",
      label: "Which shop should this item be in?",
      name: "Shop",
      data: ["Akwesi's shops", "Biibi Kisok", "Bombo"],
      dbName: "shop_id",
      type: "full",
      required: true,
    },
    {
      fieldType: FormGenerator.FieldTypes.MEDIAUPLOAD,
      label:
        "Well, its better if your customers can see what they are buying....",
      placeholder: "Upload an image",
      name: "image",
      dbName: "image",
      required: true,
    },
  ];
  return (
    <PageWrapper>
      <PageTitle
        title="Create New Product"
        subtitle="Choose a shop, add an item you sell -- its that easy!"
      />

      <FormGenerator
        onSubmit={(form) => console.log("This is from onsubmit togh", form)}
        fields={fields}
        actionText="Submit New Product"
      />
    </PageWrapper>
  );
}

export default NewProductForm;
