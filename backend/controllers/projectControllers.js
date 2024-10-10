const express = require("express");
const BoardModel = require("../models/boardSchema");
const ProjectModel = require("../models/projectSchema");
const UserModel = require("../models/userSchema");

const createNewProject = async (req, res) => {
  const id = req.params.userID;
  try {
    const { projectName, projectDescription, projectPriority } = req.body;
    const newProject = new ProjectModel({
      projectName,
      projectDescription,
      projectOwner: id,
      projectMembers: [],
      projectTickets: [],
      projectPriority,
    });

    const saveProject = await newProject.save();

    const targetUser = await UserModel.findById({ _id: id });
    const boardId = targetUser.userBoard;
    console.log("targetBoard ====>", boardId);
    const updateBoard = await BoardModel.findByIdAndUpdate(
      { _id: boardId },
      {
        $push: { boardProjects: saveProject },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: `Project created successfully `,
      result: (saveProject, updateBoard),
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
//
// try this ======>
// {
//     "projectName": "New Project",
//     "projectDescription": "This is a new project.",
//     "projectPriority": "High"
//   }
//
//get all project in spacific board
const getAllProjects = async (req, res) => {
  const id = req.params.userID;
  try {
    const targetUser = await UserModel.findById({ _id: id });
    const boardId = targetUser.userBoard;
    const targetBoard = await BoardModel.findById({ _id: boardId }).populate(
      "boardProjects"
    );
    const allProjectsInBoard = targetBoard.boardProjects;
    res.status(200).json({
      success: true,
      message: `Get All Projects successfully`,
      result: allProjectsInBoard,
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
////

////
//get spacific project by id
const getProjectById = async (req, res) => {
  userID = req.params.userID;
  projectID = req.params.projectID;
  try {
    const targetUser = await UserModel.findById({ _id: userID });
    const boardId = targetUser.userBoard;
    const targetBoard = await BoardModel.findById({ _id: boardId }).populate(
      "boardProjects"
    );

    const arrayOfProjects = targetBoard.boardProjects;
    // console.log("arrayOfProjects", arrayOfProjects);
    const targetProject = arrayOfProjects.find((project) => {
      return project._id == projectID;
    });
    // console.log("targetProject", targetProject);
    res.status(200).json({
      success: true,
      message: `get project success`,
      result: targetProject,
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

//

//update  spacific project by his id
const updateProjectById = async (req, res) => {
  projectID = req.params.projectID;
  const { projectName, projectDescription, projectPriority } = req.body;
  try {
    const updateProject = await ProjectModel.findByIdAndUpdate(
      { _id: projectID },
      { projectName, projectDescription, projectPriority },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `update project success`,
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

//

//

// delete spacific project by his id
const deleteProjectById = async (req, res) => {
  projectID = req.params.projectID;

  try {
    const deleteProject = await ProjectModel.findById({ _id: projectID });
    // console.log("deleteProject", deleteProject);
    const userId = deleteProject.projectOwner;
    const targetUser = await UserModel.findById({ _id: userId });
    const boardID = targetUser.userBoard;

    // Remove the user from the board
    const updatedBoard = await BoardModel.findByIdAndUpdate(
      { _id: boardID },
      { $pull: { boardProjects: projectID } },
      { new: true }
    );
    const DeleteProject = await ProjectModel.findByIdAndDelete({
      _id: projectID,
    });

    res.status(200).json({
      success: true,
      message: `project removed successfully from projects and board`,
      deletedProject: DeleteProject,
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

//==========================>
// add/remove/get team to project

// get Team OF Project
const getTeamOFProject = async (req, res) => {
  console.log("baha");
  projectID = req.params.projectID;

  try {
    const targetProject = await ProjectModel.findById({
      _id: projectID,
    }).populate("projectMembers");
    console.log("targetProject", targetProject);
    const arryOfTeam = targetProject.projectMembers;

    res.status(200).json({
      success: true,
      message: `Get Team Of Project successfully`,
      team: arryOfTeam,
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

// add Team to Project
const addUserToProject = async (req, res) => {
  projectID = req.params.projectID;
  addUserID = req.params.addUserID;

  try {
    const targetProject = await ProjectModel.findById({
      _id: projectID,
    });
    const userOwner = targetProject.projectOwner;
    const adminboard = await UserModel.findById({
      _id: userOwner,
    });
    const idBoard = adminboard.userBoard;

    const targetBoard = await BoardModel.findById({
      _id: idBoard,
    }).populate("boardMembers");
    const arryOfTeam = targetBoard.boardMembers;
    console.log("arryOfTeam", arryOfTeam);
    console.log("addUserID", addUserID);

    const userExistInBoard = arryOfTeam.find((user) => {
      console.log("user._id", user._id);

      return user._id.toString() === addUserID;
    });

    console.log("userExistInBoard", userExistInBoard);

    if (userExistInBoard) {
      // add condition that if user exist tell him that
      const addUser = await ProjectModel.findByIdAndUpdate(
        { _id: projectID },
        { $push: { projectMembers: userExistInBoard } },
        { new: true }
      );
    }

    // console.log("deleteProject", deleteProject);

    res.status(200).json({
      success: true,
      message: `add user to Project successfully`,
      user: userExistInBoard,
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

// delete Team from Project
const deleteUserFromProject = async (req, res) => {
  projectID = req.params.projectID;
  userID = req.params.userID;

  try {
    const removeUser = await ProjectModel.findByIdAndUpdate(
      { _id: projectID },
      { $pull: { projectMembers: userID } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `delete user from Project successfully`,
      team: removeUser,
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
  createNewProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  getTeamOFProject,
  addUserToProject,
  deleteUserFromProject,
};
