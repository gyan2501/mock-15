const mongoose = require("mongoose");
const { Schema } = mongoose;

const BoardSchema = mongoose.Schema(
  {
    name: String,
    authorId: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    versionKey: false,
  }
);

const BoardModel = mongoose.model("Board", BoardSchema);

module.exports = {
  BoardModel,
};
