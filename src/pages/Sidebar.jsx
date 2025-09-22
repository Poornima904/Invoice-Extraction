import React from "react";
import "./Sidebar.css";
import { ArrowUpTrayIcon, DocumentIcon, ClockIcon, ChartBarIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { name: "Upload", icon: <ArrowUpTrayIcon className="menu-icon" /> },
    { name: "Review", icon: <DocumentIcon className="menu-icon" />, badge: 4 },
    { name: "Processing", icon: <ClockIcon className="menu-icon" />, badge: 4 },
    { name: "Dashboard", icon: <ChartBarIcon className="menu-icon" /> },
    { name: "Configuration", icon: <Cog6ToothIcon className="menu-icon" /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <div className="logo-text">
            <h2>InvoiceAI</h2>
            <p>Extraction Platform</p>
          </div>
        </div>
      </div>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`menu-item ${activePage === item.name ? "active" : ""}`}
            onClick={() => setActivePage(item.name)}
          >
            {item.icon}
            <span className="menu-text">{item.name}</span>
            {item.badge && <span className="badge">{item.badge}</span>}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="version">v1.2.0</div>
        <button className="theme-btn">Theme</button>
      </div>
    </div>
  );
};

export default Sidebar;
