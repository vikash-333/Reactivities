import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Item,
  ItemDescription,
  Label,
  LabelDetail,
  Segment,
} from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import ActivityListItemAttendees from "./ActivityListItemAttendees";

interface Props {
  activity: Activity;
}

export default observer(function ActivityListItem({ activity }: Props) {
  return (
    <Segment.Group>
      <Segment>
        {activity.isCancelled && (
          <Label
            color="red"
            attached="top"
            style={{ textAlign: "center" }}
            content="Cancelled"
          />
        )}
        <Item.Group>
          <Item>
            <Item.Image
              circular
              style={{ marginBottom: 3 }}
              size="tiny"
              src={activity.host?.image || "/assets/user.png"}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted By{" "}
                <Link to={`/profiles/${activity.hostUsername}`}>
                  {activity.host?.displayName}
                </Link>
              </Item.Description>
              {activity.isHost && (
                <ItemDescription>
                  <Label basic color="orange">
                    {" "}
                    You are hosting this Activity{" "}
                  </Label>
                </ItemDescription>
              )}
              {activity.isGoing && !activity.isHost && (
                <ItemDescription>
                  <Label basic color="green">
                    {" "}
                    You are going to this Activity{" "}
                  </Label>
                </ItemDescription>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(activity.date!, "dd MMM yyyy h:mm aa")}
          <Icon name="marker" />
          {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendees attendees={activity.attendees!} />
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          content="View"
          color="teal"
          floated="right"
        />
      </Segment>
    </Segment.Group>
  );
});
