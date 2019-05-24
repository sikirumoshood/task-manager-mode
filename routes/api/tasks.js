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
      //Check if the user already has tasks

      Task.findOne({ user: req.user.id }).then(userTask => {
        if (userTask) {
          //Add to the list of tasks
          const newTask = {
            title: req.body.title,
            description: req.body.description,
            deadlineDate: req.body.deadlineDate,
            done: req.body.done
          };

          userTask.tasks.unshift(newTask);
          userTask
            .save()
            .then(updatedUserTask => {
              return res.json(updatedUserTask);
            })
            .catch(err => {
              return res.status(500).json({ msg: "Error in updating task" });
            });
        } else {
          //Create a new task

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
      });
    }
  }
);

//@route api/tasks/edit/:task_id
//@desc Edit a particular task for the current user
//@access Private

Router.put(
  "/edit/:task_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Validation
    const { errors, isValid } = validateTaskInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      //Find task

      Task.findOne(req.user.id)
        .then(userTask => {
          //Check if current task with task_id is in the users task list

          const index = userTask.tasks
            .map(task => task._id)
            .indexOf(req.params.id);
          if (index < 0) {
            return res.status(404).json({ msg: "No task exists with that id" });
          } else {
            let task = userTask.tasks[index];

            (task.title = req.body.title),
              (task.description = req.body.description),
              (task.deadlineDate = req.body.deadlineDate),
              (task.done = req.body.done);

            userTask.tasks[index] = task;
            return res.json.userTask.tasks[index];
          }
        })
        .catch(err => {
          return res
            .status(404)
            .json({ msg: "No task with that id was found" });
        });
    }
  }
);
module.exports = Router;
