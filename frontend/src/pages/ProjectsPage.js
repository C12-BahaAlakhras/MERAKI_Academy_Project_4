import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./projectPage.css";
import Loading from "../components/Loading";
import ProjectDetails from "../components/project/ProjectDetails";
import { useAuthContext } from "../contexts/AuthProvider";
import ProjectPop from "../components/AddProjectPop/ProjectPop";
import RemoveProjectPop from "../components/AddProjectPop/RemoveProjectPop";

const ProjectsPage = () => {
  //===========================================================
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const {
    loading,

    showProjectPop,
    setShowProjectPop,
    showPopProjectRemove,
  } = useAuthContext();
  // ===========================================================
  const showPopAddProjectBtn = () => {
    setShowProjectPop(true);
  };
  //===========================================================

  useEffect(() => {}, [showProjectPop]);

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
