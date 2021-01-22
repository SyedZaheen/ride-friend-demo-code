import gql from "graphql-tag";

export const createUser = (data) => {
  const variables = { data };
  const mutation = gql`
    mutation createNewUser($data: UserInput!) {
      createUser(data: $data) {
        _id
        authName
        isDriver
      }
    }
  `;
  return { mutation, variables };
};
