const jwt = require("jsonwebtoken");
const { ADMIN, CLIENT } = require("../utils/user-roles");

const authorizedAdmin = (req, res, next) => {
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

const authorizedClient = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    const payload = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.SECRET_KEY
    );

    if (!verifyRole(payload.role, CLIENT)) {
      return res.status(403).json({
        msg: "Unauthorized role",
      });
    }

    next();
  } catch (e) {
    return res.status(401).json({
      msg: "The provided JWT is malformed",
    });
  }
};

verifyRole = (userRole, authorizedRoles) => {
  const authorizedRolesSet = new Set(authorizedRoles);

  return authorizedRolesSet.has(userRole);
};

module.exports = {
  authorizedAdmin,
  authorizedClient,
};
