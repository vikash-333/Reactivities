import React, { Fragment } from "react";
import { Container, Grid, List } from "semantic-ui-react";
import { Activity } from "../../../models/Activity";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | null;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  handleFormOpen: (id: string) => void;
  handleFromClose: () => void;
  editMode: boolean;
  handleEditForm: (activity: Activity) => void;
  handleDeleteActivity: (id: string) => void;
  submitting: boolean;
}

export default function ActivityDashboard({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
  handleFormOpen,
  handleFromClose,
  editMode,
  handleEditForm,
  handleDeleteActivity,
  submitting,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <List>
          <ActivityList
            activities={activities}
            selectActivity={selectActivity}
            handleDeleteActivity={handleDeleteActivity}
          />
        </List>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetail
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            handleFormOpen={handleFormOpen}
          />
        )}
        {editMode && (
          <ActivityForm
            handleFormClose={handleFromClose}
            activity={selectedActivity}
            handleFormEdit={handleEditForm}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
