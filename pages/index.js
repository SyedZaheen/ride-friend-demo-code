import React from "react";
import auth0 from "../utils/auth0";

export default function Home({ session }) {
  console.log("this is session prop ", session);

  const renderContent = () => {
    if (session) {
      return <a href="/api/logout">Logout</a>;
    }
    return <a href="/api/login">login</a>;
  };

  return (
    <div>
      Hello World
      <div>{renderContent()}</div>
      <div>
        Perma logour button: <a href="/api/logout">logout</a>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  if (session) {
    return { props: { user: session?.user || null } };
  }
  return { props: {} };
}
