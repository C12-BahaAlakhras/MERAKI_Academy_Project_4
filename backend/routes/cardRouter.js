const express = require("express");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
  createNewCard,
  getAllCards,
  getCardById,
  deleteCardById,
  updateCardById,
  getTeamOFCard,
  addUserToCard,
  deleteUserFromCard,
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

// get
cardsRouter.get("/card/:cardID", getTeamOFCard);
// add
cardsRouter.post("/card/:cardID/:addUserID", addUserToCard);
// delete
cardsRouter.delete("/card/:cardID/:userID", deleteUserFromCard);

module.exports = cardsRouter;
