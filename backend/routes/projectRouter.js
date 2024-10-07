const express = require("express");

const { create } = require("../controllers/projectControllers");
//
const projectsRouter = express.Router();

// ! POST
// // register free plan -> http://localhost:5000/user/register/admin
// usersRouter.post("/register/admin", registerAdmin);
// register -> http://localhost:5000/user/register
projectsRouter.post("/", create);

module.exports = projectsRouter;
