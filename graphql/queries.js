import gql from "graphql-request";

// functions in this file and the mutations file return a query string and variables
// these two are required by graphql-request client to send queries to our db
// graphql-request is connecting our db to our next app
// we store common queries and mutations in these files so that we don't need to keep
// writing them over and over again

export const getUserByAuthSub = (authSub) => {
  const query = gql`
    query getUserByAuthSub($authSub: String!) {
      getUserByAuthSub(authSub: $authSub) {
        _id
      }
    }
  `;

  const variables = { authSub };

  return { query, variables };
};
