//mongoose schema
const uniqid = require("uniqid");
const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.ObjectId,
    //   required: true,
    // },
    taskId: {
      type: String,
      default: " user" + uniqid(),
    },
    taskName: {
      type: String,
      // required: [true, "Please enter task details"],
      // validate: {
      //   validator: function (task) {
      //     console.log("this is task validator", this);
      //     return this.taskName.trim().length;
      //     return true;
      //   },
      //   message: "Task name should be a non empty string",
      // },
    },
    status: {
      type: String,
      default: "Not started",
      enum: ["Not started", "in progress", "Completed"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);
// taskSchema.virtual('timeTaken').get(function()

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;

// timeTaken=completedAt-startedAt;
