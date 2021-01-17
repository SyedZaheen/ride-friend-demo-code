import auth0 from "../../utils/auth0";
import { getUserByAuthSub } from "../../graphql/queries";
import { graphqlClient } from "../../utils/graphqlClient";

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        const { query, variables } = getUserByAuthSub(session.user.sub);
        graphqlClient
          .request(query, variables)
          .then((data) => console.log(data));
        return { ...session };
      },
      redirectTo: "/",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
