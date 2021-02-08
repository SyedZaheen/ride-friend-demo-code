import graphqlClient from "../../utils/graphqlClient";
import { getRoutesByUserId, getAllRoutes } from "../../graphql/queries";

export default async function (req, res) {
  console.log(req.body.data);
  const { _id } = req.body.data;

  // get userRoutes
  const userRoutesReq = getRoutesByUserId(_id);
  const userRoutesRes = await graphqlClient.request(
    userRoutesReq.query,
    userRoutesReq.variables
  );
  const userRoutes = userRoutesRes.findUserByID.routes.data;

  // get allRoutes in Database
  const allRoutesReq = getAllRoutes();
  const allRoutesRes = await graphqlClient.request(allRoutesReq);
  const allRoutes = allRoutesRes.allRoutes.data;

  // filter out userRoutes from array of all routes
  for (let i = 0; i < allRoutes.length; i++) {
    if (allRoutes[i].user._id === _id) {
      allRoutes.splice(i, i + 1);
    }
  }

  // call algorithm

  // send response to database to add matched users to friends' list

  // send res to front end
  res.send("ok");
}
