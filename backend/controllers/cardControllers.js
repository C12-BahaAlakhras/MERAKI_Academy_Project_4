const express = require("express");
// const BoardModel = require("../models/boardSchema");
// const ProjectModel = require("../models/projectSchema");
// const UserModel = require("../models/userSchema");
const TicketModel = require("../models/ticketSchema");
const CardModel = require("../models/cardSchema");

// create new card
const createNewCard = async (req, res) => {
  const userID = req.params.userID;
  const ticketID = req.params.ticketID;
  try {
    const { cardTitle, cardDescription, cardStatus, cardPriority } = req.body;
    const newCard = new CardModel({
      cardTitle,
      cardDescription,
      cardOwner: userID,
      cardTicket: ticketID,
      cardAssignedTo: [],
      cardStatus,
      cardPriority,
      cardComments: [],
    });
    //save card
    const saveCard = await newCard.save();

    // add card to ticket
    const updateTicket = await TicketModel.findByIdAndUpdate(
      { _id: ticketID },
      {
        $push: { ticketCards: saveCard },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: `card created successfully `,
      result: updateTicket,
    });
  } catch (err) {
    // server errors
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: err.message,
    });
  }
};
//
//
// get all cards
const getAllCards = async (req, res) => {
  ticketID = req.params.ticketID;

  try {
    const targetTicket = await TicketModel.findById({
      _id: ticketID,
    }).populate("ticketCards");
    //   console.log("targetTicket", targetTicket);
    const arrayOfCards = targetTicket.ticketCards;
    res.status(200).json({
      success: true,
      message: `get cards success`,
      result: arrayOfCards,
    });
  } catch (err) {
    // server errors
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: err.message,
    });
  }
};

// get card by id
const getCardById = async (req, res) => {
  cardID = req.params.cardID;

  try {
    const card = await CardModel.findById({ _id: cardID });
    res.status(201).json({
      success: true,
      message: `card created successfully `,
      result: card,
    });
  } catch (err) {
    // server errors
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: err.message,
    });
  }
};

// delete card by id
const deleteCardById = async (req, res) => {
  cardID = req.params.cardID;

  try {
    const targetCard = await CardModel.findById({ _id: cardID });
    const ticketID = targetCard.cardTicket;
    const updateTicket = await TicketModel.findByIdAndUpdate(
      { _id: ticketID },
      { $pull: { ticketCards: cardID } },
      { new: true }
    );

    const deletedCard = await CardModel.findByIdAndDelete({
      _id: cardID,
    });
    res.status(200).json({
      success: true,
      message: `card deleted successfully `,
      result: updateTicket,
    });
  } catch (err) {
    // server errors
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: err.message,
    });
  }
};

// update card by id
const updateCardById = async (req, res) => {
  const cardID = req.params.cardID;
  const { cardTitle, cardDescription, cardStatus, cardPriority } = req.body;
  try {
    const updateCard = await CardModel.findByIdAndUpdate(
      { _id: cardID },
      { cardTitle, cardDescription, cardStatus, cardPriority },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `update card success`,
      result: updateCard,
    });
  } catch (err) {
    // server errors
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: err.message,
    });
  }
};

module.exports = {
  createNewCard,
  getAllCards,
  getCardById,
  deleteCardById,
  updateCardById,
};
