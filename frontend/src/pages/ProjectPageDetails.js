import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { useAuthContext } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import ProjectDetails from "../components/project/ProjectDetails";
import ProjectPop from "../components/AddProjectPop/ProjectPop";
import RemoveProjectPop from "../components/AddProjectPop/RemoveProjectPop";
import TaskDetails from "../components/task/TaskDetails";
import AddTaskPop from "../components/PopForTickets/addTaskPop";
import RemoveTaskPop from "../components/PopForTickets/RemoveTaskPop";

const ProjectPageDetails = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const {
    newProject,
    setNewProject,
    loading,
    setLoading,
    showProjectPop,
    setShowProjectPop,
    showPopProjectRemove,
    setShowPopProjectRemove,
    projects,
    setProjects,
    projectID,
    setProjectID,
    token,
    showAddTaskPop,
    setShowAddTaskPop,
    showRemoveTaskPop,
    setShowRemoveTaskPop,
    targetProject,
    setTargetProject,
  } = useAuthContext();

  const addTaskbtn = () => {
    const projectIn = projects.find((project) => {
      return project._id === projectID;
    });
    // console.log("projectIn", projectIn);
    setTargetProject(projectIn);
    setShowAddTaskPop(true);
  };

  // useEffect(() => {
  //   console.log(token);
  // }, [token]);


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="add-project-div">
            <Link className="text-sky-600" to="/dashboard">
              Projects
            </Link>
            <button
              onClick={addTaskbtn}
              className=" bg-blue-500 text-white  py-1 px-4 rounded-lg hover:bg-blue-600 "
            >
              Add Task
            </button>
          </div>
          <div className="project-page py-3  ">
            <TaskDetails />
          </div>

          {showAddTaskPop ? <AddTaskPop /> : null}
          {showRemoveTaskPop ? <RemoveTaskPop /> : null}
        </>
      )}
    </>
  );
};

export default ProjectPageDetails;
