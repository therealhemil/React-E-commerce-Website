import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { AdminDashboard_sidebar } from "./Admin_sidebar";
import { AdminDashboard_header } from "./Admin_header";

import "../../public/css/Admin css/admin_layout.css"

export const Admin_layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =useState(false);

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <AdminDashboard_sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobileSidebarOpen={
          isMobileSidebarOpen
        }
        setIsMobileSidebarOpen={
          setIsMobileSidebarOpen
        }
      />

      {/* OVERLAY */}
      {isMobileSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() =>
            setIsMobileSidebarOpen(false)
          }
        />
      )}

      {/* MAIN */}
      <div
        className={`admin-main ${
          isSidebarOpen
            ? "admin-main-expanded"
            : "admin-main-collapsed"
        }`}
      >
        <AdminDashboard_header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isMobileSidebarOpen={
            isMobileSidebarOpen
          }
          setIsMobileSidebarOpen={
            setIsMobileSidebarOpen
          }
        />

        <div className="admin-page-content" style={{height : '100%'}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
