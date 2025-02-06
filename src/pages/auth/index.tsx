import { Grid, Header } from "semantic-ui-react";

export const Auth = () => {
  return (
    <Grid textAlign="center" verticalAlign="middle" style={{ height: "100vh" }}>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="violet" textAlign="center">
                Welcome! Login by registering as a Guest below
            </Header>
        </Grid.Column>
    </Grid>
  );
};

export default Auth;
