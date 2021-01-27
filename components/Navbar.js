import Logo from "./Logo";
import Link from "next/link";
import { Box, Button, Text, Flex } from "@chakra-ui/react";

const Navbar = ({ user }) => {
  const navButtons = user ? (
    <Button color="darkGrey" bg="orange">
      <a href="/api/logout">Logout</a>
    </Button>
  ) : (
    <Button color="darkGrey" bg="orange">
      <a href="/api/login">Login</a>
    </Button>
  );

  const navLinks = user ? (
    <Box width="30vw">
      <Flex flexDirection="row" justifyContent="space-between">
        <Text
          color="pink"
          fontWeight="600"
          _hover={{ color: "orange" }}
          fontSize="xl"
        >
          <Link href="/index">Home</Link>
        </Text>
        <Text
          color="pink"
          fontWeight="600"
          _hover={{ color: "orange" }}
          fontSize="xl"
        >
          <Link href="/friends">Friends</Link>
        </Text>
        <Text
          color="pink"
          fontWeight="600"
          _hover={{ color: "orange" }}
          fontSize="xl"
        >
          <Link href="/routes">Routes</Link>
        </Text>
        <Text
          color="pink"
          fontWeight="600"
          _hover={{ color: "orange" }}
          fontSize="xl"
        >
          <Link href="/settings">Settings</Link>
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
      </Flex>
    </Box>
  );
};

export default Navbar;
