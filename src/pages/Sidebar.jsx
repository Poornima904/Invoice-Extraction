import React from "react";
import {
  FiUpload,
  FiEye,
  FiSettings,
  FiBarChart2,
  FiActivity,
  FiChevronLeft,
  FiChevronRight,
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
}) {
  const HEADER_HEIGHT = 53; // px
  const SIDEBAR_WIDTH_EXPANDED = 224;
  const SIDEBAR_WIDTH_COLLAPSED = 64;
  const sidebarWidth = expanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED;

  const counts = { reviewCount, processingCount };

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: HEADER_HEIGHT,
        width: sidebarWidth,
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        background: "#f7f9fa",
        borderRight: "1px solid #e5e7eb",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s cubic-bezier(.4,0,.2,1)",
        boxShadow: "0 0 6px rgba(0,0,0,.02)",
      }}
      onMouseEnter={() => !expanded && toggleExpand(true)}
      onMouseLeave={() => expanded && toggleExpand(false)}
    >
      {/* Branding */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-200">
        <div className="flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-lg text-2xl font-bold">⚡</div>
        {expanded && (
          <div>
            <h2 className="text-gray-900 font-bold text-lg m-0 leading-none">InvoiceAI</h2>
            <p className="text-gray-400 text-sm">Extraction Platform</p>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <div className="flex items-center justify-end px-3 py-3 border-b border-gray-100">
        <button
          onClick={() => toggleExpand(!expanded)}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
          aria-label="Toggle sidebar"
        >
          {expanded ? <FiChevronLeft size={18} /> : <FiChevronRight size={18} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex flex-col px-2 mt-2 gap-1">
        {MENU.map(({ name, icon: Icon, countKey }) => {
          const count = countKey ? counts[countKey] : 0;
          const isActive = activePage === name;

          return (
            <button
              key={name}
              onClick={() => setActivePage(name)}
              className={`flex items-center justify-between p-3 rounded-lg transition cursor-pointer
                ${isActive ? "bg-indigo-100 font-semibold text-indigo-700" : "text-gray-700 hover:bg-indigo-50"}`}
              title={name}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="flex items-center gap-4">
                <span className={`flex items-center justify-center min-w-[24px] h-6 ${isActive ? "text-indigo-700" : "text-gray-500 group-hover:text-indigo-700"}`}>
                  <Icon size={22} />
                </span>
                {expanded && <span>{name}</span>}
              </div>

              {expanded && count > 0 && (
                <span className="flex-shrink-0 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full select-none">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
