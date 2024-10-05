const express = require("express");
const {
  createNewUserAdmin,
  createNewUser,
  loginUser,
  allUsersInProject,
  allUsersInTicket,
  getUsersById,
} = require("../controllers/userControllers");
//
const usersRouter = express.Router();


// ! POST
// register free plan -> http://localhost:5000/user/register/admin
usersRouter.post("/register/admin", createNewUserAdmin);
// register -> http://localhost:5000/user/register
usersRouter.post("/register", createNewUser);
// login -> http://localhost:5000/user/login
usersRouter.post("/login", loginUser);
// add user in board -> http://localhost:5000/user/:adminId/addteam
usersRouter.post("/:adminId/addteam", AddTeam);
//====================================================================================
// ! GET
// get all users based on specific project -> http://localhost:5000/user/:projectID
usersRouter.get("/:projectID", allUsersInBoard);
// get all users based on specific project -> http://localhost:5000/user/:projectID/:ticketId
usersRouter.get("/:projectID/:ticketId", allUsersInTicket);

// get user by id -> http://localhost:5000/user/:userID
usersRouter.get("/:userID", getUsersById);


module.exports = usersRouter;

/*
add roles
{
  "role": "USER",
  "permissions": ["USER"]
}
{
  "role": "ADMIN",
  "permissions": ["ADMIN"]
}

USER PERMISSION = [ "ASSIGN_TEAM", "CREATE_CARDS", "CREATE_COMMENTS"]
ADMIN PERMISSION = ["CREATE_PROJECT" , "CREATE_TICKET" , "ADD_TEAM", "CREATE_CARDS", "CREATE_COMMENTS"]
*/
