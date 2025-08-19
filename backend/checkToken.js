require("dotenv").config(); // load .env config
const jwt = require("jsonwebtoken");
const generateToken = require("./authController/JwtToken"); // path must match your file

// Token generate karo using a fake userId (jaise "user123")
const userId = "685e7f741bc6806c016cafa3"; // <-- yeh manually diya hai for testing

const token = generateToken(userId); // generate token

console.log("\n Generated JWT Token:\n", token); // print token

//  Token decode karo
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("\n Decoded Payload:\n", decoded); // print payload
} catch (err) {
  console.log("\n Invalid token:", err.message);
}

