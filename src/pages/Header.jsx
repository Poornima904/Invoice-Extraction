import React from "react";
import { HelpCircle, Menu } from "lucide-react";
import logo from '../assets/peollogo.jpg';


export default function Header({ toggleMobileSidebar }) {
  return (
    <header className="fixed left-0 right-0 bg-white border-b border-gray-200 py-3 px-3 sm:px-6 flex items-center justify-between z-50 shadow-sm overflow-x-hidden">
      {/* Left: Hamburger (mobile) + Logo */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Hamburger for mobile */}
        <button
          className="sm:hidden p-2 rounded-md text-black hover:text-gray-700 transition"
          onClick={() => toggleMobileSidebar((prev) => !prev)}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
<div className="flex items-center justify-center w-auto h-auto">
  <img
    src={logo}
    alt="Logo"
    className="
      object-contain
      max-h-8 sm:max-h-10 md:max-h-12 lg:max-h-14
      w-auto
      transition-all duration-300
    "
  />
</div>





      </div>

      {/* Center: Title */}
      <div className="flex-1 text-center mx-1 sm:mx-4 overflow-hidden">
        <span className="text-sm sm:text-base font-medium text-black truncate block">
          Invoice Extractor Web App
        </span>
      </div>
    </header>
  );
}
