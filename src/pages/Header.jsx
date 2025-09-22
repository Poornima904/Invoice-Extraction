import React from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      {/* Left: Logo */}
      <div className="header-left">
        <div className="header-logo">AI</div>
      </div>

      {/* Center: Title with dropdown */}
      <div className="header-center">
        <span>Invoice Extractor Web App</span>
        {/* <ChevronDown size={16} /> */}
      </div>

      {/* Right: Help + Share */}
      <div className="header-right">
        <button className="header-button-icon">
          <HelpCircle size={20} />
        </button>
        <button className="header-button-share">Share</button>
      </div>
    </header>
  );
}
