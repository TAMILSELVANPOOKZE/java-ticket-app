import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TicketForm from "./components/TicketForm";
import QueueTicketList from "./components/QueueTicketList";
import AllTickets from "./components/AllTickets";

import "./App.css"; // for layout styling

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        <Navbar />

        {/* Main content */}
        <div className="content">
          <Routes>
            <Route path="/create" element={<TicketForm />} />
            <Route path="/queued" element={<QueueTicketList />} />
            <Route path="/" element={<TicketForm />} /> {/* default route */}
             <Route path="/all" element={<AllTickets />} /> {/* ✅ new route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
