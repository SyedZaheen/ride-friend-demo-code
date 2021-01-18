import { Box } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

// height:width 1:3.25

const Logo = (props) => {
  return <Image src="/main_logo.png" height="100" width="325" />;
};

export default Logo;
