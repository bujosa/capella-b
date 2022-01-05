const { PubSub } = require("@google-cloud/pubsub");
// First alternative
// const pubsub = new PubSub();
// End first alternative

// Second altenative if you dont want use credentials.json path
require("dotenv").config();

const pubsub = new PubSub({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
});
// End second altenative if you dont want use credentials.json path

// Publish message to PubSub
const publishPubSubMessage = async function (topicName, data) {
  const dataBuffer = Buffer.from(JSON.stringify(data));
  await pubsub.topic(topicName).publishMessage({
    data: dataBuffer,
  });
};

// Create my own topics
const createTopic = async function (topicName = "YOUR_TOPIC_NAME") {
  try {
    await pubsub.createTopic(topicName);
    console.log(`Topic ${topic.name} created.`);
  } catch (e) {}
};

// Create my own subscriptions
// Example: createSubscription("created-user", "wallet-service");
// Result: wallet-service-created-user
const createSubscription = async function (
  topicName = "YOUR_TOPIC_NAME",
  subscriptionName = "YOUR_SUBSCRIPTION_NAME"
) {
  // Creates a new subscription
  try {
    await pubsub
      .topic(topicName)
      .createSubscription(subscriptionName + "-" + topicName);

    console.log(`Subscription ${subscriptionName} created.`);
  } catch (e) {}
};

module.exports = { publishPubSubMessage, createTopic, createSubscription };
