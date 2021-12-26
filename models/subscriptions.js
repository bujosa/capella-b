const { PubSub } = require("@google-cloud/pubsub");
const { createSubscription } = require("./pubsub");

class Subscriptions {
  constructor() {
    this.pubsub = new PubSub();
  }

  // Create my subscriptions
  initialize() {
    createSubscription("testing-topic-2", "capella-b").catch(console.error);
  }

  execute() {
    // Listen for new messages in this subscription
    this.pubsub
      .subscription("capella-b-testing-topic-2")
      .on("message", (message) => {
        const { name, email } = JSON.parse(message.data.toString());
        console.log("Name:", name);
        console.log("Email:", email);
        message.ack();
      });
  }
}

module.exports = Subscriptions;
