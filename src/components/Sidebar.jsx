// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./sidebar.css";
import logo from "../assets/images/logo.png";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Hide sidebar on mobile; Topbar hamburger will control mobile menu
  if (isMobile) return null;

  const linkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  return (
    <aside
      className={`sidebar ${collapsed ? "collapsed" : ""}`}
      aria-label="Primary navigation"
    >
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={logo} alt="Focuset logo" />
          {!collapsed && <span className="brand">Focuset</span>}
        </div>

        <button
          className="collapse-btn"
          onClick={() => setCollapsed((s) => !s)}
          aria-pressed={collapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      <nav className="nav" role="navigation" aria-label="Dashboard links">
        <NavLink to="/dashboard" className={linkClass}>
          <span className="icon" aria-hidden="true">
            📊
          </span>
          {!collapsed && <span className="label">Dashboard</span>}
        </NavLink>

        <NavLink to="/goals" className={linkClass}>
          <span className="icon" aria-hidden="true">
            🎯
          </span>
          {!collapsed && <span className="label">Goals</span>}
        </NavLink>

        <NavLink to="/progress" className={linkClass}>
          <span className="icon" aria-hidden="true">
            📈
          </span>
          {!collapsed && <span className="label">Progress</span>}
        </NavLink>
      </nav>
    </aside>
  );
}
