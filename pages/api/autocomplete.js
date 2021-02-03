const fetch = require("node-fetch");
const googleApiKey = process.env.GOOGLE_API_KEY;

export default async function (req, res) {
  const { input, latitude, longitude } = req.query;
  fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&location=${latitude},${longitude}&radius=100000&key=${googleApiKey}`
  )
    .then((res) => res.json())
    .then((json) => res.status(200).json(json));
}
