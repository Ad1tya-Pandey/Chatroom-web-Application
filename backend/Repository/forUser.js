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
  //res.send(users);
  caller(req, res, users);
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  validator(registerUserSchema, req, res);

  if (!name || !email || !password) {
    // res.status(400);
    // res.json({ error: "Please Enter all the fields" });
    caller(req, res, "Please Enter all the fields", 400);
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    //   res.status(400);
    //   res.json({ error: "User already exists" });
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

    // res.status(201).json({
    // _id: user._id,
    // name: user.name,
    // email: user.email,
    // isAdmin: user.isAdmin,
    // pic: user.pic,
    // token: generateToken(user._id),
    // });
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
    // res.status(400);
    // res.json({ warn: "user can't be created" });
    caller(req, res, "user can't be created", 400);
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  validator(authSchema, req, res);

  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    // res.json({
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   isAdmin: user.isAdmin,
    //   pic: user.pic,
    //   token: generateToken(user._id),
    // });
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
    // res.status(401);
    // res.json({ error: "Invalid Email or Password" });
    caller(req, res, "Invalid Email or Password", 401);
  }
});

module.exports = { allUsers, registerUser, authUser };
