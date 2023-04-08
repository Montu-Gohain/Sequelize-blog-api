const express = require("express");
const CreateError = require("http-errors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./helpers/init_db")(); //* Connecting Database.

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/home", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Let's keep grinding.",
  });
});

// ! Mouting our rotues.

app.use("/api/users", require("./routes/userRotues"));
app.use("/api/posts", require("./routes/postsRoutes"));

app.use("*/", (req, res, next) => {
  next(CreateError.NotFound("Page not found,check your URL."));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
