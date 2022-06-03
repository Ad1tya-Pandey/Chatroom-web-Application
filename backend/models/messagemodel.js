const mongoose = require("mongoose");

const messagemodel = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, //had to change 'User' to 'user' to resolve error
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);
const message = mongoose.model("message", messagemodel);

module.exports = message;
