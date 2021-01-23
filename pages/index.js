import React from "react";
import Navbar from "../components/Navbar";
import auth0 from "../utils/auth0";

// Home page will have 3 different states:
// Not logged in
// Logged in with all driver/rider stored in database
// logged in but driver/rider hasn't been selected yet

export default function Home({ user }) {
  console.log(user);

  if (user && user.isDriver !== null) {
    return <div>Normal HomePage Dashboard</div>;
  }

  if (user && user.isDriver == null) {
    return (
      <div>
        Show a form prompting the user to select whether he is a driver or
        passenger
      </div>
    );
  }

  if (!user) {
    return <div>Show general info about the app</div>;
  }
}

// Every time a user requests for index.js the below function will run
// function below takes the session object returned from the callback endpoint,
// extracts the user info from it and puts in the component's props

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);

  return { props: { user: session?.user || null } };
}
