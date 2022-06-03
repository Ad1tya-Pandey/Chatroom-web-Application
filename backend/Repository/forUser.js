const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const logger = require("../config/logger");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcryptjs");
const {
  authSchema,
  registerUserSchema,
  validator,
} = require("../../helpers/validate_schema");
const { LEGAL_TLS_SOCKET_OPTIONS } = require("mongodb");
const caller = require("../../helpers/caller");
const user = require("../models/userModel");

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  //except the current logged in user return what's been found for every other user
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  caller(req, res, users);
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  validator(registerUserSchema, req, res);

  if (!name || !email || !password) {
    caller(req, res, "Please Enter all the fields", 400);
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    caller(req, res, "User already exists", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    logger.info(` ${user} has created a new account Successfully`);

    caller(
      req,
      res,
      `_id: ${user._id},name: ${user.name},email: ${user.email}, isAdmin: ${
        user.isAdmin
      },pic: ${user.pic}, token: ${generateToken(user._id)}`,
      201
    );
  } else {
    logger.error(` ${user} was not able to create account`);

    caller(req, res, "user can't be created", 400);
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  validator(authSchema, req, res);

  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    caller(
      req,
      res,
      `_id: ${user._id},name: ${user.name},email: ${user.email}, isAdmin: ${
        user.isAdmin
      },pic: ${user.pic}, token: ${generateToken(user._id)}`,
      201
    );
    logger.info(` ${user} has successfully logged in `);
  } else {
    logger.info(` ${user} has typed invalid email or password`);

    caller(req, res, "Invalid Email or Password", 401);
  }
});

module.exports = { allUsers, registerUser, authUser };
