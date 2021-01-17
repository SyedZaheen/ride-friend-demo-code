import gql from "graphql-tag";

export const createUser = (data) => {
  const variables = { data };
  const query = gql`
    mutation createNewUser($data: UserInput!) {
      createUser(data: $data) {
        _id
        authName
      }
    }
  `;
  return { query, variables };
};
