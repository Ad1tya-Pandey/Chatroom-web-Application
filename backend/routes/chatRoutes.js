const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
router.route("/").post(accessChat);
router.route("/").get(fetchChats); // would get all of the chats from db for that user
router.route("/group").post(createGroupChat);
router.route("/rename").put(renameGroup);
router.route("/groupRemove").put(removeFromGroup);
router.route("/groupAdd").put(addToGroup);

module.exports = router;
