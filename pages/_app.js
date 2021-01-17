import "../styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

const dataBaseLink = new HttpLink({
  uri: "https://graphql.fauna.com/graphql",
  headers: {
    authorization: `Bearer ${process.env.DB_SECRET}`,
  },
});

const client = new ApolloClient({
  link: dataBaseLink,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
