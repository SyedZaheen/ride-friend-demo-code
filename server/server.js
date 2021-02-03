const next = require("next");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = require("node-fetch");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const googleApiKey = process.env.GOOGLE_API_KEY;

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cors());
    server.use(express.json());

    server.post("/route-create", async (req, res) => {
      var pickUpCoords = {};
      var dropOffCoords = {};
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.data.pickUpLocation}&key=${googleApiKey}`
      )
        .then((res) => res.json())
        .then((json) => {
          pickUpCoords = json.results[0].geometry.location;
          pickUpCoords["description"] = req.body.data.pickUpLocation;
        });
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.data.dropOffLocation}&key=${googleApiKey}`
      )
        .then((res) => res.json())
        .then((json) => {
          dropOffCoords = json.results[0].geometry.location;
          dropOffCoords["description"] = req.body.data.dropOffLocation;
        });
      res.send("ok");
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, () => {
      console.log("> Express server is running on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
