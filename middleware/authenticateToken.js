const jwt = require("jsonwebtoken");
const User = require("../model/User"); // Update path if necessary

const authenticateToken = async (req, res, next) => {
  // Extract token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("Token not provided");
    return res.sendStatus(401); // Unauthorized if no token
  }

  try {
    // Verify the token
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          console.log("Token verification failed:", err.message);
          return reject(err);
        }
        resolve(user);
      });
    });

    // Fetch the user from the database
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("User not found:", decoded.id);
      return res.sendStatus(404); // User not found
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.log("Error:", error.message);
    if (error.name === "JsonWebTokenError") {
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    return res.sendStatus(500); // Internal server error for other issues
  }
};

module.exports = authenticateToken;
