const express = require("express");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
  createNewProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
} = require("../controllers/projectControllers");
//
const projectsRouter = express.Router();

// ! POST
// // register free plan -> http://localhost:5000/user/register/admin
// usersRouter.post("/register/admin", registerAdmin);
// register -> http://localhost:5000/user/register

projectsRouter.post(
  "/:userID",
  authentication,
  authorization("ADMIN"),
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

projectsRouter.delete(
  "/:projectID",
  authentication,
  authorization("ADMIN"),
  deleteProjectById
);

module.exports = projectsRouter;
