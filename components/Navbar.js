import Logo from "./Logo";
import Link from "next/link";
import { Box, Button, Text, Flex } from "@chakra-ui/react";
import HamburgerDropDown from "./HamburgerDropDown";

const Navbar = ({ user }) => {
  const navButtons = user ? (
    <Button
      display={{
        sm: "none",
        md: "none",
        lg: "inline-block",
        xl: "inline-block",
      }}
      color="darkGrey"
      bg="orange"
    >
      <a href="/api/logout">Logout</a>
    </Button>
  ) : (
    <Button
      display={{
        sm: "none",
        md: "none",
        lg: "inline-block",
        xl: "inline-block",
      }}
      color="darkGrey"
      bg="orange"
    >
      <a href="/api/login">Login</a>
    </Button>
  );

  const navLinks = user ? (
    <Box width="30vw">
      <Flex
        display={{
          sm: "none",
          md: "none",
          lg: "flex",
          xl: "flex",
        }}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Text
          color="pink"
          fontWeight="600"
          _hover={{ color: "orange" }}
          fontSize="xl"
        >
          <Link href="/">Home</Link>
        </Text>
        <Text
          color="pink"
          fontWeight="600"
          _hover={{ color: "orange" }}
          fontSize="xl"
        >
          <Link href="/">Friends</Link>
        </Text>
        <Text
          color="pink"
          fontWeight="600"
          _hover={{ color: "orange" }}
          fontSize="xl"
        >
          <Link href="/">Routes</Link>
        </Text>
        <Text
          color="pink"
          fontWeight="600"
          _hover={{ color: "orange" }}
          fontSize="xl"
        >
          <Link href="/">Profile</Link>
        </Text>
      </Flex>
    </Box>
  ) : (
    <Box></Box>
  );

  return (
    <Box as="nav" padding={2} bg="darkGrey">
      <Flex flexDirection="row" justifyContent="space-between">
        <Text color="pink" fontSize="2xl">
          Ride Friend Logo
        </Text>
        {navLinks}
        {navButtons}
        <Box
          display={{
            sm: "block",
            md: "block",
            lg: "none",
            xl: "none",
          }}
        >
          <HamburgerDropDown />
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
