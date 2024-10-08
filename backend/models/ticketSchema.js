const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  ticketTitle: { type: String, required: true },
  ticketDescription: { type: String },
  ticketOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ticketProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  assigneeTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  ticketStatus: { type: String },
  ticketPriority: { type: String },
  ticketCards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],

  // ticketCreatedAt: { type: Date, required: true },
  // ticketDeadLine: { type: Date, required: true },
});

module.exports = mongoose.model("Ticket", ticketSchema);

