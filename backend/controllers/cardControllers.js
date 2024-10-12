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

//==========================>
// add/remove/get team to Card

// get Team OF Card
const getTeamOFCard = async (req, res) => {
  // console.log("baha");
  cardID = req.params.cardID;

  try {
    const targetCard = await CardModel.findById({
      _id: cardID,
    }).populate("cardAssignedTo");
    // console.log("targetProject", targetProject);
    const arryOfTeam = targetCard.cardAssignedTo;

    res.status(200).json({
      success: true,
      message: `Get Team Of card successfully`,
      team: arryOfTeam,
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

// add Team to Card
const addUserToCard = async (req, res) => {
  cardID = req.params.cardID;
  addUserID = req.params.addUserID;

  try {
    const targetCard = await CardModel.findById({
      _id: cardID,
    });
    const idTicket = targetCard.cardTicket;
    const targetTicket = await TicketModel.findById({ _id: idTicket });
    const arryOfTeam = targetTicket.assigneeTo;
    const userExistInTicket = arryOfTeam.find((user) => {
      return user._id.toString() === addUserID;
    });

    if (userExistInTicket) {
      // add condition that if user exist tell him that

      const addUser = await CardModel.findByIdAndUpdate(
        { _id: cardID },
        { $push: { cardAssignedTo: addUserID } },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: `add user to card successfully`,
      user: userExistInTicket,
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

// delete Team from Card
const deleteUserFromCard = async (req, res) => {
  cardID = req.params.cardID;
  userID = req.params.userID;

  try {
    const removeUser = await CardModel.findByIdAndUpdate(
      { _id: cardID },
      { $pull: { cardAssignedTo: userID } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `delete user from card successfully`,
      team: removeUser,
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
  getTeamOFCard,
  addUserToCard,
  deleteUserFromCard,
};
