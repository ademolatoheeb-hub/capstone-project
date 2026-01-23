// import { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import "../styles/DashboardLayout.css";

// export default function DashboardLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="dashboard-layout">
//       {/* SIDEBAR */}
//       <Sidebar
//         isOpen={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//       />

//       {/* OVERLAY (mobile only) */}
//       {sidebarOpen && (
//         <div
//           className="sidebar-overlay"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* MAIN CONTENT */}
//       <div className="dashboard-main">
//         <Topbar onMenuClick={() => setSidebarOpen(true)} />

//         <div className="dashboard-content">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// inside DashboardLayout.jsx (or parent that controls sidebar)
// src/layouts/DashboardLayout.jsx
import { useEffect, useRef, useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import "../styles/DashboardLayout.css";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleRef = useRef(null); // hamburger / toggle button in Topbar
  const mainRef = useRef(null);
  const sidebarRef = useRef(null);

  // Accessibility: when sidebar opens, hide main from AT and move focus into sidebar.
  useEffect(() => {
    const main = mainRef.current;
    const sidebar = sidebarRef.current;

    if (sidebarOpen) {
      main?.setAttribute("aria-hidden", "true");

      // focus first focusable inside sidebar
      const first = sidebar?.querySelector(
        'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])',
      );
      first?.focus();
      // optionally add a class to the root to show overlay: handled by CSS via .layout.sidebar-open
      
    } else {
      main?.removeAttribute("aria-hidden");
      toggleRef.current?.focus();
      
    }

    return () => {
      main?.removeAttribute("aria-hidden");
    
    };
  }, [sidebarOpen]);

  return (
    <div
      className={`layout ${sidebarCollapsed ? "sidebar-collapsed" : ""} ${sidebarOpen ? "sidebar-open" : ""}`}
    >
      <Topbar
        onMenuClick={() => setSidebarOpen((s) => !s)}
        menuRef={toggleRef}
      />

      {/* Pass sidebarRef as a prop named `innerRef` if Sidebar doesn't forwardRef */}
      <Sidebar
        ref={sidebarRef}
        innerRef={sidebarRef}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={(next) => setSidebarCollapsed(next)}
      />

      {/* Overlay (visible when sidebarOpen) */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden={!sidebarOpen}
      />

      <main ref={mainRef} className="dashboard-main" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
