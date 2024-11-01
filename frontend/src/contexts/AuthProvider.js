import React, { useContext, useEffect, createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [IsLogin, setIsLogin] = useState(false);
  const [IsRegister, setIsRegister] = useState(false);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [darkMode, setDarkMode] = useState(false);
  const [showProjectPop, setShowProjectPop] = useState(false);

  const [userData, setUserData] = useState({
    fullName: "",
    position: "",
    email: "",
    password: "",
    boardName: "",
  });

  const [loading, setLoading] = useState(false);
  const [showAddTaskPop, setShowAddTaskPop] = useState(false);

  const [showRemoveTaskPop, setShowRemoveTaskPop] = useState(false);

  const [showPopProjectRemove, setShowPopProjectRemove] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [newProject, setNewProject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [allTasksCompleted, setAllTasksCompleted] = useState([]);

  const [allTasksInProgress, setAllTasksInProgress] = useState([]);

  const [allTasksToDo, setAllTasksToDo] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  const [projectID, setProjectID] = useState("");
  const [targetProject, setTargetProject] = useState({});
  const [showAddUserPop, setShowAddUserPop] = useState(false);
  const [showRemoveUserPop, setShowRemoveUserPop] = useState(false);

  useEffect(() => {
    const storedIsLogin = localStorage.getItem("isLogin");
    const storedUserData = localStorage.getItem("userData");
    const storedUserToken = localStorage.getItem("token");
    // const storedAllTasks = localStorage.getItem("allTasks");

    setIsLogin(storedIsLogin);
    setUserData(storedUserData ? JSON.parse(storedUserData) : null);
    setToken(storedUserToken);
    // setAllTasks(storedAllTasks);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userLogin,
        setUserLogin,
        darkMode,
        setDarkMode,
        userData,
        setUserData,
        IsLogin,
        setIsLogin,
        IsRegister,
        setIsRegister,
        loading,
        setLoading,
        showProjectPop,
        setShowProjectPop,
        newProject,
        setNewProject,
        projects,
        setProjects,
        showPopProjectRemove,
        setShowPopProjectRemove,
        projectID,
        setProjectID,
        tickets,
        setTickets,
        showAddTaskPop,
        setShowAddTaskPop,
        showRemoveTaskPop,
        setShowRemoveTaskPop,
        targetProject,
        setTargetProject,
        allTasks,
        setAllTasks,
        allTasksCompleted,
        setAllTasksCompleted,
        allTasksToDo,
        setAllTasksToDo,
        allTasksInProgress,
        setAllTasksInProgress,
        teamMembers,
        setTeamMembers,
        showAddUserPop,
        setShowAddUserPop,
        showRemoveUserPop,
        setShowRemoveUserPop,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctxData = useContext(AuthContext);

  return ctxData;
};

export default AuthProvider;
