// contains reg ,auth , search user logic
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

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
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
  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  //const Result = await registerUserSchema.validateAsync(req.body);
  validator(registerUserSchema, req, res);

  if (!name || !email || !password) {
    res.status(400);
    //throw new Error("Please Enter all the Feilds");
    res.json({ error: "Please Enter all the fields" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    // throw new Error("User already exists");
    res.json({ error: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    logger.info(` ${user} has created a new account Successfully`);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    logger.error(` ${user} was not able to create account`);
    res.status(400);
    //throw new Error("user can't be created");
    res.json({ warn: "user can't be created" });
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //console.log("working");
  // try {
  //   const result = await authSchema.validateAsync(req.body); // for validation using joi
  // } catch (error) {
  //   res.status(400).send(error.message);
  //   return;
  // }
  validator(authSchema, req, res);

  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
    logger.info(` ${user} has successfully logged in `);
  } else {
    logger.info(` ${user} has typed invalid email or password`);
    res.status(401);
    //throw new Error("Invalid Email or Password");
    res.json({ error: "Invalid Email or Password" });
  }
});

module.exports = { allUsers, registerUser, authUser };
