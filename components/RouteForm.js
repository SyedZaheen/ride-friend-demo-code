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
    checked: false,
    returnPickUpLocation: "",
    returnDropOffLocation: "",
    returnNickName: "",
    returnPickUpTime: "",
    returnPickUpDeviation: "",
    returnDropOffDeviation: "",
    returnTimeDeviation: "",
    loading: false,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const response = await axios.post("/api/routes/create", {
      data: this.state,
    });
    console.log(response);
    this.setState({ loading: false });
    this.props.setSuccess(true);
  };

  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="checkbox"
          checked={this.props.checked}
          onChange={(e) => this.setState({ checked: e.currentTarget.checked })}
        />
        <label> Is this a 2 way trip?</label>
        <h1>Route</h1>
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

        {this.state.checked && (
          <div>
            <h1>Return Route</h1>
            <Text>Route nick name</Text>
            <Input
              value={this.state.returnNickName}
              onChange={(e) =>
                this.setState({ returnNickName: e.target.value })
              }
              type="text"
              placeholder="enter a nickname, eg. home to work"
            />
            <Search
              setLocation={(value) =>
                this.setState({ returnPickUpLocation: value })
              }
              label="Pick-up location"
            />
            <Text>Pick-up time</Text>
            <Input
              value={this.state.returnPickUpTime}
              onChange={(e) =>
                this.setState({ returnPickUpTime: e.target.value })
              }
              type="time"
              placeholder="enter a pick-up time"
            />
            <Text>Pick-up time deviation</Text>
            <InputGroup>
              <Input
                value={this.state.returnTimeDeviation}
                onChange={(e) =>
                  this.setState({ returnTimeDeviation: e.target.value })
                }
                type="number"
                placeholder="enter acceptable time deviation from your pickup time"
              />
              <InputRightAddon children="minutes" />
            </InputGroup>
            <Text>Pick-up Radius</Text>
            <InputGroup>
              <Input
                value={this.state.returnPickUpDeviation}
                onChange={(e) =>
                  this.setState({ returnPickUpDeviation: e.target.value })
                }
                type="number"
                placeholder="Acceptable pick-up location deviation?"
              />
              <InputRightAddon children="metres" />
            </InputGroup>

            <Search
              setLocation={(value) =>
                this.setState({ returnDropOffLocation: value })
              }
              label="Drop-off location"
            />
            <Text>Destination Radius</Text>
            <InputGroup>
              <Input
                value={this.state.returnDropOffDeviation}
                onChange={(e) =>
                  this.setState({ returnDropOffDeviation: e.target.value })
                }
                type="number"
                placeholder="Acceptable drop-off location deviation?"
              />
              <InputRightAddon children="metres" />
            </InputGroup>
          </div>
        )}
        {!this.state.loading && (
          <Button
            size="lg"
            backgroundColor="orange"
            color="darkGrey"
            type="submit"
          >
            Save route
          </Button>
        )}
        {this.state.loading && (
          <Button
            size="lg"
            isLoading
            loadingText="Submitting"
            backgroundColor="orange"
            color="darkGrey"
            type="submit"
          >
            Submit
          </Button>
        )}
      </form>
    );
  };
}

export default RouteForm;
