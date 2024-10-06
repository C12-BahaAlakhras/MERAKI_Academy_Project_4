const express = require("express");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
  register,
  login,
  AddTeamtoBoard,
  allUsersInBoard,
  getUsersById,
  removeUserFromBoard,
  removeUserFromProject,
  removeUserFromTicket,
  updateUserById,
  updateUserFromBoard,
  updateUserFromProject,
  updateUserFromTicket,
} = require("../controllers/userControllers");
//
const usersRouter = express.Router();

// ! POST
// // register free plan -> http://localhost:5000/user/register/admin
// usersRouter.post("/register/admin", registerAdmin);
// register -> http://localhost:5000/user/register
usersRouter.post("/register", authentication, register);
// login -> http://localhost:5000/user/login
usersRouter.post("/login", authorization("ADMIN"), login);
// add user in board -> http://localhost:5000/user/:adminId/addteam
usersRouter.post("/:adminID/addteam", AddTeamtoBoard);
//====================================================================================
// ! GET

// get all users based on specific board -> http://localhost:5000/user/:boardID
usersRouter.get("/:adminID", allUsersInBoard);
// get all users based on specific project -> http://localhost:5000/user/:boardID/:projectID
// usersRouter.get("/:adminID/:projectID", allUsersInProject);
// get all users based on specific project -> http://localhost:5000/user/:projectID/:ticketId
// usersRouter.get("/:adminID/:projectID/:ticketID", allUsersInTicket);
// get user by id -> http://localhost:5000/user/:userID
usersRouter.get("/:userID", getUsersById);

// ! Delete
// remove user by id from board -> http://localhost:5000/user/:userID
usersRouter.delete("/:adminId/:userID", removeUserFromBoard);

// remove user by id from project-> http://localhost:5000/user/:userID
usersRouter.delete("/:projectID/:userID", removeUserFromProject);

// remove user by id from ticket -> http://localhost:5000/user/:userID
usersRouter.delete("/:ticketID/:userID", removeUserFromTicket);

// ! Put
// update user by id -> http://localhost:5000/user/:userID
usersRouter.put("/:userID", updateUserById);

// update user by id from board -> http://localhost:5000/user/:userID
usersRouter.put("/:adminId/:userID", updateUserFromBoard);

// update user by id from project-> http://localhost:5000/user/:userID
usersRouter.put("/:projectID/:userID", updateUserFromProject);

// update user by id from ticket -> http://localhost:5000/user/:userID
usersRouter.put("/:ticketID/:userID", updateUserFromTicket);

module.exports = usersRouter;

// const date = new Date("1-1-2024")
