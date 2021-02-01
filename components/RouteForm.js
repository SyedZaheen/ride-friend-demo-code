import {
  Text,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
} from "@chakra-ui/react";
import React, { Component } from "react";
import Search from "../components/Search";

class RouteForm extends Component {
  state = { pickupLocation: "", dropOffLocation: "", processedFormData: {} };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Text>Route nick name</Text>
        <Input type="text" placeholder="enter a nickname, eg. home to work" />
        <Search
          setLocation={(value) => this.setState({ pickupLocation: value })}
          label="Pick-up location"
        />
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

        <Search
          setLocation={(value) => this.setState({ dropOffLocation: value })}
          label="Drop-off location"
        />
        <Text>Destination Radius</Text>
        <InputGroup>
          <Input
            type="number"
            placeholder="Acceptable drop-off location deviation?"
          />
          <InputRightAddon children="metres" />
        </InputGroup>
        <Button type="submit">Save route</Button>
      </form>
    );
  }
}

export default RouteForm;
