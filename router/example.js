const { Router } = require("express");
const { check } = require("express-validator");
const { sendMessageToWelcomeMessage } = require("../controllers/example");
const { validateFields } = require("../middlewares/validate-fields");
const {
  authorizedAdmin,
  authorizedClient,
} = require("../middlewares/authorized-roles");

const router = Router();

// Example publish message to the topic
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    validateFields, // Validate all fields
    authorizedAdmin, // Example validate JWT, if you dont want validate-jwt middleware, just remove this line
  ],
  sendMessageToWelcomeMessage
);

module.exports = router;

/* 
path: api/example
*/
