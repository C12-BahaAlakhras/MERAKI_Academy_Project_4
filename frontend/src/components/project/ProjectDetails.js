import React, { useState, useEffect } from "react";
import "./projectCard.css";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthProvider";

const ProjectDetails = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const { userData, setUserData, projects, setProjects } = useAuthContext();
  // ===========================================================

  //   const storedIsLogin = localStorage.getItem("isLogin");
  //   const storedUserData = localStorage.getItem("userData");
  //   const storedUserToken = localStorage.getItem("token");

  //   useEffect(() => {
  //     setIsLogin(storedIsLogin);
  //     setUserData(storedUserData ? JSON.parse(storedUserData) : null);
  //     setUserData(JSON.parse(storedUserData));

  //     setToken(storedUserToken);
  //   }, []);
  //===========================================================

  useEffect(() => {
    const userId = userData._id;
    axios
      .get(`http://localhost:5000/project/all/${userId}`)
      .then((res) => {
        console.log("arry of projects res.data.result ==>", res.data.result);
        setMessage(res.data.message);
        setIsError(false);
        setProjects(res.data.result);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setIsError(true);
      });
  }, []);

  //===========================================================

  return (
    <>
      <div className="card-project"></div>
      {/* <div className="card-project">{projects}</div>
      <div className="card-project">{projects}</div>
      <div className="card-project">{projects}</div> */}
    </>
  );
};

export default ProjectDetails;
