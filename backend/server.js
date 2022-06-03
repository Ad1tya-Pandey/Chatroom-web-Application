const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const joi = require("joi");
const logger = require("./config/logger");
//making an instant of the express
const app = express();
const caller = require("../helpers/caller");
const chatRoutes = require("./routes/chatRoutes");
const { protect } = require("./middleware/authMiddleware");

dotenv.config();

app.use(express.json());

connectDB();

// //creating first express api---------------------http://localhost:5000/api/user/login
// app.get("/", (req, res) => {
//   const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
//   res.send(fullUrl);
// });

app.use(protect);

//routes which should handle the requests------------
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  logger.error(`there was an uncaught exception in  session, error:${err}`);
  process.exit(1); // mandatory (as per the Node.js docs)
});

//error handling-----------------------------------

app.use((req, res, next) => {
  const error = new Error("Not found ");
  error.status = 404;
  next(error);
});

// comment in order to make validator func work
app.use((error, req, res, next) => {
  caller(req, res, error.message, error.status || 500);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`server has started on port: ${PORT}`);
});
//repository to process the code (chat, repository), common func for sending response , make all the required routes
// protected using logic in if block with a array
//nodejs process manager pm2,uncaught exception of process
