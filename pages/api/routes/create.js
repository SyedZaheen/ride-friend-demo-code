const fetch = require("node-fetch");
import graphqlClient from "../../../utils/graphqlClient";
import minsFromMidNight from "../../../utils/minsFromMidNight";
import { createRoute } from "../../../graphql/mutations";

const googleApiKey = process.env.GOOGLE_API_KEY;

export default async function (req, res) {
  console.log("This is the time: ", req.body.data.pickUpTime);
  var pickUpCoords = {};
  var dropOffCoords = {};
  await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.data.pickUpLocation}&key=${googleApiKey}`
  )
    .then((res) => res.json())
    .then((json) => {
      pickUpCoords = json.results[0].geometry.location;
      pickUpCoords["description"] = req.body.data.pickUpLocation;
    });
  await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.data.dropOffLocation}&key=${googleApiKey}`
  )
    .then((res) => res.json())
    .then((json) => {
      dropOffCoords = json.results[0].geometry.location;
      dropOffCoords["description"] = req.body.data.dropOffLocation;
    });

  const { mutation, variables } = createRoute({
    startTime: minsFromMidNight(req.body.data.pickUpTime),
    endLocation: dropOffCoords,
    nickName: req.body.data.nickName,
    timeDeviation: parseInt(req.body.data.timeDeviation),
    endRadius: parseInt(req.body.data.dropOffDeviation),
    startLocation: pickUpCoords,
    startRadius: parseInt(req.body.data.pickUpDeviation),
    user: { connect: req.body.data.userId },
  });

  graphqlClient
    .request(mutation, variables)
    .then((res) => console.log("this was db response: ", res))
    .catch((err) => console.log(err));

  res.send("ok");
}
