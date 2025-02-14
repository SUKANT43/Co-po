import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

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
          <li><Link to="/admin" onClick={toggleSidebar}>Admin</Link></li>
          <li><Link to="/history" onClick={toggleSidebar}>History</Link></li>
          <li><Link to="/user" onClick={toggleSidebar}>Create Users</Link></li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
