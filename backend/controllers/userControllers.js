const UserModel = require("../models/userSchema");
//! Post
// This function creates a new user // register
// user id role = 66fad671aea752e399f58866
const register = (req, res) => {
  // const role = "66fad671aea752e399f58866";
  const { fullName, position, email, password, userBoard, role } = req.body;
  const user = new UserModel({
    fullName,
    position,
    email,
    password,
    userBoard,
    role,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        author: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
// register
// const registerUser = (req, res) => {};

//login
const loginUser = (req, res) => {};

//Add Team to the Board
const AddTeamtoBoard = (req, res) => {};

//! Get
//get all user  in specific Board
const allUsersInBoard = (req, res) => {};

//get  user  by id
const getUsersById = (req, res) => {};

//! Remove
//get all user  in specific Board
const removeUserFromBoard = (req, res) => {};
const removeUserFromProject = (req, res) => {};
const removeUserFromTicket = (req, res) => {};

//! Put
//update  user  by id
const updateUserById = (req, res) => {};

//update  user  in specific Board
const updateUserFromBoard = (req, res) => {};

//update  user  in specific projct
const updateUserFromProject = (req, res) => {};

//update  user  in specific ticket
const updateUserFromTicket = (req, res) => {};

module.exports = {
  register,
  loginUser,
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
};
