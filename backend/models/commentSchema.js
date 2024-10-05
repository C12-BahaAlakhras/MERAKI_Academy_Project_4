const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentDescription: { type: String, required: true },
  commentOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  commentCreatedAt: { type: Date, required: true },
});

module.exports = mongoose.model("Comment", commentSchema);
