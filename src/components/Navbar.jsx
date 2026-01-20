import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/images/logo.png";
import "./navbar.css";

const Navbar = () => {
 const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="FocuSet logo" className="navbar-logo" />
      </div>

            {/* Hamburger */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        <span />
        <span />
        <span />
      </div>

      {/* Menu */}
      <nav className="navbar-right">
        <div className= {`nav-right ${open ? "open" : ""}`}>
          <ul className="nav-links">
            <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/dashboard" onClick={() => setOpen(false)}> Dashboard</Link></li>
            <li><Link to="/goals" onClick={() => setOpen(false)}>Goals</Link></li>
            <li><Link to="/progress" onClick={() => setOpen(false)}>Progress</Link></li>
            {/* <Link to="/signup" className="signup-btn">Sign up</Link> */}
            <Link to="/signin" className="signin-btn">Sign in</Link>
          </ul>          
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
