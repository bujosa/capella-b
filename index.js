const express = require("express");
const { PubSub } = require("@google-cloud/pubsub");
const pubsub = new PubSub();
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
