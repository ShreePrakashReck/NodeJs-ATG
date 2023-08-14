const {
  registrationsControllers,
  loginController,
  forgetPasswordController,
} = require("../controllers/User");

//middleware check authentication
const { authentication } = require("../middleware/authentication");

const express = require("express");
const router = express.Router();

//Register Routes
router.post("/register", registrationsControllers);

//Login Routes
router.post("/login", loginController);

//Forget Password Route
router.post("/forgetPassword", forgetPasswordController);

module.exports = router;
