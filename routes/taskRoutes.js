const express = require("express");

const router = express.Router();
const Task = require("../models/taskSchema");
const {
  createTask,
  getAllTasks,
  getbyTaskId,
  updateTask,
  deleteTask,
  getByQuery,
} = require("../controllers/taskController");

router.route("/task").post(createTask);
router.route("/getAllTasks").get(getAllTasks);
router.route("/getByQuery").get(getByQuery);
router.route("/:taskId").get(getbyTaskId);
router.route("/updateTask").patch(updateTask);
router.route("/deleteTask").patch(deleteTask);

module.exports = router;
