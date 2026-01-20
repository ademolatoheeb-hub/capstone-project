import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../components/sidebar.css";
import logo from "../assets/images/logo.png";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* LOGO + COLLAPSE BUTTON */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={logo} alt="Focuset logo" />
          {!collapsed && <span>Focuset</span>}
        </div>

        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="nav">
        <NavLink to="/dashboard" className="nav-link">
          📊 {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/goals" className="nav-link">
          🎯 {!collapsed && <span>Goals</span>}
        </NavLink>

        <NavLink to="/progress" className="nav-link">
          📈 {!collapsed && <span>Progress</span>}
        </NavLink>
      </nav>
    </aside>
  );
}


