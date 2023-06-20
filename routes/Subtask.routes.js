const express = require("express");
const { SubtaskModel } = require("../model/Subtask.model");

const subtaskRouter = express.Router();

// ADD SUBTASK
subtaskRouter.post("/", async (req, res) => {
  try {
    const { title, isCompleted } = req.body;
    const subTask = await SubtaskModel({ title, isCompleted });
    await task.save();
    res.status(200).send(subTask);
  } catch (error) {
    res.status(500).send({ error: message.error });
  }
});

// GET TASK
subtaskRouter.post("/", async (req, res) => {
  try {
    const subTask = await SubtaskModel.find();
    res.status(200).send(subTask);
  } catch (error) {
    res.status(500).send({ error: message.error });
  }
});

// UPDATE TASK
subtaskRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, isCompleted } = req.body;
  const subTask = await SubtaskModel.findOne({ _id: id });

  try {
    if (req.body.authorId !== subTask.authorId) {
      res.status(200).send({ msg: "Not Authorised to this action" });
    } else {
      const updatedSubTasks = await SubtaskModel.findByIdAndUpdate(
        id,
        { title, isCompleted },
        { new: true }
      );
      res
        .status(200)
        .send({ msg: "Post Updated successfully!!", updatedSubTasks });
    }

    res.status(200).send(updatedSubTasks);
  } catch (error) {
    res.status(500).send({ error: message.error });
  }
});

module.exports = {
  subtaskRouter,
};
