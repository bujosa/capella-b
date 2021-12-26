const jwt = require("jsonwebtoken");

// This middleware just validate JWT token
const validateJWT = (req, res, next, roles = []) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        msg: "Token is not provided",
      });
    }

    const payload = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.SECRET_KEY
    );

    req.id = payload.id;

    next();
  } catch (e) {
    return res.status(401).json({
      msg: "The provided JWT is malformed",
    });
  }
};

module.exports = {
  validateJWT,
};
