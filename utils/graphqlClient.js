import { GraphQLClient } from "graphql-request";

const endpoint = "https://graphql.fauna.com/graphql";

// ... or create a GraphQL client instance to send requests
const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_DB_SECRET}`,
  },
});

export default graphqlClient;
