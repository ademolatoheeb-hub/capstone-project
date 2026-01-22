<<<<<<< HEAD
const TopBar = ({ onMenuClick }) => {
  return (
    <div className="topbar">
      {/* MENU BUTTON (VISIBLE ON MOBILE/TABLET) */}
      <button
        className="menu-btn"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        ☰
      </button>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search for goals..."
        className="search-input"
      />

      {/* USER INFO */}
      <div className="user-info">
        <span>Welcome back, User</span>
=======
// src/components/Topbar.jsx
import { useState, useEffect } from "react";
import "../styles/topbar.css";

export default function Topbar() {
  const [open, setOpen] = useState(false);

  // Close mobile menu when viewport becomes wide or on Escape
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="topbar" role="banner">
      <div className="topbar-left">
        <input
          type="text"
          placeholder="Search for goals..."
          className="search-input"
          aria-label="Search goals"
        />
>>>>>>> 00fe9cc8c655c3d6d1b701d234a5e4872fa752c0
      </div>

<<<<<<< HEAD
export default TopBar;

=======
      <div className="topbar-right">
        <div className="user-info" aria-hidden={open ? "true" : "false"}>
          <span className="welcome">Welcome back, Timi</span>
          <span className="avatar" aria-hidden="true">
            👤
          </span>
        </div>

        {/* Hamburger (visible only on small screens) */}
        <button
          className="hamburger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
        >
          <span className="hamburger-icon">☰</span>
        </button>
      </div>

      {/* Mobile menu (rendered when open) */}
      {open && (
        <nav className="mobile-menu" role="menu" aria-label="Mobile navigation">
          <a role="menuitem" href="/dashboard">
            Dashboard
          </a>
          <a role="menuitem" href="/goals">
            Goals
          </a>
          <a role="menuitem" href="/progress">
            Progress
          </a>
        </nav>
      )}
    </header>
  );
}
>>>>>>> 00fe9cc8c655c3d6d1b701d234a5e4872fa752c0
