import React from "react";
import auth0 from "./api/utils/auth0";

class Home extends React.Component {
  renderContent() {
    if (this.props.user) {
      return <a href="/api/logout">Logout</a>;
    }
    return <a href="/api/login">login</a>;
  }
  render() {
    return (
      <div>
        Hello World
        <div>{this.renderContent()}</div>
        <div>
          Perma logour button: <a href="/api/logout">logout</a>
        </div>
      </div>
    );
  }
}

export default Home;

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);
  return {
    props: {
      user: session?.user || null,
    },
  };
}
