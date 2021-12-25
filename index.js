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
    await publishPubSubMessage("welcome-message", data);
    res.status(200).send("Message sent to PubSub");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

// Publish message to PubSub
async function publishPubSubMessage(topicName, data) {
  const dataBuffer = Buffer.from(JSON.stringify(data));
  await pubsub.topic(topicName).publishMessage({
    data: dataBuffer,
  });
}
