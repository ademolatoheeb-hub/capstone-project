// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import "../styles/DashboardLayout.css";

// export default function DashboardLayout({ children }) {
//   return (
//     <div className="dashboard-layout">
//       <Sidebar />
//       <div className="dashboard-main">
//         <Topbar />
//         <div className="dashboard-content">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// import Sidebar from "../components/Sidebar";
// import { useState } from "react";
// import "../styles/DashboardLayout.css";

// export default function DashboardLayout({ children }) {
//   // Track if sidebar is collapsed from Sidebar
//   const [collapsed, setCollapsed] = useState(false);

//   // We'll pass collapse state to Sidebar
//   return (
//     <div className="dashboard-layout">
//       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
//       <main
//         className={`dashboard-main ${collapsed ? "collapsed" : ""}`}
//       >
//         {children}
//       </main>
//     </div>
//   );
// }

import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/DashboardLayout.css"; // Create this for sidebar + layout styles

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className={`dashboard-container ${collapsed ? "collapsed" : ""}`}>
      <aside className="sidebar">
        <button className="collapse-btn" onClick={toggleSidebar}>
          {collapsed ? "▶" : "◀"}
        </button>

        <nav className="nav-links">
          <NavLink to="/dashboard" className="nav-item">
            Dashboard
          </NavLink>
          <NavLink to="/goals" className="nav-item">
            Goals
          </NavLink>
          <NavLink to="/progress" className="nav-item">
            Progress
          </NavLink>
        </nav>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
