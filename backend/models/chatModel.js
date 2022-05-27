const mongoose = require("mongoose");
const chatmodel = mongoose.Schema(
  {
    chatname: { type: String, trim: true },
    isgroupchat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    latestmessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    groupadmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  // to create timestamp everytime new data is added
  {
    timestamps: true,
  }
);

const chat = mongoose.model("chat", chatmodel);
module.exports = chat;
//brew services start mongodb-community
//chatName
//isGroupChat
//Users
//latestMessage
// groupAdmin
