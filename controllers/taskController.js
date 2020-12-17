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

const getByQuery = (req, res) => {
  Task.customFilter(req.query).exec((err, results) => {
    if (err) return next(err);
    res.json(results);
  });
};

module.exports.createTask = createTask;
module.exports.getAllTasks = getAllTasks;
module.exports.getbyTaskId = getbyTaskId;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;
module.exports.getByQuery = getByQuery;
