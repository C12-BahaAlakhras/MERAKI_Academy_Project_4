const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  // boardOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  boardName: { type: String, required: true },

  boardMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  boardProjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],

  boardCreatedAt: { type: Date, required: true },
});

module.exports = mongoose.model("Board", boardSchema);
