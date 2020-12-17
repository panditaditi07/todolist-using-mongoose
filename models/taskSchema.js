//mongoose schema
const uniqid = require("uniqid");
const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
      default: " user" + uniqid(),
    },
    taskName: {
      type: String,
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

taskSchema.statics.customFilter = function (qP) {
  return this.find({
    $and: [
      { $or: [{ undefined: { $eq: qP.taskId } }, { taskId: qP.taskId }] },
      { $or: [{ undefined: { $eq: qP.taskName } }, { taskName: qP.taskName }] },
      { $or: [{ undefined: { $eq: qP.status } }, { status: qP.status }] },
    ],
  });
};
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
