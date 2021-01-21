import Logo from "./Logo";
import { Box, Button } from "@chakra-ui/react";

const Navbar = ({isLoggedIn}) => {
  const navButtons = isLoggedIn? <Button colorScheme="teal"><a href="/api/logout">Logout</a></Button> : <Button colorScheme="teal"><a href="/api/login">Login</a></Button> 

  return (
    <Box as="nav">
      <Logo />
      {navButtons}
    </Box>
  );
};

export default Navbar;
