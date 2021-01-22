import auth0 from "../../utils/auth0";
import { getUserByAuthSub } from "../../graphql/queries";
import graphqlClient from "../../utils/graphqlClient";
import { createUser } from "../../graphql/mutations";

// The login route redirects user from our app to auth0 login page
// then, auth0 sends a request to this callback route after user has logged in on auth0 log in page

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        // we take the user info returned by auth0 and first check if user exists in our fauna db
        const { query, variables } = getUserByAuthSub(session.user.sub);
        const faunaUser = await graphqlClient.request(query, variables);
        if (faunaUser.getUserByAuthSub) {
          // if the user does exist in our fauna db then we take the user's info returned from fauna db
          // and add it to the session object

          const newSessionObject = { ...session };
          newSessionObject.user["userId"] = faunaUser.getUserByAuthSub._id;
          newSessionObject.user["isDriver"] =
            faunaUser.getUserByAuthSub.isDriver;

          return newSessionObject;
        } else {
          // if user does not exist in our fauna db then we create the user
          // all auth0 users have a unique id called "sub", so we need to store this our database
          const { mutation, variables } = createUser({
            authName: session.user.name,
            authSub: session.user.sub,
            isDriver: null,
            friends: [],
          });
          const newUser = await graphqlClient.request(mutation, variables);
          const newSessionObject = { ...session };
          newSessionObject.user["userId"] = newUser.getUserByAuthSub._id;
          newSessionObject.user["isDriver"] = newUser.getUserByAuthSub.isDriver;
        }
      },
      redirectTo: "/",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
