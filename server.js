const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongoDbUri = require("./config/keys");
const bodyParser = require("body-parser");
const passport = require("passport");

//Setup db

mongoose
  .connect(mongoDbUri.mongoUri, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB CONNECTED ");
  })
  .catch(err => {
    console.log(err);
  });

//Setup body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Setup passport
app.use(passport.initialize());

//Configure passport
require("./config/passport")(passport);

//Import routes

const users = require("./routes/api/users");
const tasks = require("./routes/api/tasks");
//Use routes

app.use("/api/users", users);
app.use("/api/tasks", tasks);
const port = process.env.PORT || 5000;

//Connect server to static asset in client

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build/"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("Server running on port " + port);
});
