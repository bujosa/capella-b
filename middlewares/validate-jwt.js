const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
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
