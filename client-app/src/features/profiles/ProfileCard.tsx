import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/models/Profiles";

interface Props {
  profile: Profile;
}

export default observer(function ProfileCard({ profile }: Props) {
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || "assets/user.png"} />
      <Card.Content>
        <Card.Header content={profile.displayName} />
        <Card.Description content="Bio goes here" />
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        20 Followers
      </Card.Content>
    </Card>
  );
});
