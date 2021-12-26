const { Router } = require("express");
const { check } = require("express-validator");
const { sendMessageToWelcomeMessage } = require("../controllers/example");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

// Example publish message to the topic
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    validateFields,
    validateJWT,
  ],
  sendMessageToWelcomeMessage
);

// Example validate JWT
// router.get("/renew", validateJWT, renewToken);

module.exports = router;

/* 
path: api/example
*/
