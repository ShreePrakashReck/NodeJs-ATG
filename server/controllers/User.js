const User = require("../models/UserModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

//Register User Controller
exports.registrationsControllers = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;
    if (!user_name || !email || !password) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      user_name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

//Login User Controller
exports.loginController = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    console.log("Email-ID : - ", user_name, password);

    if (!user_name || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    const user = await User.findOne({ user_name });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { user_name: user.user_name, id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

//forget password Controller

exports.forgetPasswordController = async (req, res) => {
  try {
    const { password, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const updatedUserPassword = await User.findByIdAndUpdate(
        (uid = existingUser._id),
        { password: encryptedPassword },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        updatedUserPassword: updatedUserPassword,
        message: "Password updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};
