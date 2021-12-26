const Server = require("./models/server");
const Subscriptions = require("./models/subscriptions");

require("dotenv").config();

const server = new Server();
server.execute();

const subscriptions = new Subscriptions();
subscriptions.initialize();
subscriptions.execute();
