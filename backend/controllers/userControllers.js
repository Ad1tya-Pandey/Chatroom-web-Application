// contains reg ,auth , search user logic

const { allUsers, registerUser, authUser } = require("../Repository/forUser");

//description     Get or Search all users
//route           GET /api/user?search=
//access          Public
allUsers;

//description     Register new user
//route           POST /api/user/
//access          Public
registerUser;

//description     Auth the user
//route           POST /api/users/login
//access          Public
authUser;

module.exports = { allUsers, registerUser, authUser };
