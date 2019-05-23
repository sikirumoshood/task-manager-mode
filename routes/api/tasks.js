const express = require("express");
const Router = express.Router();

//@route api/tasks/test
//@desc test task api
//@access public

Router.get("/test", (req, res) => {
  res.json({ msg: "Tasks route works" });
});

module.exports = Router;
