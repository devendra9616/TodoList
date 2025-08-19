// middlewares/jwtverify.js

require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtVerify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Token missing check
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or invalid" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach payload to request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token", error: err.message });
  }
};

module.exports = jwtVerify;
