const express = require("express");

const Task = require("../models/taskSchema");

const url = require("url");

const createTask = (req, res) => {
  var newTask = new Task();
  console.log(req.body);
  newTask.taskName = req.body.taskName;
  newTask.save((err, data) => {
    try {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          status: "Task created",
          data: data,
        });
      }
    } catch {
      return err;
    }
  });
};

const getAllTasks = (req, res, next) => {
  Task.find((err, data) => {
    try {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    } catch {
      return err;
    }
  });
  next();
};

const getbyTaskId = (req, res) => {
  Task.findOne({ taskId: req.headers.taskid }, function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(data);
      // res.status(200).json({
      //   data: data,
      // });
    }
  });
};

const updateTask = (req, res) => {
  Task.update(
    { taskId: req.body.taskId },
    { $set: { taskName: req.body.taskName, status: req.body.status } },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.send(data);
        console.log("data updated");
      }
    }
  );
};

const deleteTask = (req, res) => {
  Task.remove({ taskName: req.body.taskName }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "Task deleted",
        data: data,
      });
    }
  });
};

// const getByQuery = (req, res) => {
//   let query = require("url").parse(req.url, true).query;
//   console.log(query);
//   let regexp = new RegExp("^" + req.query.taskId);
//   console.log(regexp);
//   Task.find({ taskId: regexp }, function (err, tasks) {
//     if (err) {
//       res.status(400).json({
//         message: "Error processing request " + err,
//         success: false,
//       });
//     }

//     res.status(201).send(tasks);
//   });
// };

const getByQuery = (req, res, next) => {
  let queryParameter = req.query;

  // let flag = false;
  let parameters = ["taskId", "taskName", "status", "createdAt", "updatedAt"];
  let result = parameters.every((key) => {
    console.log(req.query);
    return req.query;
  });

  // console.log(flag);
  // console.log(tasks);
  if (!result) {
    res.status(400).json({
      status: "unsuccessful",
    });
  }
  next(result);
};
const getbyId = (req, res, result) => {
  Task.find({ taskId: result }, function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(data);
      // res.status(200).json({
      //   data: data,
      // });
    }
  });
  next();
};

module.exports.createTask = createTask;
module.exports.getAllTasks = getAllTasks;
module.exports.getbyTaskId = getbyTaskId;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;
module.exports.getByQuery = getByQuery;
module.exports.getbyId = getbyId;
