import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";

const HamburgerDropDown = () => {
  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        size="md"
        backgroundColor="lightGrey"
        color="darkGrey"
        _hover={{ backgroundColor: "pink" }}
        _active={{ backgroundColor: "pink" }}
      />
      <MenuList borderColor="lightGrey" backgroundColor="darkGrey">
        {/* MenuItems are not rendered unless Menu is open */}
        <MenuItem color="white" _hover={{ backgroundColor: "pink" }}>
          <Link href="/">Home</Link>
        </MenuItem>
        <MenuItem color="white" _hover={{ backgroundColor: "pink" }}>
          <Link href="/">Friends</Link>
        </MenuItem>
        <MenuItem color="white" _hover={{ backgroundColor: "pink" }}>
          <Link href="/">Routes</Link>
        </MenuItem>
        <MenuItem color="white" _hover={{ backgroundColor: "pink" }}>
          <Link href="/">Profile</Link>
        </MenuItem>
        <MenuItem color="white" _hover={{ backgroundColor: "pink" }}>
          <Link href="/api/logout">Logout</Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default HamburgerDropDown;
