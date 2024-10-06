const express = require("express");
const { createNewRole } = require("../controllers/roleControllers");

const rolesRouter = express.Router();

rolesRouter.post("/", createNewRole);

module.exports = rolesRouter;

/*
 * Testing Routes:
 * POST -> http://localhost:5000/roles/
 */

/*
add roles



{
  "role": "USER",
  "permissions": ["CRUD_COMMENT"]
}
{
  "role": "ADMIN",
  "permissions": ["ADMIN"]
}

{
  "role": "ADMINFREE",
  "permissions": ["ADMINFREE"]
}

USER PERMISSION = ["CREATE_COMMENTS"]
ADMIN PERMISSION = ["CREATE_PROJECT" , "CREATE_TICKET" , "ADD_TEAM", "CREATE_CARDS", "CREATE_COMMENTS"]
*/
