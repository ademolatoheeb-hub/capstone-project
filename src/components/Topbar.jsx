const Topbar = () => {
  return (
    <div className="topbar">
      <input
        type="text"
        placeholder="Search for goals..."
        className="search-input"
      />

      <div className="user-info">
        <span>Welcome back, Timi</span>
        <span className="avatar">👤</span>
      </div>
    </div>
  );
};

export default Topbar;
