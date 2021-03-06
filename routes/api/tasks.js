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

//@route api/tasks/recent
//@desc get the 5 most recent tasks for the current user
//@access private

Router.get(
  "/recent",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.findOne({ user: req.user.id })
      .then(userTasks => {
        if (userTasks) {
          const stats = {};
          const tasks = userTasks.tasks;
          stats.total = tasks.length;
          stats.completed = tasks.filter(task => task.done === true).length;
          stats.uncompleted = tasks.filter(task => task.done === false).length;
          return res.json({ tasks: tasks.slice(0, 5), stats });
        }
        return res.status(404).json({ tasks: "User has no tasks created" });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ task: "Fetching user data from db" });
      });
  }
);

//@route api/tasks/stats
//@desc get user task statistics
//@access private

Router.get(
  "/stats",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.findOne({ user: req.user.id })
      .then(userTasks => {
        if (userTasks) {
          const stats = {};
          const tasks = userTasks.tasks;
          stats.total = tasks.length;
          stats.completed = tasks.filter(task => task.done === true).length;
          stats.uncompleted = tasks.filter(task => task.done === false).length;

          return res.json(stats);
        }
        return res.status(404).json({ error: "User not found " });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Error fetching user data" });
      });
  }
);

//@route api/tasks/:task_id
//@desc get a particular task
//@access private

Router.get(
  "/:task_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.findOne({ user: req.user.id })
      .then(userTasks => {
        if (userTasks) {
          //extract a particular task
          const index = userTasks.tasks
            .map(task => task._id.toString())
            .indexOf(req.params.task_id.toString());

          if (!(index < 0)) {
            return res.json(userTasks.tasks[index]);
          } else {
            return res
              .status(404)
              .json({ Error: "NO task with the provided id" });
          }
        }
        return res.status(404).json({ Error: "User not identified" });
      })
      .catch(err => {
        return res.status(404).json({ msg: "Error fetching tasks" });
      });
  }
);
//@route api/tasks/paginate/next/:skip/
//@desc fetch tasks and skip with a fixed limit of 5, (LOGIC: slice(skip-5,skip+1))
//@access public

Router.get(
  "/paginate/next/:skip/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.findOne({ user: req.user.id })
      .then(userTasks => {
        if (userTasks) {
          return res.json({
            tasks: userTasks.tasks.slice(req.params.skip - 5, req.params.skip),
            paginate: {
              next:
                userTasks.tasks.slice(req.params.skip, req.params.skip + 5)
                  .length > 0,
              prev: req.params.skip - 10 >= 0
            }
          });
        }
        return res.status(404).json({ error: "User not found" });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Fetching user data from db" });
      });
  }
);

//@route api/tasks/paginate/prev/:skip/
//@desc fetch tasks and skip with a fixed limit of 5, (LOGIC: slice(skip-5,skip+1))
//@access public

Router.get(
  "/paginate/prev/:skip/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.findOne({ user: req.user.id })
      .then(userTasks => {
        if (userTasks) {
          return res.json({
            tasks: userTasks.tasks.slice(req.params.skip - 5, req.params.skip),
            paginate: {
              next:
                userTasks.tasks.slice(req.params.skip, req.params.skip + 5)
                  .length > 0,
              prev: req.params.skip - 10 >= 0
            }
          });
        }
        return res.status(404).json({ error: "User not found" });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Fetching user data from db" });
      });
  }
);
//@route api/tasks/markdone/:task_id
//@desc mark task as completed for the current user
//@access private

Router.put(
  "/markdone/:task_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.findOne({ user: req.user.id }).then(userTask => {
      //Check if current task with task_id is in the users task list

      const index = userTask.tasks
        .map(task => task._id.toString())
        .indexOf(req.params.task_id.toString());

      if (index < 0) {
        return res.status(404).json({ msg: "No task exists with that id" });
      } else {
        let task = userTask.tasks[index];

        task.done = true;

        userTask.tasks[index] = task;
        userTask
          .save()
          .then(updatedUserTask => {
            return res.json(updatedUserTask);
          })
          .catch(err => {
            return res
              .status(500)
              .json({ msg: "Unable to save or update task" });
          });
      }
    });
  }
);
//@route api/tasks/
//@desc get tasks for the current user
//@access private

Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.findOne({ user: req.user.id })
      .then(tasks => {
        return res.json(tasks.tasks);
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

      Task.findOne({ user: req.user.id })
        .then(userTask => {
          //Check if current task with task_id is in the users task list

          const index = userTask.tasks
            .map(task => task._id.toString())
            .indexOf(req.params.task_id.toString());

          if (index < 0) {
            return res.status(404).json({ msg: "No task exists with that id" });
          } else {
            let task = userTask.tasks[index];

            (task.title = req.body.title),
              (task.description = req.body.description),
              (task.deadlineDate = req.body.deadlineDate),
              (task.done = req.body.done);

            userTask.tasks[index] = task;
            userTask
              .save()
              .then(updatedUserTask => {
                return res.json(updatedUserTask);
              })
              .catch(err => {
                return res
                  .status(500)
                  .json({ msg: "Unable to save or update task" });
              });
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

//@route api/tasks/delete/:task_id
//desc Deletes a task
//access private

Router.delete(
  "/delete/:task_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Find task to delete

    Task.findOne({ user: req.user.id })
      .then(userTask => {
        //Check if current task with task_id is in the users task list

        const index = userTask.tasks
          .map(task => task._id.toString())
          .indexOf(req.params.task_id.toString());

        if (index < 0) {
          return res.status(404).json({ msg: "No task exists with that id" });
        } else {
          userTask.tasks.splice(index, 1);
          userTask
            .save()
            .then(updatedUserTask => {
              return res.json(updatedUserTask);
            })
            .catch(err => {
              return res
                .status(500)
                .json({ msg: "Unable to save or update task" });
            });
        }
      })
      .catch(err => {
        return res.status(404).json({ msg: "No task with that id was found" });
      });
  }
);

module.exports = Router;
