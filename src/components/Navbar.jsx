import { useState } from "react";
import "./navbar.css";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
      </div>

      <div className="navbar-right">
        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li>
            <a href="/signin">Sign In</a>
          </li>
          <li>
            <a href="/signup" className="signin-btn">
              Sign Up
            </a>
          </li>
        </ul>

        {/* Hamburger (visible only on small screens) */}
        <button
          className="navbar-hamburger"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu (rendered for accessibility; CSS controls visibility) */}
      {open && (
        <div className="navbar-mobile-menu">
          <a href="/signin">Sign In</a>
          <a href="/signup">Sign Up</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
