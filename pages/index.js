import React from "react";
import auth0 from "../utils/auth0";
import Navbar from "../components/Navbar";

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
      <Navbar />
      <div>{renderContent()}</div>
      <div>
        Perma logour button: <a href="/api/logout">logout</a>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);

  return { props: { user: session?.user || null } };
}
