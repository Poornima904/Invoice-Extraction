import React from "react";
import { HelpCircle, Menu } from "lucide-react";

export default function Header({ toggleMobileSidebar }) {
  return (
    <header
      className="fixed left-0 right-0 bg-white border-b border-gray-200 py-3 px-3 sm:px-6 flex items-center justify-between z-50 shadow-sm overflow-x-hidden"
    >
      {/* Left: Hamburger (mobile) + Logo */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Hamburger for mobile */}
        <button
          className="sm:hidden p-2 rounded-md text-black hover:text-gray-700 transition"
          onClick={() => toggleMobileSidebar(prev => !prev)}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
        <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm font-semibold text-black">
          AI
        </div>
      </div>

      {/* Center: Title */}
      <div className="flex-1 text-center mx-1 sm:mx-4 overflow-hidden">
        <span className="text-sm sm:text-base font-medium text-black truncate block">
          Invoice Extractor Web App
        </span>
      </div>

      {/* Right: Desktop Actions */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <div className="hidden sm:flex items-center gap-3">
          <button className="p-2 rounded-full text-black hover:text-gray-700 transition-colors">
            <HelpCircle size={20} />
          </button>
          <button className="py-1 px-4 bg-blue-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors">
            Share
          </button>
        </div>
      </div>
    </header>
  );
}
