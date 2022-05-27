const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const joi = require("joi");
const logger = require("./config/logger");
//making an instant of the express
const app = express();
dotenv.config();

app.use(express.json());

connectDB();

//----------CORS handling , CORS is a security mechanism enforced by the browser--------------
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); //allowing all origins to access api
//   //   res.header("Access-Control-Allow-Headers", "*"); // can be used to restrict the types of header incoming
//   //   if (req.method === "OPTIONS") {
//   //     res.header(
//   //       "Access - Control - Allow - Methods",
//   //       " PUT, POST, PATCH, DELETE, GET"
//   //     ); //restricting the http methods
//   //     return res.status(200).json({});
//   //   }
//   next;
// });

//creating first express api---------------------
app.get("/", (req, res) => {
  res.send("api is running");
});

//routes which should handle the requests------------
app.use("/api/user", userRoutes);

//error handling-----------------------------------
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Error Handling middlewares
// app.use(notFound);
// app.use(errorHandler);

// // to get chat info
// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   // console.log(req.params.id);
//   const singlechat = chats.find((c) => c._id === req.params.id);
//   res.send(singlechat);
//   // console.log(req);
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`server has started on port: ${PORT}`);
});

/* winston and joi validation
for login purposes
handle invalid or malicious data use http reqs
validation and failure, sending same response as per bad data , server error etc.*/
