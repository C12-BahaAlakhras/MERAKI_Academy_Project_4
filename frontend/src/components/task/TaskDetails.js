import React, { useState, useEffect } from "react";

import axios from "axios";
import { useAuthContext } from "../../contexts/AuthProvider";
import { CgAdd } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TaskDetails = () => {
  const nameOfProject = () => {
    const targetProject = projects.find((project) => {
      return project._id === projectID;
    });
    return targetProject?.projectName;
  };
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const {
    userData,
    setUserData,
    projects,
    setProjects,
    showPopProjectRemove,
    setShowPopProjectRemove,
    token,
    setToken,
    projectID,
    setProjectID,
    tickets,
    setTickets,
    showAddTaskPop,
    setShowAddTaskPop,
    showRemoveTaskPop,
    setShowRemoveTaskPop,
  } = useAuthContext();
  useEffect(() => {
    const projectId = projectID;
    // console.log("test token ==>", token);
    axios
      .get(`http://localhost:5000/ticket/project/${projectId}`)
      .then((res) => {
        console.log("arry of Tickets res.data.result ==>", res.data.result);
        setMessage(res.data.message);
        setIsError(false);
        setTickets(res.data.result);
        // setProjects(res.data.result);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setIsError(true);
      });
  }, [token]);

  return (
    <>
      {/* <h1>{nameOfProject()}</h1> */}
      <>
        {tickets.map((task) => {
          //   console.log("tickets", tickets);
          return (
            <div className="max-w-sm rounded-lg overflow-hidden shadow-lg p-4 bg-white border border-gray-200">
              <h2 className="text-xl font-semibold mb-2 border-b pb-2">
                {task?.ticketTitle}
              </h2>
              <p className="text-gray-700 mb-2 border-b pb-2">
                {task.ticketDescription}
                {/* {console.log("task.ticketDescription", task.ticketDescription)} */}
              </p>
              <p
                className={`text-sm font-bold mb-4 ${
                  task.ticketPriority === "High"
                    ? "text-red-500"
                    : task.ticketPriority === "Medium"
                    ? "text-orange-500"
                    : "text-green-500"
                }`}
              >
                <span className="text-gray-500">Priority: </span>
                {task.ticketPriority}
              </p>
              <p
                className={`text-sm font-bold mb-4 ${
                  task.ticketStatus === "Pending"
                    ? "text-red-500"
                    : task.ticketStatus === "In-Progress"
                    ? "text-orange-500"
                    : "text-green-500"
                }`}
              >
                <span className="text-gray-500">Status: </span>
                {task.ticketStatus}
              </p>
              <div className="mb-4 flex items-center justify-between border-t border-b border-gray-200 py-3">
                <div className="flex items-center">
                  {tickets.assigneeTo?.length > 0 ? (
                    tickets.map((task, index) => (
                      <div
                        key={index}
                        className="flex items-center mr-1 rounded-full"
                        style={{ backgroundColor: "#1b1aff" }}
                      >
                        <div className="w-8 h-8 flex items-center justify-center rounded-full text-white font-bold">
                          {task.assigneeTo.charAt(0).toUpperCase()}
                          {/* First letter of the user's name */}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No Team assigned to this Task
                    </p>
                  )}
                </div>
                {/* Add User Button */}
                <button className="flex items-center text-blue-500  ml-2 ">
                  <CgAdd className="text-lg" />
                </button>
              </div>

              <div className="flex justify-between mt-10">
                <button
                  //   onClick={() => viewProjectPageDetiles(project._id)}
                  className="bg-blue-500 text-white py-1 px-6 rounded hover:bg-blue-600 transition duration-200"
                >
                  View
                </button>

                <button
                  onClick={() => {
                    // deleteProjectBtn(project._id);
                  }}
                  className="bg-red-500 text-white py-1 px-2 rounded-full hover:bg-red-600 transition duration-200 flex items-center"
                >
                  <MdDelete className="text-lg" /> {/* Delete icon */}
                </button>
              </div>
            </div>
          );
        })}
      </>
    </>
  );
};

export default TaskDetails;
