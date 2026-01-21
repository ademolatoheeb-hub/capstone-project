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
      </div>
    </div>
  );
};

export default TopBar;

