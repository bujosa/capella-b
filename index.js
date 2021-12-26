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

app.post("/api/topic2", async (req, res) => {
  try {
    const data = req.body;

    // Publish message to PubSub
    await publishPubSubMessage("testing-topic-2", data);

    // Response status code
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

// Create my own topics
async function createTopic(topicName = "YOUR_TOPIC_NAME") {
  await pubsub.createTopic(topicName);
  console.log(`Topic ${topic.name} created.`);
}

// Create my own subscriptions
async function createSubscription(
  topicName = "YOUR_TOPIC_NAME",
  subscriptionName = "YOUR_SUBSCRIPTION_NAME"
) {
  // Creates a new subscription
  const [subscription] = await pubsub
    .topic(topicName)
    .createSubscription(subscriptionName);
  console.log(`Subscription ${subscriptionName} created.`);
  subscription.on("message", (message) => {
    console.log(
      "Received message from the topic testing-topic-2:",
      message.data.toString()
    );
    process.exit(0);
  });
  return subscription;
}

createTopic("testing-topic-1");

// Maybe the subscription name is the name of the your services
// Example: createSubscription("created-user", "wallet-service");
const capella_a = createSubscription("testing-topic-2", "capella-b").catch(
  console.error
);

// Receive callbacks for new messages on the subscription
// capella_a.on("message", (message) => {
//   console.log(
//     "Received message from the topic testing-topic-2:",
//     message.data.toString()
//   );
//   process.exit(0);
// });
