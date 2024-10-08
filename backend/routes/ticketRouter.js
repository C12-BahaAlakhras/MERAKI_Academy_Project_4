const express = require("express");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
  createNewTicket,
  getAllTickets,
  getTicketsById,
  deleteTicketsById,
  updateTicketsById,
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
ticketsRouter.post(
  "/:userID/:projectID",
  authentication,
  authorization("ADMIN"),
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

// POST	/projects/:projectId/	/tickets	create tickets
// GET	/projects/:projectId/	/tickets	Get all tickets for a specific project
// GET	/tickets	/:ticketId	Get ticket by ID
// DELETE 	/tickets	/:ticketId	Delete a specific ticket
// PUT	/tickets	/:ticketId	Update a specific ticket

module.exports = ticketsRouter;
