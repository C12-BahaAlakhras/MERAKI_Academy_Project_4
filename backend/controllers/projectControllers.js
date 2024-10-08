const express = require("express");
const BoardModel = require("../models/boardSchema");
const ProjectModel = require("../models/projectSchema");

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
    res.status(201).json({
      success: true,
      message: `Project created successfully `,
      result: saveProject,
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
const getAllProjects = async (req, res) => {
  try {
  } catch (err) {
    // server errors
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: err.message,
    });
  }
};
const getProjectById = async (req, res) => {
  try {
  } catch (err) {
    // server errors
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: err.message,
    });
  }
};
const updateProjectById = async (req, res) => {
  try {
  } catch (err) {
    // server errors
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: err.message,
    });
  }
};
const deleteProjectById = async (req, res) => {
  try {
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
