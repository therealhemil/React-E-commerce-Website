import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../public/css/Admin css/adminDashboard_header.css"
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";

export const AdminDashboard_header = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen, }) => {

  const [isApplicationMenuOpen, setApplicationMenuOpen] =useState(false);

  // const [isMobileOpen, setIsMobileOpen] =
  //   useState(false);

  // const [isSidebarOpen, setIsSidebarOpen] =
  //   useState(true);

  const inputRef = useRef(null);

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key === "k"
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  return (
    <header className="app-header">
      <div className="app-header-container">
        {/* LEFT */}
        <div className="app-header-left">
          {/* Sidebar Toggle */}
          <button
            className="sidebar-toggle-btn"
            onClick={handleToggle}
          >
            {isMobileSidebarOpen ? (
              <span className="toggle-icon">
                ✕
              </span>
            ) : (
              <span className="toggle-icon">
                ☰
              </span>
            )}
          </button>

          {/* Mobile Logo */}
          <Link to="/" className="mobile-logo">
            <img
              src="/images/logo/logo.svg"
              alt="Logo"
            />
          </Link>

          {/* Mobile Menu */}
          <button
            className="mobile-menu-btn"
            onClick={toggleApplicationMenu}
          >
            ⋮
          </button>

          {/* Search */}
          <div className="search-wrapper">
            <form>
              <div className="search-box">
                <span className="search-icon">
                  🔍
                </span>

                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search or type command..."
                  className="search-input"
                />

                <button
                  type="button"
                  className="search-shortcut"
                >
                  ⌘ K
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className={`app-header-right ${isApplicationMenuOpen
            ? "show-mobile-menu"
            : ""
            }`}
        >
          <div className="header-actions">
            <button className="header-icon-btn" onClick={ThemeToggleButton}>
              🌙
            </button>

            <button className="header-icon-btn">
              🔔
            </button>
          </div>

          {/* User */}
          <div className="user-dropdown">
            <img
              src="https://i.pravatar.cc/100"
              alt="User"
              className="user-avatar"
            />

            <div className="user-info">
              <h4>Hemil</h4>
              <p>Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};