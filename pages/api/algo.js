//S: The algo can be seen as a function that takes two inputs:
//S: 1. A single route (with all its data) 2. An iterable with all other routes (with all their data)
//S: And returns an array of 10 user._ids of those routes that match best. 

import graphqlClient from "../../utils/graphqlClient";
import { getRoutesByUserId, getAllRoutes } from "../../graphql/queries";
import { updateUser } from "../../graphql/mutations";
import {
  calculateDistance as cd,
  calculateTotalScore,
  nullHandler,
  destructureReturnArray as da
} from "../../utils/algoFunctions";

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
      allRoutes.splice(i, 1);
    }
  }

  // call algorithm
  //S: I use a Promise cuz this can take a long ass time to calculate
  function allScores(
    startLocationUser,
    startTimeUser,
    endLocationUser,
    startRadiusUser,
    endRadiusUser,
    timeDeviationUser
  ) {
    return new Promise((resolve, reject) => {
      try {
        let listOfScores = [];
        for (let i = 0; i < allRoutes.length; i++) {
          let {
            startLocation: startLocationOther,
            startTime: startTimeOther,
            endLocation: endLocationOther,
            startRadius: startRadiusOther,
            endRadius: endRadiusOther,
            timeDeviation: timeDeviationOther,
          } = allRoutes[i];

          // LEVEL 1
          let level1 =
            userRoutesRes.findUserByID.wantSameSex &&
            userRoutesRes.findUserByID.isMale === allRoutes[i].user.isMale
              ? 1000
              : 0;
          //S: If user wants the same sex and get it, then route is awarded 1000 points. Else, 0 points.
       
          //LEVEL 2
          let startLocationComponent = calculateTotalScore(
            cd(
              da(startLocationUser),
              da(startLocationOther)
            ),
            nullHandler(startRadiusUser, 1),
            nullHandler(startRadiusOther, 1)
          );
          let endLocationComponent = calculateTotalScore(
            cd(
              da(endLocationUser),
              da(endLocationOther)
            ),
            nullHandler(endRadiusUser, 1),
            nullHandler(endRadiusOther, 1)
          );
          let startTimeComponent = calculateTotalScore(
            startTimeUser - startTimeOther,
            nullHandler(timeDeviationUser, 15),
            nullHandler(timeDeviationOther, 15)
          );

          let level2 =
            startLocationComponent + endLocationComponent + startTimeComponent;
          //S: Each component gives you max 333 points, making for a max points tally of 999 points for level 2.

          listOfScores.push([
            level1 + Math.floor(level2),
            allRoutes[i].user._id
          ]);
          //S: Push the scores into a 2-dimensional array along with the user ID of each route

          if (listOfScores.length === allRoutes.length) {
            listOfScores.sort((a, b) => b[0] - a[0]);
            //S: Sorts the list using the score (which is why I use a[0] and b[0])
            resolve(listOfScores);
            break;
          } 
          //S: I put this if statement in place cuz I didn't want my Promise to
          //S: resolve before the entire for loop has run. I know its shit code, pls help me fix.
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  async function getTop10UserIDsForAllRoutes() {
    let results = [];
    for (let i = 0; i < userRoutes.length; i++) { // Whats the point of this for loop?
      let {
        startLocation,
        startTime,
        endLocation,
        startRadius,
        endRadius,
        timeDeviation,
      } = userRoutes[0]; 
      const scores = await allScores(
        startLocation,
        startTime,
        endLocation,
        startRadius,
        endRadius,
        timeDeviation
      );
      let top10 = scores.slice(0, 10);
      console.log(top10);
      results.push(...scores);
    }
    return results;
  }

  let top10UserIDsForAllRoutes = await getTop10UserIDsForAllRoutes();
  const idsArray = [];
  for (let i = 0; i < top10UserIDsForAllRoutes.length; i++) {
    idsArray.push(top10UserIDsForAllRoutes[i][1]);
  }

  const updateReq = updateUser(_id, { friends: idsArray }); 
  const updateRes = await graphqlClient.request(
    updateReq.mutation,
    updateReq.variables
  );
  console.log(updateRes);

  // send res to front end
  res.send("ok");
}
