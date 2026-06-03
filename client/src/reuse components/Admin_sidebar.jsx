import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../public/css/Admin css/adminDashboard_sidebar.css"

import {
  LayoutDashboard,
  Calendar,
  UserCircle,
  List,
  Table,
  FileText,
  PieChart,
  Box,
  Plug,
  ChevronDown,
  MoreHorizontal,
  ShoppingCart,
} from "lucide-react";

const navItems = [
  {
    icon: <LayoutDashboard size={20} />,
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: "/admin/dashboard" }],
  },
  {
    icon: <ShoppingCart size={20} />,
    name: "E-commerce",
    subItems: [{ name: "Products", path: "/admin/products" },
    { name: 'Add Product', path: "/admin/add_product" },
    { name: 'Add Category', path: '/admin/add_category' },
  { name: 'Add Brand', path: '/admin/add_brand' },
  ]
  },
  {
    icon: <UserCircle size={20} />,
    name: "User Profile",
    path: "/profile",
  },
  {
    // icon: <Calendar size={20} />,
    // name: "Calendar",
    // path: "/calendar",
  },
  {
    // name: "Forms",
    // icon: <List size={20} />,
    // subItems: [{ name: "Form Elements", path: "/form-elements" }],
  },
  {
    // name: "Tables",
    // icon: <Table size={20} />,
    // subItems: [{ name: "Basic Tables", path: "/basic-tables" }],
  },
  {
    // name: "Pages",
    // icon: <FileText size={20} />,
    // subItems: [
    //   { name: "Blank Page", path: "/blank" },
    //   { name: "404 Error", path: "/error-404" },
    // ],
  },
];

const othersItems = [
  // {
  //   icon: <PieChart size={20} />,
  //   name: "Charts",
  //   subItems: [
  //     { name: "Line Chart", path: "/line-chart" },
  //     { name: "Bar Chart", path: "/bar-chart" },
  //   ],
  // },
  // {
  //   icon: <Box size={20} />,
  //   name: "UI Elements",
  //   subItems: [
  //     { name: "Alerts", path: "/alerts" },
  //     { name: "Avatar", path: "/avatars" },
  //     { name: "Badge", path: "/badge" },
  //     { name: "Buttons", path: "/buttons" },
  //   ],
  // },
  // {
  //   icon: <Plug size={20} />,
  //   name: "Authentication",
  //   subItems: [
  //     { name: "Sign In", path: "/signin" },
  //     { name: "Sign Up", path: "/signup" },
  //   ],
  // },
];

export const AdminDashboard_sidebar = ({ isSidebarOpen, setIsSidebarOpen, isMobileSidebarOpen }) => {
  const location = useLocation();

  // const [isExpanded, setIsExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  // const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [openSubmenu, setOpenSubmenu] = useState(null);

  const [subMenuHeight, setSubMenuHeight] = useState({});

  const subMenuRefs = useRef({});

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;

    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;

      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType,
                index,
              });

              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;

      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key].scrollHeight,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prev) => {
      if (
        prev &&
        prev.type === menuType &&
        prev.index === index
      ) {
        return null;
      }

      return {
        type: menuType,
        index,
      };
    });
  };

  const renderMenuItems = (items, menuType) => (
    <ul className="sidebar-menu">
      {items.map((nav, index) => (
        <li key={index}>
          {nav.subItems ? (
            <button
              onClick={() =>
                handleSubmenuToggle(index, menuType)
              }
              className={`sidebar-menu-button ${openSubmenu?.type === menuType &&
                openSubmenu?.index === index
                ? "active"
                : ""
                }`}
            >
              {nav.icon}

              {(isSidebarOpen || isHovered || isMobileSidebarOpen) && (
                <>
                  <span>{nav.name}</span>

                  <ChevronDown
                    size={18}
                    className={`sidebar-chevron ${openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                      ? "rotate"
                      : ""
                      }`}
                  />
                </>
              )}
            </button>
          ) : (
            <Link
              to={nav.path}
              className={`sidebar-menu-button ${isActive(nav.path) ? "active" : ""
                }`}
            >
              {nav.icon}

              {(isSidebarOpen || isHovered || isMobileSidebarOpen) && (
                <span>{nav.name}</span>
              )}
            </Link>
          )}

          {nav.subItems &&
            (isSidebarOpen || isHovered || isMobileSidebarOpen) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[
                    `${menuType}-${index}`
                  ] = el;
                }}
                className="submenu-wrapper"
                style={{
                  height:
                    openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                      ? `${subMenuHeight[
                      `${menuType}-${index}`
                      ]
                      }px`
                      : "0px",
                }}
              >
                <ul className="submenu">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        to={subItem.path}
                        className={`submenu-item ${isActive(subItem.path)
                          ? "submenu-active"
                          : ""
                          }`}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </li>
      ))}
    </ul>
  );

  return (


    <aside
      className={`sidebar ${isSidebarOpen || isHovered
        ? "sidebar-expanded"
        : "sidebar-collapsed"
        } ${isMobileSidebarOpen
          ? "mobile-sidebar-open"
          : ""
        }`}
      onMouseEnter={() => !isSidebarOpen && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="sidebar-header">
        {(isSidebarOpen || isHovered || isMobileSidebarOpen) ? (
          <>
            <img src="/images/logo/logo.png" alt="E-commerce Website" to="/admin_dashboard" className="sidebar-logo-icon" />
            <h1 className="sidebar-logo-text">Admin Panel</h1>
          </>
        ) : (
          <img src="/images/logo/logo.png" alt="E-commerce Website" to="/" className="sidebar-logo-icon" />
          // <img className="sidebar-logo-icon" />
        )}

        {(isSidebarOpen || isHovered) && (
          <button
            onClick={() =>
              setIsSidebarOpen(!isSidebarOpen)
            }
            className="sidebar-toggle"
          >
            <MoreHorizontal />
          </button>
        )}
      </div>

      <div className="sidebar-content">
        <div className="sidebar-section">
          <h2 className="sidebar-title">
            {(isSidebarOpen || isHovered || isMobileSidebarOpen)
              ? "Menu"
              : ""}
          </h2>

          {renderMenuItems(navItems, "main")}
        </div>

        <div className="sidebar-section">
          <h2 className="sidebar-title">
            {(isSidebarOpen || isHovered || isMobileSidebarOpen)
              ? "Others"
              : "..."}
          </h2>

          {renderMenuItems(othersItems, "others")}
        </div>
      </div>
    </aside >
  );
};