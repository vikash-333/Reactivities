import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/Profiles";
import ProfilePhotos from "./ProfilePhotos";
/* import ProfileStore from "../../app/stores/profileStore";
import { useStore } from "../../app/stores/store"; */

interface Props {
  profile: Profile;
}

export default observer(function ProfileContent({ profile }: Props) {
  /*   const {
    profileStore,
    userStore: { user },
  } = useStore();
  const { loadProfile, profile } = profileStore;

  useEffect(() => {
    if (user) loadProfile(user.userName);
  }, [profileStore]); */

  const panes = [
    { menuItem: "About", render: () => <Tab.Pane content="About content" /> },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    {
      menuItem: "Events",
      render: () => <Tab.Pane content="Events content" />,
    },
    {
      menuItem: "Followers",
      render: () => <Tab.Pane content="Followers Pane" />,
    },
    {
      menuItem: "Following",
      render: () => <Tab.Pane content="Following Pane" />,
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
});
