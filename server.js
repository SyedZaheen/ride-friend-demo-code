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

    server.get("/autocomplete-api", async (req, res) => {
      const { input } = req.query;
      fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${googleApiKey}`
      )
        .then((res) => res.json())
        .then((json) => res.json(json));
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
