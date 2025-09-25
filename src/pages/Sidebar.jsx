import React, { useState } from "react";
import { 
  ArrowUpTrayIcon, 
  DocumentIcon, 
  ClockIcon, 
  ChartBarIcon, 
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";

const Sidebar = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(true); // sidebar open by default

  const menuItems = [
    { name: "Upload", icon: <ArrowUpTrayIcon className="w-6 h-6 stroke-current text-gray-900" /> },
    { name: "Review", icon: <DocumentIcon className="w-6 h-6 stroke-current text-gray-900" />, badge: 4 },
    { name: "Processing", icon: <ClockIcon className="w-6 h-6 stroke-current text-gray-900" />, badge: 4 },
    { name: "Dashboard", icon: <ChartBarIcon className="w-6 h-6 stroke-current text-gray-900" /> },
    { name: "Configuration", icon: <Cog6ToothIcon className="w-6 h-6 stroke-current text-gray-900" /> },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-2 left-4 z-50 bg-gray-100 p-2 rounded-md shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 shadow-md z-40 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:w-1/5 w-3/4 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex-none pt-5 pb-3 px-4 border-b border-gray-200 mt-15">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-lg text-xl">⚡</div>
            <div>
              <h2 className="text-gray-900 font-bold text-lg m-0">InvoiceAI</h2>
              <p className="text-gray-400 text-xs font-medium m-0">Extraction Platform</p>
            </div>
          </div>
        </div>

        {/* Sidebar Menu (scrollable) */}
        <div className="flex-1 overflow-y-auto mt-4 px-2 space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => setActivePage(item.name)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer font-medium transition-colors ${
                activePage === item.name ? "bg-gray-100 font-bold" : "text-gray-900 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <span className="ml-auto bg-gray-200 text-gray-900 text-sm font-semibold px-2 py-0.5 rounded-full border border-gray-200">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="flex-none flex justify-between items-center py-4 px-4 border-t border-gray-200">
          <div className="bg-gray-100 text-gray-900 text-sm font-semibold rounded-full px-3 py-1 tracking-wide">v1.2.0</div>
          <button className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition">
            Theme
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
