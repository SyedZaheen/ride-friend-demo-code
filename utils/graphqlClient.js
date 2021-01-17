import { GraphQLClient } from "graphql-request";

const endpoint = "https://graphql.fauna.com/graphql";

// ... or create a GraphQL client instance to send requests
export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.DB_SECRET}`,
  },
});
