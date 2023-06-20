const mongoose = require("mongoose");

const SubtaskSchema = mongoose.Schema(
  {
    title: String,
    authorId: String,
    isCompleted: Boolean,
  },
  {
    versionKey: false,
  }
);

const SubtaskModel = mongoose.model("Subtask", SubtaskSchema);

module.exports = {
  SubtaskModel,
};
