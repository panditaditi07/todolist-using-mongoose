const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const taskRouter = require("./routes/taskRoutes");
const { findById } = require("./models/taskSchema");
const Task = require("./models/taskSchema");

dotenv.config({ path: "./config.env" });
const PORT = 3000;
const app = express();
app.use(express.json());
app.use("/todoList", taskRouter);

//connection to mongodb
mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, connection) => {
    if (err) {
      console.log(err);
      return console.log("error in connecting database");
    }

    console.log("Successfully connected to database");
  }
);
app.listen(PORT, console.log(`server started at running ${PORT}`));
