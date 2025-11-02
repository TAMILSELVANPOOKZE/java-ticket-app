import React, { useEffect, useState } from "react";
import axios from "axios";

const QueueTicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [formData, setFormData] = useState({
    createdBy: "",
    subject: "",
    description: "",
    type: "",
  });

  // Fetch tickets
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tickets");
      setTickets(res.data || []);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  // Handle edit button click
  const handleEditClick = (ticket) => {
    setEditingTicket(ticket.ticketId);
    setFormData({
      createdBy: ticket.createdBy,
      subject: ticket.subject,
      description: ticket.description,
      type: ticket.type,
    });
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit edit
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/tickets/${editingTicket}`,
        formData
      );
      setEditingTicket(null);
      fetchTickets(); // refresh after update
    } catch (err) {
      console.error("Error updating ticket:", err);
    }
  };

  return (
    <div>
      <h2>Queue Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Created By</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.ticketId}>
                <td>{ticket.ticketId}</td>
                <td>
                  {editingTicket === ticket.ticketId ? (
                    <input
                      type="text"
                      name="createdBy"
                      value={formData.createdBy}
                      onChange={handleChange}
                    />
                  ) : (
                    ticket.createdBy
                  )}
                </td>
                <td>
                  {editingTicket === ticket.ticketId ? (
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  ) : (
                    ticket.subject
                  )}
                </td>
                <td>
                  {editingTicket === ticket.ticketId ? (
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  ) : (
                    ticket.description
                  )}
                </td>
                <td>
                  {editingTicket === ticket.ticketId ? (
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="Bug">Bug</option>
                      <option value="Feature">Feature</option>
                      <option value="Task">Task</option>
                    </select>
                  ) : (
                    ticket.type
                  )}
                </td>
                <td>
                  {editingTicket === ticket.ticketId ? (
                    <>
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={() => setEditingTicket(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleEditClick(ticket)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QueueTicketList;
