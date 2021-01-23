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

export const updateUser = (id, data) => {
  const variables = { id, data };
  const mutation = gql`
    mutation updateUser($id: ID!, $data: UserInput!) {
      updateUser(id: $id, data: $data) {
        _id
        isDriver
      }
    }
  `;
  return { mutation, variables };
};
