import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";
import "./Tasks.css";

const Tasks = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const { allTasks, setAllTasks, userData } = useAuthContext();

  useEffect(() => {
    const userId = userData._id;
    // http://localhost:5000/ticket/user/670ee4a022cf3719e1f0e296
    axios
      .get(`  http://localhost:5000/ticket/user/${userId}`)
      .then((res) => {
        setMessage(res.data.message);
        setIsError(false);

        const allTasksArray = res.data.result;

        setAllTasks(allTasksArray);

        // console.log("allTasks", allTasks);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setIsError(true);
      });
  }, []);

  return (
    <>
      <div className="tasks-container">
        <h1 className="font-black">Task List</h1>
        <table className="tasks-table">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th>Task Title</th>
              <th>Task Description</th>
              <th>Assignees</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {allTasks?.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.ticketTitle}</td>
                <td>{ticket.ticketDescription}</td>
                <td>
                  <div className="assignees">
                    {ticket.assigneeTo.map((assignee, index) => (
                      <div className="avatar" key={index}>
                        {assignee.slice(0, 2)?.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </td>
                <td>{ticket.ticketStatus}</td>
                <td
                  className={`priority ${ticket.ticketPriority?.toLowerCase()}`}
                >
                  {ticket.ticketPriority}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tasks;
