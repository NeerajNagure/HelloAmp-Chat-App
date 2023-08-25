const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { promisify } = require('util');

const auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not Authorized, TOKEN invalid");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no TOKEN");
  }
});

module.exports = auth;
