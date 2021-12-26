const { PubSub } = require("@google-cloud/pubsub");
const pubsub = new PubSub();

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
