import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the updated CSS here

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>✖</button>
        <ul className="nav-links">
          <li><Link to="/admin" onClick={toggleSidebar}>Create New Record</Link></li>
          <li><Link to="/history" onClick={toggleSidebar}>History</Link></li>
          <li><Link to="/user" onClick={toggleSidebar}>Create Users</Link></li>
          <li><Link to="/remarks" onClick={toggleSidebar}>Remarks</Link></li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
