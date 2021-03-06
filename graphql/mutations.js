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
        authSub
      }
    }
  `;
  return { mutation, variables };
};

export const createRoute = (data) => {
  const variables = { data };
  const mutation = gql`
    mutation createRoute($data: RouteInput!) {
      createRoute(data: $data) {
        nickName
        _id
      }
    }
  `;
  return { mutation, variables };
};
