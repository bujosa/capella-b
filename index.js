const express = require("express");
const { PubSub } = require("@google-cloud/pubsub");

// If you dont have key file, you have provided apiEndpoint and projectId.
const pubsub = new PubSub({
  projectId: process.env.PUBSUB_PROJECT_ID,
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
    console.log("Project id", process.env.PUBSUB_PROJECT_ID);
    const data = req.body;
    await publishPubSubMessage("welcome-message", data);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

async function publishPubSubMessage(topicName, data) {
  const dataBuffer = Buffer.from(JSON.stringify(data));
  //   console.log("dataBuffer", dataBuffer);
  await pubsub.topic(topicName).publishMessage({
    data: dataBuffer,
  });
}
