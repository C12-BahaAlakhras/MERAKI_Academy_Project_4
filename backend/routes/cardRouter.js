const express = require("express");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
  createNewCard,
  getAllCards,
  getCardById,
  deleteCardById,
  updateCardById,
} = require("../controllers/cardControllers");
//
const cardsRouter = express.Router();

// ! POST
// projectsRouter.post(
//   "/:userID",
//   authentication,
//   authorization("ADMIN"),
//   createNewProject
// );

// Create card
cardsRouter.post("/:userID/:ticketID", createNewCard);
//Get all cards for a specific project
cardsRouter.get("/ticket/:ticketID", getAllCards);
//Get card by ID
cardsRouter.get("/:cardID", getCardById);
// delete Specific card
cardsRouter.delete("/:cardID", deleteCardById);
// update Specific card
cardsRouter.put("/:cardID", updateCardById);

module.exports = cardsRouter;
