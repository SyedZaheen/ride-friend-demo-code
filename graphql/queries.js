import gql from "graphql-tag";

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

export const getRoutesByUserId = (id) => {
  const variables = { id };
  const query = gql`
    query getRoutesByUserId($id: ID!) {
      findUserByID(id: $id) {
        routes {
          data {
            nickName
            _id
            returnRoute {
              nickName
            }
          }
        }
      }
    }
  `;
  return { query, variables };
};

export const getUserById = (id) => {
  const query = gql`
    query getUserById($id: ID!) {
      findUserByID(id: $id) {
        _id
        authName
        authSub
        isDriver
      }
    }
  `;
  const variables = { id };

  return { query, variables };
};

export const getRouteById = (id) => {
  const query = gql`
    query getRouteById($id: ID!) {
      findRouteByID(id: $id) {
        _id
        nickName
      }
    }
  `;

  const variables = { id };

  return { query, variables };
};

export const getAllRoutes = () => {
  return gql`
    query getAllRoutes {
      allRoutes {
        data {
          user {
            _id
          }
          _id
          startLocation {
            lat
            lng
          }
          endLocation {
            lat
            lng
          }
          startTime
          startRadius
          endRadius
          returnRoute {
            _id
          }
        }
      }
    }
  `;
};
