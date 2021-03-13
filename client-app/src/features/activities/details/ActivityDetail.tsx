import React from "react";
import { Card, Segment, Image, Button } from "semantic-ui-react";
import { Activity } from "../../../models/Activity";

interface Props {
  activity: Activity;
  cancelSelectActivity: () => void;
  handleFormOpen: (id: string) => void;
}

export default function ActivityDetail({
  activity,
  cancelSelectActivity,
  handleFormOpen,
}: Props) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          <div>{activity.description}</div>
          <div>
            {activity.city}, {activity.venue}
          </div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => handleFormOpen(activity.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={cancelSelectActivity}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
