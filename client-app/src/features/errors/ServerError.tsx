import { observer } from "mobx-react-lite";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function ServerError() {
  const { commonStore } = useStore();
  return (
    <Container>
      <Header as="h1" content="Server Error" />
      <Header sub as="h5" content={commonStore.error?.message} color="red" />
      {commonStore.error?.details && (
        <Segment>
          <Header as="h4" content="Stack-trace" color="teal" />
          <code>{commonStore.error?.details}</code>
        </Segment>
      )}
    </Container>
  );
});
