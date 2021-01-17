import auth0 from "../../utils/auth0";
import { getUserByAuthSub } from "../../graphql/queries";
import { graphqlClient } from "../../utils/graphqlClient";
import { createUser } from "../../graphql/mutations";

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        let { query, variables } = getUserByAuthSub(session.user.sub);
        let response = await graphqlClient.request(query, variables);
        console.log(response);
        if (response.getUserByAuthSub) {
          return { ...session, user: response.getUserByAuthSub };
        } else {
          let { query, variables } = createUser({
            authName: session.user.name,
            authSub: session.user.sub,
          });
          let response = await graphqlClient.request(query, variables);
          return { ...session, user: response.createUser };
        }
      },
      redirectTo: "/",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
