import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditForm({ setEditMode }: Props) {
  const {
    profileStore: { updateProfile, profile },
  } = useStore();

  return (
    <Formik
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      onSubmit={(values) =>
        updateProfile(values).then(() => setEditMode(false))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <MyTextInput placeholder="DisplayName" name="displayName" />
          <MyTextArea placeholder="Add your Bio" name="bio" rows={5} />
          <Button
            loading={isSubmitting}
            disabled={!isValid || !dirty}
            positive
            type="submit"
            content="Update profile"
            floated="right"
          />
        </Form>
      )}
    </Formik>
  );
});
