import auth0 from "../../utils/auth0";
import graphqlClient from "../../utils/graphqlClient";
import { getRoutesByUserId } from "../../graphql/queries";
import { getUserById } from "../../graphql/queries";

const Routes = (props) => {
  console.log(props);
  return (
    <div>
      <h1>My routes</h1>
      <div>
        {props.routes.map((route) => {
          if (!route.returnRoute) {
            return (
              <div>
                <h2>{route.nickName}</h2>
                <p>
                  Add a return trip to this route!{" "}
                  <a href={`/routes/${route._id}`}>Add now</a>
                </p>
              </div>
            );
          }
          return (
            <div>
              <h2>{route.nickName}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Routes;

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
