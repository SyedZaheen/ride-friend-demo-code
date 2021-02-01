import {
  Box,
  Text,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import React, { Component } from "react";
import Search from "../components/Search";

class RouteForm extends Component {
  render() {
    return (
      <Box>
        <Text>Route nick name</Text>
        <Input type="text" placeholder="enter a nickname, eg. home to work" />
        <Search label="Pick-up location" />
        <Text>Pick-up time</Text>
        <Input type="time" placeholder="enter a pick-up time" />
        <Text>Pick-up Radius</Text>
        <InputGroup>
          <Input
            type="number"
            placeholder="Acceptable pick-up location deviation?"
          />
          <InputRightAddon children="metres" />
        </InputGroup>

        <Search label="Drop-off location" />
        <Text>Destination Radius</Text>
        <InputGroup>
          <Input
            type="number"
            placeholder="Acceptable drop-off location deviation?"
          />
          <InputRightAddon children="metres" />
        </InputGroup>
      </Box>
    );
  }
}

export default RouteForm;
