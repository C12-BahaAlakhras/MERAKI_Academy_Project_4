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
  } = useAuthContext();
  // ===========================================================
  const showPopAddProjectBtn = () => {
    setShowProjectPop(true);
    // axios
    //   .get(`http://localhost:5000/project/all/${}`)
    //   .then((res) => {
    //     console.log("arry of projects res.data.result ==>", res.data.result);
    //     setMessage(res.data.message);
    //     setIsError(false);
    //     // setProjects(res.data.result);
    //   })
    //   .catch((err) => {
    //     setMessage(err.response.data.message);
    //     setIsError(true);
    //   });
  };
  //===========================================================
  const closeBtn = () => {
    setShowProjectPop(false);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="add-project-div">
            <Link className="text-sky-600" to="/dashboard">
              Projects /
            </Link>
            <button
              onClick={showPopAddProjectBtn}
              className=" bg-blue-500 text-white  py-1 px-4 rounded-lg hover:bg-blue-600 "
            >
              Add Project
            </button>
          </div>
          <div className="project-page py-3">
            <ProjectDetails />
          </div>

          {showProjectPop ? (
            <>
              <div>
                <h3>Title</h3>
                <button onChange={closeBtn}>x</button>
              </div>
              <ProjectPop />
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default ProjectsPage;
