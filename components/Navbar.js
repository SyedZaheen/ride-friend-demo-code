import Logo from "./Logo";
import { Box, Button } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box as="nav">
      <Logo />
      <Button colorScheme="teal">Login</Button>
    </Box>
  );
};

export default Navbar;
