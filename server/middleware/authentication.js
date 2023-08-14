const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      (req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null);

    console.log("Token is:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    console.log("Error message : ", error.message);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

module.exports = {
  authentication,
};
