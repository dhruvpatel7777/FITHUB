const express = require("express");
const router = express.Router();
const {
  Userregister,
  Userlogin,
  getoneuser,
  resetPassword,
  getuser,
} = require("../controller/userController");
// const { handleLogin } = require('../controller/logincontroller');
const auth = require("../middleware/auth_middleware");

router.post("/Userregister", Userregister);
router.post("/Userlogin", Userlogin);
router.get("/getuser", auth, getuser);
router.post("/reset-password", resetPassword);
router.put("/getoneuser/:id", getoneuser);

module.exports = router;
