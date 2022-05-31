function caller(req, res, message, statusCode = 200) {
  Message = message;

  res.json(Message).status(200);
}
module.exports = caller;
