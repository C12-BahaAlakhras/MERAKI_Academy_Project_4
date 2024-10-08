const express = require("express");
const BoardModel = require("../models/boardSchema");
const ProjectModel = require("../models/projectSchema");
const UserModel = require("../models/userSchema");
const TicketModel = require("../models/ticketSchema");

const createNewTicket = async (req, res) => {
  const userID = req.params.userID;
  const projectID = req.params.projectID;
  try {
    const { ticketTitle, ticketDescription, ticketStatus, ticketPriority } =
      req.body;
    const newTicket = new TicketModel({
      ticketTitle,
      ticketDescription,
      ticketOwner: userID,
      ticketProject: projectID,
      assigneeTo: [],
      ticketStatus,
      ticketPriority,
      ticketCards: [],
    });
    //save ticket
    const saveTicket = await newTicket.save();

    // add ticket to project
    const updateProject = await ProjectModel.findByIdAndUpdate(
      { _id: projectID },
      {
        $push: { projectTickets: saveTicket },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: `Ticket created successfully `,
      result: updateProject,
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

// get all ticket in the project
const getAllTickets = async (req, res) => {
  projectID = req.params.projectID;
  console.log("baha");

  try {
    // project/:projectID

    const targetProject = await ProjectModel.findById({
      _id: projectID,
    }).populate("projectTickets");
    console.log("targetProject", targetProject);
    const arrayOfTickets = targetProject.projectTickets;
    res.status(200).json({
      success: true,
      message: `get tickets success`,
      result: arrayOfTickets,
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

// get  ticket by id
const getTicketsById = async (req, res) => {
  ticketID = req.params.ticketID;

  try {
    const ticket = await TicketModel.findById({ _id: ticketID });
    res.status(200).json({
      success: true,
      message: `get ticket by id success`,
      result: ticket,
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

// delete  ticket by id
const deleteTicketsById = async (req, res) => {
  ticketID = req.params.ticketID;

  try {
    const targetTicket = await TicketModel.findById({ _id: ticketID });
    const projectID = targetTicket.ticketProject;
    const updateProject = await ProjectModel.findByIdAndUpdate(
      { _id: projectID },
      { $pull: { projectTickets: ticketID } },
      { new: true }
    );

    const deletedTicket = await TicketModel.findByIdAndDelete({
      _id: ticketID,
    });

    res.status(200).json({
      success: true,
      message: `ticket removed successfully from projects and tickets`,
      result: deletedTicket,
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

// update  ticket by id
const updateTicketsById = async (req, res) => {
  ticketID = req.params.ticketID;
  const { ticketTitle, ticketDescription, ticketStatus, ticketPriority } =
    req.body;
  try {
    const updateTicket = await TicketModel.findByIdAndUpdate(
      { _id: ticketID },
      { ticketTitle, ticketDescription, ticketStatus, ticketPriority },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: `update ticket success`,
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
module.exports = {
  createNewTicket,
  getAllTickets,
  getTicketsById,
  deleteTicketsById,
  updateTicketsById,
};
