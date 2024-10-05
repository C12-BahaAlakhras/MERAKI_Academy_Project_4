const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  projectDescription: { type: String },
  projectOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  projectMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  projectTickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
  projectPriority: { type: String },
  projectCreatedAt: { type: Date, required: true },
  projectDeadLine: { type: Date, required: true },
});

module.exports = mongoose.model("Project", projectSchema);

