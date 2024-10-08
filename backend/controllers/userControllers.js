const UserModel = require("../models/userSchema");
const BoardModel = require("../models/boardSchema");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//! Post
//  function creates a new user // register
// admin id role = 67044464780d7b93570e6235
const register = async (req, res) => {
  try {
    const role = "67044464780d7b93570e6235";
    const { fullName, position, email, password, boardName } = req.body;

    const emailIsExist = await UserModel.findOne({ email });
    console.log("emailIsExist: ===>", emailIsExist);
    if (emailIsExist) {
      return res.status(409).json({
        success: false,
        message: `The email already exists`,
      });
    }

    // create a default board for the user
    const userBoard = new BoardModel({
      boardName: boardName,
      boardMembers: [],
      boardProjects: [],
    });

    const savedBoard = await userBoard.save();
    // console.log("board ==>", savedBoard);

    // create a new user
    const newUser = new UserModel({
      fullName,
      position,
      email,
      password,
      role,
      userBoard: savedBoard._id,
    });

    const savedUser = await newUser.save();
    // console.log("user ==>", savedUser); //////////////////////

    res.status(201).json({
      success: true,
      message: `Account created successfully`,
      user: savedUser,
      board: savedBoard._id,
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

//// register
// //const registerUser = (req, res) => {};

//login
const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  UserModel.findOne({ email })
    .populate("role userBoard", "-_id -__v")
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
          userLogined: result,
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
const AddTeamtoBoard = async (req, res) => {
  const id = req.params.adminID;
  // console.log("id", id);

  try {
    //user role is = "6704445b780d7b93570e6233"
    const role = "6704445b780d7b93570e6233";
    const { fullName, position, email, password } = req.body;

    const boardOwner = await UserModel.findById({ _id: id });
    const userBoard = boardOwner.userBoard;
    // console.log("adminId", boardOwner);
    // console.log("userBoard", userBoard);

    // create a new user
    const newUser = new UserModel({
      fullName,
      position,
      email,
      password,
      role,
      userBoard: userBoard,
    });

    const addedUser = await newUser.save();
    // add user to array member of the board
    const updatedBoard = await BoardModel.findByIdAndUpdate(
      { _id: userBoard },
      { $push: { boardMembers: addedUser._id } },
      { new: true }
    );

    if (!updatedBoard) {
      return res.status(404).json({
        success: false,
        message: `Board not found`,
      });
    }

    res.status(201).json({
      success: true,
      message: `User Added successfully`,
      user: addedUser,
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

//! Get
//get all user  in specific Board
const allUsersInBoard = async (req, res) => {
  const id = req.params.adminID;
  try {
    const boardOwner = await UserModel.findById({ _id: id });
    // console.log("id ======> ", id);
    const targetBoard = await BoardModel.findById({
      _id: boardOwner.userBoard,
    });
    const memberArray = targetBoard.boardMembers;

    res.status(200).json({
      success: true,
      message: `Got All Member successfully`,
      result: memberArray,
    });
  } catch (err) {
    res.status(500).json({
      success: false,

      message: `Server Error`,
      error: err.message,
    });
  }
};

//get  user  by id
const getUsersById = async (req, res) => {
  const id = req.params.userID;
  try {
    const user = await UserModel.findById({ _id: id });

    res.status(200).json({
      success: true,
      message: `Got user by id successfully`,
      result: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: err.message,
    });
  }
};

//! Remove
//remove user from users and board
const removeUserFromBoard = async (req, res) => {
  const adminID = req.params.adminId;
  const userID = req.params.userID;
  console.log("userID", userID);

  try {
    const targetUser = await UserModel.findById(userID);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: `User not found`,
      });
    }

    const userBoardId = targetUser.userBoard;
    if (!userBoardId) {
      return res.status(400).json({
        success: false,
        message: `User does not belong to any board`,
      });
    }

    // Remove the user from the board
    const updatedBoard = await BoardModel.findByIdAndUpdate(
      userBoardId,
      { $pull: { boardMembers: userID } },
      { new: true }
    );

    if (!updatedBoard) {
      return res.status(404).json({
        success: false,
        message: `Board not found`,
      });
    }

    // delete the user
    const deletedUser = await UserModel.findByIdAndDelete(userID);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: `Failed to delete the user`,
      });
    }

    res.status(200).json({
      success: true,
      message: `User removed successfully from board and deleted`,
      user: deletedUser,
      updatedBoard,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: err.message,
    });
  }
};
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
