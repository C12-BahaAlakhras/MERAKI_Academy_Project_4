const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  cardTitle: { type: String, required: true },
  cardDescription: { type: String },
  cardOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cardTicket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
  },
  cardAssignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  cardStatus: { type: String },
  cardPriority: { type: String },
  cardComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],

  cardCreatedAt: { type: Date, required: true },
  cardDeadLine: { type: Date, required: true },
});

module.exports = mongoose.model("Card", cardSchema);
