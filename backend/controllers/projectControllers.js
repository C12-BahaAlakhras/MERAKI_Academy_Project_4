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
    console.log("deleteProject", deleteProject);
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

module.exports = {
  createNewProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
