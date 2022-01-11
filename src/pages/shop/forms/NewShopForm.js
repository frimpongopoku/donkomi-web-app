import React from "react";
import FormGenerator from "../../../components/form generator";
import PageTitle from "../../../components/page title/PageTitle";
import PageWrapper from "../../wrapper/PageWrapper";

function NewShopForm() {
  const fields = [
    {
      name: "shop name",
      dbName: "shop_name",
      fieldType: FormGenerator.FieldTypes.INPUT,
      label: "This is where you give your shop a cool name!",
      placeholder: "Enter the name of your shop....",
      maxLength: 20,
      required: true,
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
  return (
    <PageWrapper>
      <PageTitle
        title="Create New Shop"
        subtitle="Use the form below to add a new shop. All the cool sellers dont sell burgers and TVs in the same shop, they create new shops for each kind of product!"
      />
      <FormGenerator fields={fields} />
    </PageWrapper>
  );
}

export default NewShopForm;
