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

app.post("/api/example", async (req, res) => {
  try {
    const data = req.body;

    // Publish message to PubSub
    await publishPubSubMessage("welcome-message", data);

    // Response status code
    res.status(200).send("Message sent to PubSub");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

pubsub.createTopic("welcome-message");

pubsub.subscribe("welcome-message", async (message) => {
  "Console log the message";
});

// Publish message to PubSub
async function publishPubSubMessage(topicName, data) {
  const dataBuffer = Buffer.from(JSON.stringify(data));
  await pubsub.topic(topicName).publishMessage({
    data: dataBuffer,
  });
}
