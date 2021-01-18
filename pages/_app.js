import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    // chakra provider, is set up according to docs but serves no purpose at the moment
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

// color pallete (Can use these colors across the entire website for consistency)
// #f8f8f8
// #5068a9
// #86a6df
// #324e7b
