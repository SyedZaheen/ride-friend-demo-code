import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    pink: "#e7b3b3",
    darkGrey: "#3f3b3b",
    lightGrey: "#575151",
    orange: "#feb062",
  },
});

// #e7b3b3 pink
// #3f3b3b dark grey
// #575151 lighter grey
// #feb062 orange

function MyApp({ Component, pageProps }) {
  return (
    // chakra provider, is set up according to docs but serves no purpose at the moment
    <ChakraProvider theme={theme}>
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
