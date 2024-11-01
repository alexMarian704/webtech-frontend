import React, { useState } from 'react';
import { FaHome, FaInfoCircle, FaStar, FaSignOutAlt } from 'react-icons/fa';
import { FaBarsStaggered } from 'react-icons/fa6';
import '../NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`navbar ${isOpen ? 'open' : 'closed'}`}>
      <div className="nav-items">
        <div className="nav-item" onClick={toggleNav}>
          <FaBarsStaggered className="icon" />
          <span className="text">{isOpen && 'Close'}</span>
        </div>
        <div className="nav-item">
          <FaHome className="icon" />
          <span className="text">{isOpen && 'Home'}</span>
        </div>
        <div className="nav-item">
          <FaInfoCircle className="icon" />
          <span className="text">{isOpen && 'Info'}</span>
        </div>
        <div className="nav-item">
          <FaStar className="icon" />
          <span className="text">{isOpen && 'Favorites'}</span>
        </div>
      </div>
      <div className="logout-section">
        <button className="logout-btn">
          <FaSignOutAlt className="icon" />
          <span className="text">{isOpen && 'Logout'}</span>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
