const { PubSub } = require("@google-cloud/pubsub");
const { createSubscription } = require("./pubsub");

class Subscriptions {
  constructor() {
    this.pubsub = new PubSub();
  }

  // Create my subscriptions
  initialize() {
    // Example subcriptions related with this service capella b
    // testing-topic-2 is a example of topic provided by other services
    createSubscription("testing-topic-2", "capella-b").catch(console.error);
  }

  execute() {
    // Listen for new messages in this subscription
    this.pubsub
      .subscription("capella-b-testing-topic-2")
      .on("message", (message) => {
        // Example extracting data for the message
        const { your_variables } = JSON.parse(message.data.toString());

        // In this part you can specify what you want to do with the message
        // For example you can save the message in a database
        // Or you can send an email to the user

        message.ack();
      });
  }
}

module.exports = Subscriptions;
