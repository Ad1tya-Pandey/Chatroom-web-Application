// const { Router } = require("express");
// const express = require("express");
// const { registeruser } = require("../controllers/userControllers");
// const router = express.Router(); // we will use router to create different routes

// router.post("/", registeruser); //.post(registeruser); //for registeration
// // router.route('/login',authUser)          //another way of writing but here we can't chain

// module.exports = router;

const express = require("express");
const {
  registerUser,
  authUser,
  //allUsers,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;
