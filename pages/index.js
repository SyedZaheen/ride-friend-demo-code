import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CustomRadioGroup from "../components/CustomRadioGroup";
import auth0 from "../utils/auth0";
import { getUserById } from "../graphql/queries";
import { getRoutesByUserId } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";
import { useForm } from "react-hook-form";
import graphqlClient from "../utils/graphqlClient";
import boolean from "../utils/boolean";
import Link from "next/link";
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  HStack,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  VStack,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ChatIcon } from "@chakra-ui/icons";

// Home page will have 3 different states:
// Not logged in
// Logged in with all driver/rider stored in database
// logged in but driver/rider hasn't been selected yet

const dummyData = {
  friends: [
    { name: "Bob Dick", phoneNumber: "89192347", routesMatched: ["To Work"] },
    {
      name: "Tom Harry",
      phoneNumber: "98787758",
      routesMatched: ["Return from Work"],
    },
    {
      name: "Peter Johnson",
      phoneNumber: "90078351",
      routesMatched: ["To Work", "Return from work"],
    },
    {
      name: "John Doe",
      phoneNumber: "87332715",
      routesMatched: ["MMA lesson"],
    },
    {
      name: "Sally Doe",
      phoneNumber: "88963213",
      routesMatched: ["Grocery shopping"],
    },
  ],
  routes: [
    {
      nickName: "Return from work",
      startLocation: "18 Adam Road",
      endLocation: "Marina Bay Sands",
    },
    {
      nickName: "To work",
      startLocation: "Esplanade",
      endLocation: "18 Adam Road",
    },
    {
      nickName: "MMA Lesson",
      startLocation: "18 Adam Road",
      endLocation: "Beauuty World MRT Station",
    },
    {
      nickName: "Grocery Shopping",
      startLocation: "Esplanade",
      endLocation: "Lot one shopper's mall, Choa Chu Kang",
    },
  ],
};

export default function Home(props) {
  const { register, handleSubmit, watch, errors } = useForm();
  const [user, setUser] = useState(props.user);
  const [loading, setLoading] = useState(false);
  const [isDriver, setIsDriver] = useState("false");
  const [isMale, setIsMale] = useState("false");
  const [wantSameSex, setWantSameSex] = useState("false");

  const onSubmit = handleSubmit(async () => {
    const { mutation, variables } = updateUser(user._id, {
      authName: user.authName,
      authSub: user.authSub,
      isDriver: boolean(isDriver),
      isMale: boolean(isMale),
      wantSameSex: boolean(wantSameSex),
    });
    try {
      setLoading(true);
      const faunaResponse = await graphqlClient.request(mutation, variables);
      setLoading(false);
      setUser(faunaResponse);
    } catch (error) {
      console.log("i am error: ", error);
    }
  });

  const renderUserRoutes = (routes) => {
    return routes.map((route, index) => {
      const bgColor = index % 2 == 1 ? "lightPink" : "darkPink";
      const textColor = index % 2 == 1 ? "darkGrey" : "offWhite";
      return (
        <AccordionItem borderRadius="md" border="none" bg={bgColor} p={2}>
          <HStack>
            <AccordionButton p={0} _hover={{}} _focus={{ boxShadow: "none" }}>
              <AccordionIcon boxSize={7} />
              <VStack width="100%">
                <Text fontSize="1.5rem" color={textColor} fontWeight="bold">
                  {route.nickName}
                </Text>
                <HStack>
                  <Text color={textColor}>
                    {route.startLocation}
                    <strong> To </strong>
                    {route.endLocation}
                  </Text>
                </HStack>
              </VStack>
            </AccordionButton>
            <HStack>
              <EditIcon
                boxSize={7}
                _hover={{
                  cursor: "pointer",
                }}
              />
              <DeleteIcon
                boxSize={7}
                _hover={{
                  cursor: "pointer",
                }}
              />
            </HStack>
          </HStack>

          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      );
    });
  };

  const renderUserFriends = (friends) => {
    return friends.map((friend) => {
      return (
        <Flex
          borderBottom="1px"
          borderBottomStyle="dashed"
          borderBottomColor="lightGrey"
          p={2}
          justifyContent="space-between"
        >
          <HStack>
            <Avatar src="https://bit.ly/sage-adebayo" />
            <Box ml="3">
              <Text fontSize="1.5rem" color="darkGrey" fontWeight="bold">
                {friend.name}
                <Badge ml="1" colorScheme="green">
                  Pet
                </Badge>
              </Text>
              <Text color="darkGrey" fontSize="sm">
                Contact: {friend.phoneNumber}
              </Text>
              <Text color="darkGrey" fontSize="sm">
                Routes Matched:{" |"}
                {friend.routesMatched.map((route) => (
                  <>
                    {" "}
                    <Link color="teal.500" href="#">
                      {route}
                    </Link>
                    {" |"}
                  </>
                ))}
              </Text>
            </Box>
          </HStack>
          <ChatIcon
            boxSize={7}
            _hover={{
              cursor: "pointer",
            }}
          />
        </Flex>
      );
    });
  };

  const renderIndex = () => {
    if (user && user.isDriver !== null) {
      return (
        <Box mt={2} p={2}>
          <Heading as="h1">Dashboard</Heading>
          <Heading mt={2} color="darkGrey" size="lg" as="h2">
            My Routes
          </Heading>
          <Accordion mt={2} boxShadow="sm" allowToggle>
            {renderUserRoutes(dummyData.routes)}
          </Accordion>
          <Heading mt={2} color="darkGrey" size="lg" as="h2">
            My Friends
          </Heading>
          <Box p={2} borderRadius="md" mt={2} boxShadow="sm" bg="lightPink">
            {renderUserFriends(dummyData.friends)}
          </Box>
        </Box>
      );
    }

    if (user && user.isDriver == null) {
      return (
        <Flex alignItems="center" justifyContent="center" mt="30vh">
          <Box>
            <Box mb="5">
              <Heading color="darkGrey" as="h1">
                Tell us more about yourself...
              </Heading>
              <Text color="lightGrey">
                Don't worry, you can always change these options later!
              </Text>
            </Box>
            <form onSubmit={onSubmit}>
              <CustomRadioGroup
                callback={setIsDriver}
                value={isDriver}
                label="Are you a driver or a rider?"
                choices={[
                  { label: "I'm a driver", value: "true" },
                  { label: "I'm looking for drivers", value: "false" },
                ]}
              />

              <br />

              <CustomRadioGroup
                callback={setIsMale}
                value={isMale}
                label="What is your sex?"
                choices={[
                  { label: "Male", value: "true" },
                  { label: "Female", value: "false" },
                ]}
              />

              <br />

              <CustomRadioGroup
                callback={setWantSameSex}
                value={wantSameSex}
                label="what is your preference?"
                choices={[
                  { label: "I prefer riding with the same sex", value: "true" },
                  {
                    label: "I am comfortable riding with the opposite sex",
                    value: "false",
                  },
                ]}
              />

              <br />

              {!loading && (
                <Button
                  size="lg"
                  backgroundColor="orange"
                  color="darkGrey"
                  type="submit"
                >
                  Submit
                </Button>
              )}
              {loading && (
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
          </Box>
        </Flex>
      );
    }

    if (!user) {
      return (
        <Box>
          <Flex alignItems="center" justifyContent="center">
            <Box>
              <Heading as="h1">Welcome to Ride Friend</Heading>
              <Text>
                Ride Friend is a free service that helps connect drivers and
                riders
              </Text>
              <Text>
                Find out more by visiting our <Link href="/about">About</Link>{" "}
                page!
              </Text>
              <Text>
                Here we will put a beautiful landing page with various sections
                such as "About us", "Our Mission", "How it works"...
              </Text>
            </Box>
          </Flex>
        </Box>
      );
    }
  };

  return (
    <Box bg="pink" height="100%" width="100%">
      <Navbar user={user} />
      <Box>{renderIndex()}</Box>
    </Box>
  );
}

// Every time a user requests for index.js the below function will run
// function below takes the session object returned from the callback endpoint,
// extracts the user info from it and puts in the component's props

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  if (session) {
    const userReq = getUserById(session.user.userId);
    const userData = await graphqlClient.request(
      userReq.query,
      userReq.variables
    );
    const routesReq = getRoutesByUserId(session.user.userId);
    const routes = await graphqlClient.request(
      routesReq.query,
      routesReq.variables
    );
    return {
      props: {
        user: userData.findUserByID,
        routes: routes.findUserByID.routes.data,
      },
    };
  }
  return { props: { user: null } };
}
