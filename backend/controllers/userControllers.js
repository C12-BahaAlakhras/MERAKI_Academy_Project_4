const UserModel = require("../models/userSchema");
const BoardModel = require("../models/userSchema");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//! Post
// This function creates a new user // register
// user id role = 66fad671aea752e399f58866
const register = (req, res) => {
  const role = "6702d380d55d4ac192f2a00f";
  const userBoard = new BoardModel({
    boardName: req.body.boardName,
    boardMembers: [],
    boardProjects: [],
    boardCreatedAt: new Date(req.body.boardCreatedAt),
  });
  const { fullName, position, email, password } = req.body;
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
        user: result,
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
//// register
// //const registerUser = (req, res) => {};

//login
const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  usersModel
    .findOne({ email })
    .populate("role", "-_id -__v")
    .then(async (result) => {
      if (!result) {
        return res.status(403).json({
          success: false,
          message: `The email doesn't exist or The password you’ve entered is incorrect`,
        });
      }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        }
        const payload = {
          userId: result._id,
          fullName: result.firstName,
          position: result.position,
          email: result.email,
          boardID: result.userBoard,
          fullName: result.firstName,
          role: result.role,
        };

        const options = {
          expiresIn: "180m",
        };
        const token = jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
          // userId: result._id,
        });
        console.log("from backend res.id", result._id);
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

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
};
