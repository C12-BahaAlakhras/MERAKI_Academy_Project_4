const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const usersRouter = require("./routes/userRouter");
const rolesRouter = require("./routes/roleRouter");
const projectsRouter = require("./routes/projectRouter");

// Routes Middleware
app.use("/roles", rolesRouter);
app.use("/users", usersRouter);
app.use("/project", projectsRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
