const express = require("express");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
  createNewTicket,
  getAllTickets,
  getTicketsById,
  deleteTicketsById,
  updateTicketsById,
  getTeamOFTicket,
  addUserToTicket,
  deleteUserFromTicket,
} = require("../controllers/ticketControllers");
//
const ticketsRouter = express.Router();

// ! POST
// projectsRouter.post(
//   "/:userID",
//   authentication,
//   authorization("ADMIN"),
//   createNewProject
// );

// Create Ticket
// ticketsRouter.post(
//   "/:userID/:projectID",
//   authentication,
//   authorization("ADMIN"),
//   createNewTicket
// );
ticketsRouter.post(
  "/:userID/:projectID",
  // authentication,
  // authorization("ADMIN"),
  createNewTicket
);
//Get all tickets for a specific project
ticketsRouter.get("/project/:projectID", getAllTickets);
//Get ticket by ID
ticketsRouter.get("/:ticketID", getTicketsById);
// delete Specific ticket
ticketsRouter.delete("/:ticketID", deleteTicketsById);
// update Specific ticket
ticketsRouter.put("/:ticketID", updateTicketsById);

// add/remove/get team to ticket
// get
ticketsRouter.get("/team/:ticketID", getTeamOFTicket);
// add
ticketsRouter.post("/team/:ticketID/:addUserID", addUserToTicket);
//delete
ticketsRouter.delete("/team/:ticketID/:userID", deleteUserFromTicket);

module.exports = ticketsRouter;
