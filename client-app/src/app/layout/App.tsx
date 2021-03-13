import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { Activity } from "../../models/Activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setactivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      const activities = response.map((activity) => {
        return { ...activity, date: activity.date.split("T")[0] };
      });

      setactivities(activities);
      setLoading(false);
    });
  }, []);

  function handleSelectActivity(id: string) {
    const selectedActivity = activities.find((x) => x.id === id) ?? null;
    setSelectedActivity(selectedActivity);
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(null);
  }

  function handleFormOpen(id?: string) {
    if (id) {
      handleSelectActivity(id);
    } else {
      handleCancelSelectActivity();
    }
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setactivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setactivities([...activities, activity]);
        setSubmitting(false);
        setEditMode(false);
        setSelectedActivity(activity);
      });
    }
  }

  function handleDeleteActivity(id: string) {
    agent.Activities.delete(id).then(() => {
      setactivities(activities.filter((x) => x.id !== id));
    });
  }

  if (loading) return <LoadingComponent content="Loading App" />;

  return (
    <>
      <NavBar handleFormOpen={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          handleFormOpen={handleFormOpen}
          handleFromClose={handleFormClose}
          editMode={editMode}
          handleEditForm={handleCreateOrEditActivity}
          handleDeleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
