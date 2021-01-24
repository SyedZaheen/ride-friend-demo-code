import React, { useState } from "react";
import Navbar from "../components/Navbar";
import auth0 from "../utils/auth0";
import { getUserById } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";
import { useForm } from "react-hook-form";
import graphqlClient from "../utils/graphqlClient";
import boolean from "../utils/boolean";

// Home page will have 3 different states:
// Not logged in
// Logged in with all driver/rider stored in database
// logged in but driver/rider hasn't been selected yet

export default function Home(props) {
  const { register, handleSubmit, watch, errors } = useForm();
  const [user, setUser] = useState(props.user);

  const onSubmit = handleSubmit(async (data) => {
    const { mutation, variables } = updateUser(user._id, {
      authName: user.authName,
      authSub: user.authSub,
      isDriver: boolean(data.isDriver),
    });
    try {
      const faunaResponse = await graphqlClient.request(mutation, variables);
      setUser(faunaResponse);
    } catch (error) {
      console.log("i am error: ", error);
    }
  });

  const renderIndex = () => {
    if (user && user.isDriver !== null) {
      return <div>Normal HomePage Dashboard</div>;
    }

    if (user && user.isDriver == null) {
      return (
        <div>
          Show a form prompting the user to select whether he is a driver or
          passenger
          <form onSubmit={onSubmit}>
            <label for="driver">I am a driver </label>
            <input
              type="radio"
              id="driver"
              name="isDriver"
              ref={register}
              value="true"
            />
            <br />
            <label for="rider">I am looking for drivers </label>
            <input
              type="radio"
              id="rider"
              name="isDriver"
              ref={register}
              value="false"
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }

    if (!user) {
      return <div>Show general info about the app</div>;
    }
  };

  return (
    <div>
      <div>
        <h2>Nav bar</h2>
        {user && <a href="/api/logout">logout</a>}
        {!user && <a href="api/login">Login</a>}
      </div>
      <br />
      <br />
      <br />
      <br />
      <h2>Home page</h2>
      <div>{renderIndex()}</div>
    </div>
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
