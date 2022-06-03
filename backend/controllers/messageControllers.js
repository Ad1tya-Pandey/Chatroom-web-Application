const asyncHandler = require("express-async-handler");
const { model } = require("mongoose");
const caller = require("../../helpers/caller");
const Chat = require("../models/chatModel");
const Message = require("../models/messagemodel");
const User = require("../models/userModel");

//description     Create New Message
//route           POST /api/Message/
// access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    caller(req, res, "Invalid data passed into request", 400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");

    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    caller(req, res, message);
  } catch (error) {
    caller(req, res, "error.message");
  }
});

//description     Get all Messages
//route           GET /api/Message/:chatId
//access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages };
