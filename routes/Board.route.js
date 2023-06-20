const express = require("express");
const { BoardModel } = require("../model/Board.model");

const boardRouter = express.Router();

// CREATE NEW BOARD
boardRouter.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const board = await BoardModel({ name });
    res.status(200).send(board);
  } catch (error) {
    res.status(500).send({ error: message.error });
  }
});

// GET BOARDS
boardRouter.post("/", async (req, res) => {
  try {
    const boards = await BoardModel.find();
    res.status(200).send(boards);
  } catch (error) {
    res.status(500).send({ error: message.error });
  }
});

// UPDATE BOARD
boardRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const board = await BoardModel.findOne({ _id: id });

  try {
    if (req.body.authorId !== board.authorId) {
      res.status(200).send({ msg: "Not Authorised to this action" });
    } else {
      const updatedBoards = await BoardModel.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      res
        .status(200)
        .send({ msg: "Post Updated successfully!!", updatedBoards });
    }

    res.status(200).send(updatedBoards);
  } catch (error) {
    res.status(500).send({ error: message.error });
  }
});

// DELETE BOARD
boardRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const board = await BoardModel.findOne({ _id: id });

  try {
    if (req.body.authorId !== board.authorId) {
      res.status(200).send({ msg: "Not Authorised to this action" });
    } else {
      await BoardModel.findByIdAndDelete(id, req.body, { new: true });
      res.status(200).send({ msg: "Board Deleted successfully!!" });
    }
  } catch (error) {
    res.status(500).send({ error: message.error });
  }
});

module.exports = {
  boardRouter,
};
