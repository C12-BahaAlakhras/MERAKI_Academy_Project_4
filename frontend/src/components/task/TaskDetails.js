import React, { useState, useEffect } from "react";

import axios from "axios";
import { useAuthContext } from "../../contexts/AuthProvider";
import { CgAdd } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TaskDetails = () => {
  // const nameOfProject = () => {
  //   const targetProject = projects.find((project) => {
  //     return project._id === projectID;
  //   });
  //   return targetProject?.projectName;
  // };
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const {
    projects,
    token,
    projectID,
    tickets,
    setTickets,
    showRemoveTaskPop,
    setShowRemoveTaskPop,
    teamMembers,
    setTeamMembers,
  } = useAuthContext();

  // ===========================================================
  const deleteTaskBtn = (taskID) => {
    setShowRemoveTaskPop(taskID);
    console.log("from deleteTaskBtn taskID: ", taskID);
  };
  //===========================================================

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

  const handleUserSelection = (userId, taskId) => {
    // Find the target ticket
    const targetTicket = tickets.find((ticket) => ticket._id === taskId);

    // Find the selected user
    const targetUser = teamMembers.find((user) => user._id === userId);

    // Check if the user already exists in assigneeTo
    if (!targetTicket.assigneeTo.some((user) => user._id === userId)) {
      // Update the ticket with the new user
      const updatedTicket = {
        ...targetTicket,
        assigneeTo: [...targetTicket.assigneeTo, targetUser],
      };

      // Update the tickets array with the modified ticket
      setTickets(
        tickets.map((ticket) =>
          ticket._id === taskId ? updatedTicket : ticket
        )
      );
    }
  };

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
                  {task.assigneeTo.length > 0 ? (
                    task.assigneeTo.map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center mr-1 rounded-full"
                        style={{ backgroundColor: "#1b1aff" }}
                      >
                        <div className="w-8 h-8 flex items-center justify-center rounded-full text-white font-bold">
                          {user.fullName.charAt(0).toUpperCase()}
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
             
              </div>

              <div className="flex justify-between mt-10">
                <select
                  className="bg-white text-black text-sm border border-gray-300 py-1 px-1 pr-20 rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
                  onChange={(e) =>
                    handleUserSelection(e.target.value, task._id)
                  }
                >
                  <option value="" disabled selected>
                    Select Member
                  </option>
                  {teamMembers.map((user) => (
                    <option
                      key={user._id}
                      value={user._id}
                      className="text-black"
                    >
                      {user.fullName.toUpperCase()}
                    </option>
                  ))}
                </select>
                {/* <button
                  //   onClick={() => viewProjectPageDetiles(project._id)}
                  className="bg-blue-500 text-white py-1 px-6 rounded hover:bg-blue-600 transition duration-200"
                >
                  View
                </button> */}

                <button
                  onClick={() => {
                    deleteTaskBtn(task._id);
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
