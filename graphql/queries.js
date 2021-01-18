import gql from "graphql-request";

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
