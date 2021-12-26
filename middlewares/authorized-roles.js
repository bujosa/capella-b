const jwt = require("jsonwebtoken");
const { ADMIN, CLIENT } = require("../utils/user-roles");

// This middleware check if the user has the required role
// you dont need to use validateJWT middleware
const authorizedAdmin = function (req, res, next) {
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

    if (!verifyRole(payload.role, ADMIN)) {
      return res.status(403).json({
        msg: "Unauthorized role",
      });
    }

    req.id = payload.id;

    next();
  } catch (e) {
    return res.status(401).json({
      msg: "The provided JWT is malformed",
    });
  }
};

// This middleware check if the user has the required role if you use that
// you dont need to use validateJWT middleware
const authorizedClient = (req, res, next) => {
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

    if (!verifyRole(payload.role, CLIENT)) {
      return res.status(403).json({
        msg: "Unauthorized role",
      });
    }

    req.id = payload.id;

    next();
  } catch (e) {
    return res.status(401).json({
      msg: "The provided JWT is malformed",
    });
  }
};

// Verify is the role is allocated on the authorizedRoles array
verifyRole = (userRole, authorizedRoles) => {
  return authorizedRoles.includes(userRole);
};

module.exports = {
  authorizedAdmin,
  authorizedClient,
};
