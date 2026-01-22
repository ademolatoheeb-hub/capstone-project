import { NavLink, useNavigate } from "react-router-dom";
import "../components/sidebar.css";
import logo from "../assets/images/logo.png";

export default function Sidebar({ isOpen = false, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    navigate("/signin");
    if (onClose) onClose();
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* LOGO */}
      <div className="sidebar-header">
        <img src={logo} alt="Focuset logo" className="sidebar-logo" />
        <span className="sidebar-title">Focuset</span>
      </div>

      {/* NAVIGATION */}
      <nav className="nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          onClick={onClose}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/goals"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          onClick={onClose}
        >
          Goals
        </NavLink>

        <NavLink
          to="/progress"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          onClick={onClose}
        >
          Progress
        </NavLink>

          <NavLink
          to="/profile"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          onClick={onClose}
        >
          Profile
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          onClick={onClose}
        >
          Settings
        </NavLink>

        {/* LOGOUT */}
        <button className="nav-link logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </nav>
    </aside>
  );
}
