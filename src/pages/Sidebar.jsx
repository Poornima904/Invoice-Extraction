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
        background: "#fff",
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
  <div
  style={{
    width: 40,
    height: 40,
    borderRadius: 8,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #2fa88d 20%, #6b7bed 70%, #9f61f0 100%)",
  }}
>
  {/* Insert SVG here */}
  <svg
    width="23"
    height="20"
    viewBox="0 0 23 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.55 5L13.6 18.55H9.46V15.75L17.63 4.87H11.62L9.16 8.41L6.73 12.09L4.96 14.79H0V10.34L6.74 0H22.55Z"
      fill="white"
    />
  </svg>
</div>




        {expanded && (
          <div>
            <h2 className="text-gray-900 font-bold text-lg m-0 leading-none">InvoiceAI</h2>
            <p className="text-gray-400 text-sm">Smart Invoice Processing</p>
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
      <nav className="flex flex-col px-2 mt-2 gap-1 flex-1">
        {MENU.map(({ name, icon: Icon, countKey }) => {
          const count = countKey ? counts[countKey] : 0;
          const isActive = activePage === name;

          return (
            <button
              key={name}
              onClick={() => setActivePage(name)}
              className={`flex items-center justify-between p-3 rounded-lg transition cursor-pointer
                ${isActive ? "bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
              title={name}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="flex items-center gap-4">
                <span className={`flex items-center justify-center min-w-[24px] h-6 ${isActive ? "text-white" : "text-gray-500"}`}>
                  <Icon size={22} />
                </span>
                {expanded && <span>{name}</span>}
              </div>

              {expanded && count > 0 && (
                <span className="flex-shrink-0 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full select-none">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {expanded && (
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
  );
}
