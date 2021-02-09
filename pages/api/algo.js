//S: The algo can be seen as a function that takes two inputs:
//S: 1. A single route (with all its data) 2. An iterable with all other routes (with all their data)
//S: And returns an array of 10 user._ids of those routes that match best. I'll call this "list return"

//S: In future this can be changed to integrate the return route together, but for beta version
//S: we keep it separate first

import graphqlClient from "../../utils/graphqlClient";
import { getRoutesByUserId, getAllRoutes } from "../../graphql/queries";
import { updateUser } from "../../graphql/mutations";
import {
  calculateDistance as cd,
  calculateTotalScore,
  nullHandler,
} from "../../app/logic/mathematicalFunctions.mjs";

export default async function (req, res) {
  console.log(req.body.data);
  const { _id } = req.body.data;

  // get userRoutes
  // S: As mentioned at the top, I need a single route; you're giving me a list.
  // S: Gimme 1 route per list return
  const userRoutesReq = getRoutesByUserId(_id);
  const userRoutesRes = await graphqlClient.request(
    userRoutesReq.query,
    userRoutesReq.variables
  );
  const userRoutes = userRoutesRes.findUserByID.routes.data;

  //S: findUserByID.routes.data does not have startLocation, startTime, endLocation etc etc. I need this.
  //S: Destructure the route to variables

  // I need to use this to format the Location objects in a way that I can calculate distance
  function destructureReturnArray(coordinateObj) {
    let { lat, lng } = coordinateObj;
    return [lat, lng];
  }

  // get allRoutes in Database
  //S: Again, allRoutes.data doesn't have all the data that I need here.
  const allRoutesReq = getAllRoutes();
  const allRoutesRes = await graphqlClient.request(allRoutesReq);
  const allRoutes = allRoutesRes.allRoutes.data;

  // filter out userRoutes from array of all routes
  //S: If we're using a single route, maybe a find() function here would be better
  for (let i = 0; i < allRoutes.length; i++) {
    if (allRoutes[i].user._id === _id) {
      allRoutes.splice(i, 1);
    }
  }

  // call algorithm
  //S: I use a Promise cuz this can take a long ass time to calculate, especially if I'm making API calls
  //S: to the Distance Matrix API for every single distance to be calculated (wtf). Not using that for now,
  //S: using a simple calculateDistance([coordiates1],[coordiates2]) from my import to calculate distance.
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
        //S: This will be the list of scores. Putting it up here cuz scope and I hate var
        for (let i = 0; i < allRoutes.length; i++) {
          //S: Does this for loop work this way? Anyway,
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
          //S: If you want the same sex and get it, then award this man 1000 points. Otherwise, you get 0 points for level 1.

          //LEVEL 2
          let startLocationComponent = calculateTotalScore(
            cd(
              destructureReturnArray(startLocationUser),
              destructureReturnArray(startLocationOther)
            ),
            nullHandler(startRadiusUser, 1),
            nullHandler(startRadiusOther, 1)
          );
          let endLocationComponent = calculateTotalScore(
            cd(
              destructureReturnArray(endLocationUser),
              destructureReturnArray(endLocationOther)
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

          // LEVEL 3 - For future use for return trip integration into the same match score as destination route. For now, we
          //           use a different match score for your return route.
          // let returnPickupComponent =
          //   RP1 && RP2
          //     ? calculateTotalScore(
          //         cd(RP1, RP2),
          //         nullHandler(RPuR1, 1),
          //         nullHandler(RPuR2, 1)
          //       )
          //     : 0;
          // let returnDropOffComponent =
          //   RDo1 && RDo2
          //     ? calculateTotalScore(
          //         cd(RDo1, RDo2),
          //         nullHandler(RDoR1, 1),
          //         nullHandler(RDoR2, 1)
          //       )
          //     : 0;

          // let returnstartTimeComponent =
          //   RPuT1 && RPuT2
          //     ? calculateTotalScore(RPuT1 - RPuT2, RPuTB1, RPuTB2)
          //     : 0;

          // let level3 =
          //   returnPickupComponent +
          //   returnDropOffComponent +
          //   returnstartTimeComponent;

          listOfScores.push([
            level1 + Math.floor(level2),
            allRoutes[i].user._id
          ]);
          //S: Push the scores into a 2-dimensional array along with the user ID of each route

          if (listOfScores.length >= 9999) {
            listOfScores.sort((a, b) => b[0] - a[0]);
            //S: Sorts the list using the score (which is why I use a[0] and b[0])
            resolve(listOfScores);
            break;
          } else {
            continue;
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
    for (let i = 0; i < userRoutes.length; i++) {
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

  // send response to database to add matched users to friends' list
  //S: My brain hurts trying to understand how this is done asynchronously. I don't know if this is right. Pls help
  const updateReq = updateUser(_id, { friends: idsArray }); //something data. Also whats wrong with await :(
  const updateRes = await graphqlClient.request(
    updateReq.mutation,
    updateReq.variables
  );
  console.log(updateRes);
  //S: LMAO I'M DONE GOD HELP MY SOUL

  // send res to front end
  res.send("ok");
}
