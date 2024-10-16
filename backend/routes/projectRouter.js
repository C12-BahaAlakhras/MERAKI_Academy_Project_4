const express = require("express");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
  createNewProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  getTeamOFProject,
  addUserToProject,
  deleteUserFromProject,
} = require("../controllers/projectControllers");
//

const projectsRouter = express.Router();

// ! POST
// // register free plan -> http://localhost:5000/user/register/admin
// usersRouter.post("/register/admin", registerAdmin);
// register -> http://localhost:5000/user/register

// projectsRouter.post(
//   "/:userID",
//   authentication,
//   authorization("ADMIN"),
//   createNewProject
// );
projectsRouter.post(
  "/:userID",

  createNewProject
);

projectsRouter.get("/all/:userID", getAllProjects);

projectsRouter.get("/:userID/:projectID", getProjectById);

projectsRouter.put(
  "/:projectID",
  authentication,
  authorization("ADMIN"),
  updateProjectById
);

// projectsRouter.delete(
//   "/:projectID",
//   authentication,
//   authorization("ADMIN"),
//   deleteProjectById
// );
projectsRouter.delete(
  "/:projectID",

  deleteProjectById
);

// add/remove/get team to project
// get
projectsRouter.get("/:projectID", getTeamOFProject);
// add
projectsRouter.post("/team/:projectID/:addUserID", addUserToProject);
//delete
projectsRouter.delete("/team/:projectID/:userID", deleteUserFromProject);

module.exports = projectsRouter;
