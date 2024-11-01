import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";
import RemoveTaskPop from "../components/PopForTickets/RemoveTaskPop";
import "./Tasks.css";

const CompletedTask = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const {

    userData,
 
    allTasksCompleted,
    setAllTasksCompleted,

  } = useAuthContext();

  useEffect(() => {
    const userId = userData._id;

    axios
      .get(`http://localhost:5000/ticket/user/${userId}`)
      .then((res) => {
        setMessage(res.data.message);
        setIsError(false);

        const allTasksArray = res.data.result;

        const completedTicket = allTasksArray.filter((ticket) => {
          return ticket.ticketStatus === "Completed";
        });

        // console.log("completedTicket", completedTicket);
        setAllTasksCompleted(completedTicket);
        //================================
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setIsError(true);
      });
  }, []);

  return (
    <>
      <div className="tasks-container">
        <h1 className="font-black">Completed Task List</h1>
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
            {allTasksCompleted?.map((ticket) => (
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

      {/* {showRemoveTaskPop ? <RemoveTaskPop /> : null} */}
    </>
  );
};

export default CompletedTask;
