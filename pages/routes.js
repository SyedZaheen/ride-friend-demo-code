import { Box, Input } from "@chakra-ui/react";
import React, { Component } from "react";
import RouteForm from "../components/RouteForm";

class Routes extends Component {
  render() {
    return (
      <Box p={5}>
        <h1>Routes page</h1>
        <RouteForm />
      </Box>
    );
  }
}

export default Routes;
