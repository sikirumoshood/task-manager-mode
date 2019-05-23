const express = require("express");
const Router = express.Router();
const passport = require("passport");
const Task = require("../../models/Task");
const validateTaskInput = require("../../validation/task");

//@route api/tasks/test
//@desc test task api
//@access public

Router.get("/test", (req, res) => {
  res.json({ msg: "Tasks route works" });
});

//@route api/tasks/
//@desc get tasks for the current user
//@access private

Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.find({ user: req.user.id })
      .then(tasks => {
        return res.json(tasks);
      })
      .catch(err => {
        return res.status(404).json({ msg: "Error fetching tasks" });
      });
  }
);

//@route api/tasks/create
//@desc creates a new task for the current user
//@access private

Router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTaskInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      const newTask = new Task({
        user: req.user.id
      });

      newTask.tasks.unshift({
        title: req.body.title,
        description: req.body.description,
        deadlineDate: req.body.deadlineDate,
        done: req.body.done
      });

      newTask
        .save()
        .then(task => {
          return res.json(task);
        })
        .catch(err => {
          return res.status(500).json({ msg: "Error saving task" });
        });
    }
  }
);

module.exports = Router;
