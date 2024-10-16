import React, { useState, useEffect } from "react";
import "./addTaskPop.css";
import { useAuthContext } from "../../contexts/AuthProvider";
import Loading from "../Loading";
import axios from "axios";
// projectName, projectDescription, projectPriority
const AddTaskPop = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [newTask, setNewTask] = useState({});

  const {
    showProjectPop,
    setShowProjectPop,
    newProject,
    setNewProject,
    projects,
    setProjects,
    userData,
    setUserData,
    token,
    setToken,
    showAddTaskPop,
    setShowAddTaskPop,
    showRemoveTaskPop,
    setShowRemoveTaskPop,
    projectID,
    setProjectID,
    targetProject,
    setTargetProject,
    tickets,
    setTickets,
  } = useAuthContext();

  const taskNameValue = (e) => {
    setNewTask({ ...newTask, ticketTitle: e.target.value });
  };
  const taskDesValue = (e) => {
    setNewTask({ ...newTask, ticketDescription: e.target.value });
  };
  const taskStatusValue = (e) => {
    setNewTask({ ...newTask, ticketStatus: e.target.value });
  };
  const taskPriorityValue = (e) => {
    setNewTask({ ...newTask, ticketPriority: e.target.value });
  };

  const closeBtn = () => {
    setShowAddTaskPop(false);
  };
  const createTasktbtn = () => {
    // console.log("userData._id", userData._id);
    // console.log("prjectId", projectID);

    // console.log("token", token);

    axios
      .post(
        `http://localhost:5000/ticket/${userData._id}/${projectID}`,
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log("create new task successfully:", res.data);
        setMessage(res.data.message);
        setIsError(false);
        //===============================
        const newTaskId = res.data.newTicket._id;

        const updatedProject = {
          ...targetProject,
          projectTickets: [...targetProject.projectTickets, newTaskId],
        };
        setTargetProject(updatedProject);

        // Add the new task to the tickets array in the context
        setTickets([...tickets, res.data.newTicket]);

        // console.log("tickets from add task pop", tickets);

        // const updateProjectData = {
        //   ...targetProject,

        //   projectTickets: [...targetProject.projectTickets, newTask],
        // };
        // setTargetProject(updateProjectData);

        // setUserData(updatedUserData);
        // localStorage.setItem("userData", JSON.stringify(updatedUserData));
        // setProjects([...projects, res.data.newProject]);

        //================================
        setTimeout(() => {
          setShowAddTaskPop(false);
        }, 500);
      })
      .catch((err) => {
        console.log("create new task error:", err);
        setMessage(err.response.data.message);
        setIsError(true);
        setShowAddTaskPop(true);
      });
  };

  useEffect(() => {
    console.log("updated targetProject:", targetProject);
    //   console.log("userData projects:", projects);
  }, [targetProject]);

  return (
    <div className="project-pop">
      <div className="title-pop">
        <h3>Create New Task</h3>
        <button onClick={closeBtn}>x</button>
      </div>
      <div className="form-pop">
        <label>Task Title</label>
        <input placeholder="Task Title" onChange={taskNameValue} />

        <label>Task Descreption</label>
        <input placeholder="Task Descreption" onChange={taskDesValue} />

        <label>Task Priority</label>
        <select onChange={taskPriorityValue}>
          <option value="" disabled selected>
            Select priority
          </option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label>Task Status</label>
        <select onChange={taskStatusValue}>
          <option value="" disabled selected>
            Select Stutes
          </option>
          <option value="Pending">Pending</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button onClick={createTasktbtn}>Create Task</button>
      </div>
    </div>
  );
};

export default AddTaskPop;
