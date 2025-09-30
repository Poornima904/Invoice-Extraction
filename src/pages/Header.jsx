import React from "react";
import { HelpCircle, Menu } from "lucide-react";

export default function Header() {
  return (
    <header
      
      className="fixed left-0 right-0 bg-black border-b border-gray-200 py-3 px-4 sm:px-6 flex items-center justify-between z-50 shadow-sm"
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm font-semibold text-white">
          AI
        </div>
      </div>

      {/* Center: Title */}
      <div className="flex-1 text-center mx-2 sm:mx-4">
        <span className="text-sm sm:text-base font-medium text-white truncate">
          Invoice Extractor Web App
        </span>
      </div>

      {/* Right: Help + Share */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:flex items-center gap-3">
          <button className="p-2 rounded-full text-white hover:text-gray-700 transition-colors">
            <HelpCircle size={20} />
          </button>
          <button className="py-1 px-4 bg-blue-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors">
            Share
          </button>
        </div>

        <div className="flex sm:hidden">
          <button className="p-2 rounded-full text-white hover:text-gray-700 transition-colors">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
