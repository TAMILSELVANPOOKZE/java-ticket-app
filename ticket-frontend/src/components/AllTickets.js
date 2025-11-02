import React, { useState, useEffect } from "react";

function AllTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tickets/with-management")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch tickets");
        }
        return res.json();
      })
      .then((data) => {
        setTickets(data);
        if (data.length === 0) {
          alert("No tickets found!");
        }
      })
      .catch((err) => {
        console.error("Error fetching tickets:", err);
        alert("Unable to load tickets. Please check backend.");
      });
  }, []);

  return (
    <div>
      <h2>All Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
         <thead>
  <tr>
    <th>Ticket ID</th>
    <th>Created By</th>
    <th>Subject</th>
    <th>Description</th>
    <th>Type</th>
    <th>State</th>
    <th>Action</th>
    <th>Action Time</th>
    <th>Action User</th>
  </tr>
</thead>
<tbody>
  {tickets.map((ticket) => (
    <tr key={ticket.ticketId}>
      <td>{ticket.ticketId}</td>
      <td>{ticket.createdBy}</td>
      <td>{ticket.subject}</td>
      <td>{ticket.description}</td>
      <td>{ticket.type}</td>
      <td>{ticket.state || "N/A"}</td>
      <td>{ticket.action || "N/A"}</td>
      <td>{ticket.actionTime || "N/A"}</td>
      <td>{ticket.createdUser || "N/A"}</td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
}

export default AllTickets;
