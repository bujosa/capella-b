const { response } = require("express");
const { publishPubSubMessage } = require("../models/pubsub");

const sendMessageToWelcomeMessage = async (req, res = response) => {
  try {
    const data = req.body;

    console.log("ID", req.id);

    // Publish message to PubSub
    await publishPubSubMessage("welcome-message", data);

    // Response status code
    res.status(200).send("Message sent to PubSub");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

module.exports = { sendMessageToWelcomeMessage };
