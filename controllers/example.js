const { response } = require("express");
const { publishPubSubMessage } = require("../models/pubsub");

// Send pubsub message example
const sendMessageToWelcomeMessage = async (req, res = response) => {
  try {
    const data = req.body;

    // DB PROCESSING

    // Publish message to PubSub
    await publishPubSubMessage("created-purchased", data);

    // Response status code
    res.status(200).send("Message sent to PubSub");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

module.exports = { sendMessageToWelcomeMessage };
