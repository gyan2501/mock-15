const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/User.routes");
const { auth } = require("./middleware/Auth.Middleware");
const { boardRouter } = require("./routes/Board.route");
const { taskRouter } = require("./routes/Task.routes");
const { subtaskRouter } = require("./routes/Subtask.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

//Auth middleware
app.use(auth);

// Board Routes
app.use("/boards", boardRouter);

// Task Routes
app.use("/tasks", taskRouter);

// SubTask Routes
app.use("/subtasks", subtaskRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to Data base..!");
  } catch (error) {
    console.log(error);
    console.log("Not able to connect Database..!");
  }
  console.log(`Server is Runnig on Port ${process.env.port}!!`);
});
