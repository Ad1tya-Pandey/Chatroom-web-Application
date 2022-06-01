const asyncHandler = require("express-async-handler");
const caller = require("../../helpers/caller");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../Repository/forChats");

//accessing the chats
accessChat;

//description     Fetch all chats for a user
//route           GET /api/chat/
//access          Protected
fetchChats;

//description     Create New Group Chat
//route           POST /api/chat/group
//access          Protected
createGroupChat;

// desc    Rename Group
// route   PUT /api/chat/rename
// access  Protected
renameGroup;

// desc    Remove user from Group
// route   PUT /api/chat/groupremove
// access  Protected

removeFromGroup;

// desc    Add user to Group / Leave
// route   PUT /api/chat/groupadd
// access  Protected
addToGroup;

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
};
