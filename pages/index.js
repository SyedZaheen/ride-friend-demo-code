import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CustomRadioGroup from "../components/CustomRadioGroup";
import auth0 from "../utils/auth0";
import { getUserById } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";
import { useForm } from "react-hook-form";
import graphqlClient from "../utils/graphqlClient";
import boolean from "../utils/boolean";
import Link from "next/link";
import { Box, Button, Flex, Text, Heading } from "@chakra-ui/react";

// Home page will have 3 different states:
// Not logged in
// Logged in with all driver/rider stored in database
// logged in but driver/rider hasn't been selected yet

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

  const renderIndex = () => {
    if (user && user.isDriver !== null) {
      return (
        <Box mt="10">
          <Heading as="h1">Dashboard</Heading>
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
    <Box bg="pink" height="100vh" width="100vw">
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
    const { query, variables } = getUserById(session.user.userId);
    const userData = await graphqlClient.request(query, variables);
    return { props: { user: userData.findUserByID } };
  }
  return { props: { user: null } };
}
