import React from "react";
import "./projectPop.css";
import { useAuthContext } from "../../contexts/AuthProvider";
import Loading from "../Loading";
// projectName, projectDescription, projectPriority
const ProjectPop = () => {
  const {
    showProjectPop,
    setShowProjectPop,
    newProject,
    setNewProject,
    projects,
    setProjects,
  } = useAuthContext();
  const prjectNameValue = (e) => {
    setNewProject({ ...newProject, projectName: e.target.value });
  };
  const prjectDesValue = (e) => {
    setNewProject({ ...newProject, projectDescription: e.target.value });
  };
  const prjectPriorityValue = (e) => {
    setNewProject({ ...newProject, projectPriority: e.target.value });
  };
  const closeBtn = () => {
    setShowProjectPop(false);
  };
  const createProjectbtn = () => {
    projects.push(newProject);
    setTimeout(() => {
      <Loading />;
      setShowProjectPop(false);
    }, 200);
  };

  return (
    <div className="project-pop">
      <div>
        <h3>Title</h3>
        <button onChange={closeBtn}>x</button>
      </div>
      <div className="form-pop">
        <label>Project Name</label>
        <input placeholder="Project Name" onChange={prjectNameValue} />
        <input placeholder="Project Descreption" onChange={prjectDesValue} />
        <input placeholder="Project Priority" onChange={prjectPriorityValue} />

        <button onChange={createProjectbtn}>Create Project</button>
      </div>
    </div>
  );
};

export default ProjectPop;
