import { Box } from "@chakra-ui/react";
import React, { Component } from "react";
import RouteForm from "../../components/RouteForm";
import auth0 from "../../utils/auth0";
import { getUserById } from "../../graphql/queries";
import graphqlClient from "../../utils/graphqlClient";

class RouteCreate extends Component {
  render = () => {
    console.log(this.props);
    return (
      <Box p={5}>
        <h1>Create a new Route</h1>
        <RouteForm userId={this.props.user?._id} />
      </Box>
    );
  };
}

export default RouteCreate;

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  if (session) {
    const { query, variables } = getUserById(session.user.userId);
    const userData = await graphqlClient.request(query, variables);
    return { props: { user: userData.findUserByID } };
  }
  return { props: { user: null } };
}
