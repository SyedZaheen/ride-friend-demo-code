import React from "react";
import auth0 from "../utils/auth0";

export default function Home({ user }) {
  console.log("this is session prop ", user);

  const renderContent = () => {
    if (user) {
      return <a href="/api/logout">Logout</a>;
    }
    return <a href="/api/login">login</a>;
  };

  return (
    <div>
      <div>{renderContent()}</div>
      <div>
        Perma logour button: <a href="/api/logout">logout</a>
      </div>
    </div>
  );
}

// Every time a user requests for index.js the below function will run
// function below takes the session object returned from the callback endpoint,
// extracts the user info from it and puts in the component's props

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);

  return { props: { user: session?.user || null } };
}
