const jwt = require("jsonwebtoken");
const key = "hi";

const authMiddleware = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.send("token not found");
  }

  try {
    const data = jwt.verify(token, key);
    req.user = data;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authMiddleware;
