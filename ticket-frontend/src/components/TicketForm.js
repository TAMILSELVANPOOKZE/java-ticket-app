import React, { useState } from "react";
import axios from "axios";
import "./TicketForm.css"; // ✅ Import CSS file

const TicketForm = () => {
  const [ticket, setTicket] = useState({
    createdBy: "",
    subject: "",
    description: "",
    type: "",
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/tickets", ticket);
      setResponse(res.data);
      setTicket({ createdBy: "", subject: "", description: "", type: "" }); // clear form
    } catch (err) {
      console.error("Error creating ticket", err);
    }
  };

  return (
    <div className="ticket-container">
      <div className="ticket-card">
        <h2 className="ticket-title">🎫 Create Ticket</h2>
        <form onSubmit={handleSubmit} className="ticket-form">
          <input
            type="text"
            name="createdBy"
            placeholder="👤 Created By"
            value={ticket.createdBy}
            onChange={handleChange}
            className="ticket-input"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder=" Subject"
            value={ticket.subject}
            onChange={handleChange}
            className="ticket-input"
            required
          />

          <textarea
            name="description"
            placeholder=" Description"
            value={ticket.description}
            onChange={handleChange}
            className="ticket-textarea"
            required
          />

          <select
            name="type"
            value={ticket.type}
            onChange={handleChange}
            className="ticket-input"
            required
          >
            <option value="">Select Type</option>
            <option value="Bug">🐞 Bug</option>
            <option value="Feature">✨ Feature</option>
            <option value="Task">✅ Task</option>
          </select>

          <button type="submit" className="ticket-button">
             Create Ticket
          </button>
        </form>

        {response && (
          <div className="ticket-response">
            <h3> Ticket Created Successfully</h3>
            <p>
              <b>ID:</b> {response.ticketId}
            </p>
            <p>
              <b>Subject:</b> {response.subject}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketForm;
