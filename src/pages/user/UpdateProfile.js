import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { UPDATE_USER_PROFILE } from "../../api/urls";
import Loader from "../../components/cover loader/Loader";
import FormGenerator from "../../components/form generator";
import Notification from "../../components/form generator/notification/Notification";
import PageTitle from "../../components/page title/PageTitle";
import { reduxSetDonkomiAuth } from "../../redux/actions/actions";
import { contentHasChanged } from "../../shared/js/utils";
import PageWrapper from "../wrapper/PageWrapper";

function UpdateProfile({ explorer, user, setUserInRedux }) {
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const getValue = (field) => {
    return user[field] || "";
  };

  useEffect(() => {}, [user]);

  const fields = [
    {
      fieldType: FormGenerator.FieldTypes.INPUT,
      placeholder: "First Name",
      label:
        "It would be great if you used what people know. Most times, its not what your mum gave you :)",
      name: "First Name",
      dbName: "firstName",
      value: getValue("firstName"),
    },
    {
      fieldType: FormGenerator.FieldTypes.INPUT,
      placeholder: "Last Name",
      label:
        "Got a last name? Leave it here. Cant remember, try to remember your dad :)",
      name: "Last Name",
      dbName: "lastName",
      value: getValue("lastName"),
    },
    {
      fieldType: FormGenerator.FieldTypes.INPUT,
      placeholder: "Preferred Name",
      label: "What would you like people to call you on this platform?",
      name: "Preferred Name",
      dbName: "preferred_name",
      required: true,
      value: getValue("preferred_name"),
    },
    {
      fieldType: FormGenerator.FieldTypes.INPUT,
      placeholder: "Phone Number",
      label: "How can your customers call you in Mauritius?",
      name: "Phone Number",
      _generics: { maxLength: "12" },
      dbName: "phone",
      value: getValue("phone"),
    },
    {
      fieldType: FormGenerator.FieldTypes.INPUT,
      placeholder: "Whatsapp Number",
      label: "Got whatsapp? Please drop the number",
      name: "Phone Number",
      _generics: { maxLength: "12" },
      dbName: "whatsapp_number",
      value: getValue("whatsapp_number"),
    },
    {
      fieldType: FormGenerator.FieldTypes.INPUT,
      placeholder: "Juice Number",
      label:
        "Got a Juice number? Leave it here. (Your can leave your MCB Account Number here as well)",
      name: "Juice Number",
      dbName: "mcb_juice_number",
      value: getValue("mcb_juice_number"),
    },
    {
      fieldType: FormGenerator.FieldTypes.INPUT,
      placeholder: "Room Number (Eg. S009)",
      label:
        "This helps with delivery, no one will rob you! You can leave it out, thats also fine",
      name: "Room Number",
      dbName: "room_number",
      value: getValue("room_number"),
    },
  ];

  const removeEmpty = (data) => {
    const keys = Object.keys(data);
    var full = {};

    keys.forEach((key) => {
      const value = data[key];
      if (value) full = { ...full, [key]: value };
    });
    return full;
  };

  const updateUserInBackend = (data, cb) => {
    setLoading(true);
    explorer
      .send(UPDATE_USER_PROFILE, "POST", data)
      .then((response) => {
        setLoading(false);
        if (!response.success)
          return setNotification({ message: response.error.message });
        console.log("response", response);
        cb && cb();
        setUserInRedux(response.data);
      })
      .catch((e) => {
        setLoading(false);
        setNotification({ message: e?.toString() });
      });
  };
  const submit = (data, resetForm) => {
    setNotification(null);
    data = removeEmpty(data);
    data = { user_id: user?.user_id, data };
    updateUserInBackend(data, () => resetForm && resetForm());
  };
  console.log("the notifiation ahd shit", notification, loading);
  return (
    <>
      <PageWrapper>
        <PageTitle
          title="Update Your Profile"
          subtitle="Change details about you profile here"
        />
        {notification && (
          <Notification message={notification.message} type="bad" />
        )}
        <FormGenerator
          fields={fields}
          actionText="Update My Profile"
          onSubmit={submit}
        />

        {loading && <Loader label="Updating your profile..." />}
      </PageWrapper>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  explorer: state.explorer,
});

const mapDispatchToProps = { setUserInRedux: reduxSetDonkomiAuth };

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
