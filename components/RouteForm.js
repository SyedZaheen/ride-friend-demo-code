import {
  Text,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React, { Component } from "react";
import Search from "../components/Search";

class RouteForm extends Component {
  state = {
    pickUpLocation: "",
    dropOffLocation: "",
    nickName: "",
    pickUpTime: "",
    pickUpDeviation: "",
    dropOffDeviation: "",
    timeDeviation: "",
    userId: this.props.userId,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/routes/create", {
      data: this.state,
    });
    console.log(response);
  };

  render = () => {
    console.log(this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        <Text>Route nick name</Text>
        <Input
          value={this.state.nickName}
          onChange={(e) => this.setState({ nickName: e.target.value })}
          type="text"
          placeholder="enter a nickname, eg. home to work"
        />
        <Search
          setLocation={(value) => this.setState({ pickUpLocation: value })}
          label="Pick-up location"
        />
        <Text>Pick-up time</Text>
        <Input
          value={this.state.pickUpTime}
          onChange={(e) => this.setState({ pickUpTime: e.target.value })}
          type="time"
          placeholder="enter a pick-up time"
        />
        <Text>Pick-up time deviation</Text>
        <InputGroup>
          <Input
            value={this.state.timeDeviation}
            onChange={(e) => this.setState({ timeDeviation: e.target.value })}
            type="number"
            placeholder="enter acceptable time deviation from your pickup time"
          />
          <InputRightAddon children="minutes" />
        </InputGroup>
        <Text>Pick-up Radius</Text>
        <InputGroup>
          <Input
            value={this.state.pickUpDeviation}
            onChange={(e) => this.setState({ pickUpDeviation: e.target.value })}
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
            value={this.state.dropOffDeviation}
            onChange={(e) =>
              this.setState({ dropOffDeviation: e.target.value })
            }
            type="number"
            placeholder="Acceptable drop-off location deviation?"
          />
          <InputRightAddon children="metres" />
        </InputGroup>
        <Button type="submit">Save route</Button>
      </form>
    );
  };
}

export default RouteForm;
