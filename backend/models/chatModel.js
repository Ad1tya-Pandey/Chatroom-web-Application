const mongoose = require("mongoose");
const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  // to create timestamp every time new data is added
  {
    timestamps: true,
  }
);

const chat = mongoose.model("chat", chatModel);
module.exports = chat;
//brew services start mongodb-community
//chatName
//isGroupChat
//Users
//latestMessage
// groupAdmin
