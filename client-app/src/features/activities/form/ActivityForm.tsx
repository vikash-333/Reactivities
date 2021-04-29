import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { Activity } from "../../../app/models/Activity";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from "yup";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    date: null,
    description: "",
    category: "",
    venue: "",
    city: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The title is required"),
    description: Yup.string().required("The description is required"),
    date: Yup.string().required().nullable(),
    venue: Yup.string().required(),
    category: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, loadActivity]);

  function handleFormSubmit(activity: Activity) {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading Activity..." />;

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isSubmitting, isValid, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput placeholder="Title" name="title" />
            <MyTextArea rows={3} placeholder="Description" name="description" />
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <MySelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <Header content="Location Details" sub color="teal" />
            <MyTextInput placeholder="Venue" name="venue" />
            <MyTextInput placeholder="City" name="city" />

            <Button
              disabled={isSubmitting || !isValid || !dirty}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              floated="right"
              type="button"
              content="Cancel"
              as={Link}
              to={"/activities"}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
