const express = require("express");
const { TaskModel } = require("../model/Task.model");

const taskRouter = express.Router();

taskRouter.post("/", async (req, res) => {
  try {
    const { title, description, status, subtask } = req.body;
    const task = await TaskModel({ title, description, status, subtask });
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({ error: message.error });
  }
});

// GET TASK
taskRouter.post("/", async (req, res) => {
  try {
    const task = await TaskModel.find();
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({ error: message.error });
  }
});

// UPDATE TASK
taskRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status, subtask } = req.body;
  const task = await TaskModel.findOne({ _id: id });

  try {
    if (req.body.authorId !== task.authorId) {
      res.status(200).send({ msg: "Not Authorised to this action" });
    } else {
      const updatedTasks = await TaskModel.findByIdAndUpdate(
        id,
        { title, description, status, subtask },
        { new: true }
      );
      res
        .status(200)
        .send({ msg: "Post Updated successfully!!", updatedTasks });
    }

    res.status(200).send(updatedTasks);
  } catch (error) {
    res.status(500).send({ error: message.error });
  }
});

// DELETE TASK
taskRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await TaskModel.findOne({ _id: id });

  try {
    if (req.body.authorId !== task.authorId) {
      res.status(200).send({ msg: "Not Authorised to this action" });
    } else {
      await TaskModel.findByIdAndDelete(id, req.body, { new: true });
      res.status(200).send({ msg: "Board Deleted successfully!!" });
    }
  } catch (error) {
    res.status(500).send({ error: message.error });
  }
});

module.exports = {
  taskRouter,
};
