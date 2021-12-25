const express = require("express");
const { PubSub } = require("@google-cloud/pubsub");

// If you dont have key file, you have provided apiEndpoint and projectId.
const pubsub = new PubSub({
  apiEndpoint: process.env.PUB_SUB_API_ENDPOINT,
  projectId: process.env.PUB_SUB_PROJECT_ID,
});
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.post("/api/example", async (req, res) => {
  try {
    const data = req.body;
    await publishPubSubMessage("welcome-message", data);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

async function publishPubSubMessage(topicName, data) {
  const dataBuffer = Buffer.from(JSON.stringify(data));
  await pubsub.topic(topicName).publishMessage(dataBuffer);
}
