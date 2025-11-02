import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <h2>Ticket System</h2>
      <hr />
      <ul>
        <li>
          <Link to="/create">Create Ticket</Link>
        </li>
        <li>
          <Link to="/queued">Queued Tickets</Link>
        </li>
         <li>
          <Link to="/all">All Tickets</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
