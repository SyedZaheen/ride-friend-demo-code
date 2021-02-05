import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import RouteForm from "../../components/RouteForm";
import auth0 from "../../utils/auth0";
import { getUserById } from "../../graphql/queries";
import graphqlClient from "../../utils/graphqlClient";
import { useRouter } from "next/router";

const RouteCreate = (props) => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  if (success) {
    router.push("/");
  }

  return (
    <Box p={5}>
      <h1>Create a new Route</h1>
      <RouteForm setSuccess={setSuccess} userId={props.user?._id} />
    </Box>
  );
};

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
