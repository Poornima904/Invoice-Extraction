import React from "react";
import {
  FiUpload,
  FiEye,
  FiSettings,
  FiBarChart2,
  FiActivity,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";

const MENU = [
  { name: "Upload", icon: FiUpload },
  { name: "Review", icon: FiEye, countKey: "reviewCount" },
  { name: "Processing", icon: FiActivity, countKey: "processingCount" },
  { name: "Dashboard", icon: FiBarChart2 },
  { name: "Configuration", icon: FiSettings },
];

export default function Sidebar({
  expanded,
  toggleExpand,
  activePage,
  setActivePage,
  reviewCount = 0,
  processingCount = 0,
  mobileOpen,
  setMobileOpen,
}) {
  const HEADER_HEIGHT = 53;
  const SIDEBAR_WIDTH_EXPANDED = 224;
  const SIDEBAR_WIDTH_COLLAPSED = 64;
  const counts = { reviewCount, processingCount };

  // Determine if sidebar should show full width (expanded)
  const isSidebarExpanded = mobileOpen ? true : expanded;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/25 z-30 md:hidden transition-opacity ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside
        style={{
          top: HEADER_HEIGHT,
          width: isSidebarExpanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
        className={`fixed left-0 z-40 flex flex-col bg-white border-r border-gray-200 shadow-sm transition-all
          transform md:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end p-3 md:hidden border-b border-gray-200">
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Branding */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-200">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500" />
          {isSidebarExpanded && (
            <div>
              <h2 className="text-gray-900 font-bold text-lg leading-none">InvoiceAI</h2>
              <p className="text-gray-400 text-[10px]">Smart Invoice Processing</p>
            </div>
          )}
        </div>

        {/* Desktop Toggle */}
        {!mobileOpen && (
          <div className="flex items-center justify-end px-3 py-3 border-b border-gray-100 hidden md:flex">
            <button
              onClick={() => toggleExpand(!expanded)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
            >
              {expanded ? <FiChevronLeft size={18} /> : <FiChevronRight size={18} />}
            </button>
          </div>
        )}

        {/* Menu */}
        <nav className="flex flex-col px-2 mt-2 gap-1 flex-1 overflow-y-auto">
          {MENU.map(({ name, icon: Icon, countKey }) => {
            const count = countKey ? counts[countKey] : 0;
            const isActive = activePage === name;

            return (
              <button
                key={name}
                onClick={() => {
                  setActivePage(name);
                  setMobileOpen(false);
                }}
                className={`flex items-center justify-between p-3 rounded-lg transition cursor-pointer
                  ${isActive
                    ? "bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                  }`}
                title={name}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex items-center justify-center min-w-[24px] h-6 ${
                      isActive ? "text-white" : "text-gray-500"
                    }`}
                  >
                    <Icon size={22} />
                  </span>
                  {isSidebarExpanded && <span>{name}</span>}
                </div>
                {isSidebarExpanded && count > 0 && (
                  <span className="flex-shrink-0 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full select-none">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {isSidebarExpanded && (
          <div className="border-t border-gray-200 p-4 mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                AI
              </span>
              <div>
                <p className="text-gray-700 font-semibold text-sm m-0">Professional</p>
                <p className="text-gray-400 text-xs m-0">v1.0</p>
              </div>
            </div>
            <button className="px-3 py-1 border rounded text-gray-700 text-sm hover:bg-gray-100 transition">
              Theme
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
