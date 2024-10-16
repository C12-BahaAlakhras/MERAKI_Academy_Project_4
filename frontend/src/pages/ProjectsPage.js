import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { AppData } from "../App";
import { FaSun, FaMoon } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import "./projectPage.css";

import Loading from "../components/Loading";
import ProjectDetails from "../components/project/ProjectDetails";
import AuthProvider, { useAuthContext } from "../contexts/AuthProvider";
import ProjectPop from "../components/AddProjectPop/ProjectPop";
import RemoveProjectPop from "../components/AddProjectPop/RemoveProjectPop";

const ProjectsPage = () => {
  //===========================================================
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
  } = useAuthContext();
  // ===========================================================
  const showPopAddProjectBtn = () => {
    setShowProjectPop(true);
  };
  //===========================================================

  useEffect(() => {
    // console.log("bahaaaaaaaaaa");
  }, [showProjectPop]);

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
              onClick={showPopAddProjectBtn}
              className=" bg-blue-500 text-white  py-1 px-4 rounded-lg hover:bg-blue-600 "
            >
              Add Project
            </button>
          </div>
          <div className="project-page py-3  ">
            <ProjectDetails />
          </div>

          {showProjectPop ? <ProjectPop /> : null}
          {showPopProjectRemove ? <RemoveProjectPop /> : null}
        </>
      )}
    </>
  );
};

export default ProjectsPage;
