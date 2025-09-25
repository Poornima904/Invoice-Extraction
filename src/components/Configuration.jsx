import React, { useState } from "react";
import { FiSettings, FiRefreshCw, FiSave } from "react-icons/fi";
import { FaPaintBrush } from "react-icons/fa";

import ExtractionRules from "./ExtractionRules";
import LLMSettings from "./LLMSettings";
import Integrations from "./Integrations";

const Configuration = () => {
  const [currency, setCurrency] = useState("USD - US Dollar");
  const [taxRate, setTaxRate] = useState(10);
  const [threshold, setThreshold] = useState(75);
  const [activeTab, setActiveTab] = useState("general");
  const [selectedTheme, setSelectedTheme] = useState("primary");

  return (
    <div className="flex-1 p-5 font-sans text-gray-800 min-h-[calc(100vh-53px)] bg-gray-100">
      {/* Header + Tabs */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-3">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <FiSettings className="text-gray-600 text-2xl" /> Configuration
          </h2>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-1 px-3 py-2 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300 transition">
              <FiRefreshCw className="text-base" /> Reset to Defaults
            </button>
            <button className="flex items-center gap-1 px-3 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-black transition">
              <FiSave className="text-base" /> Save Configuration
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap bg-gray-100 rounded-full p-1 w-full">
          {[
            { key: "general", label: "General" },
            { key: "rules", label: "Extraction Rules" },
            { key: "llm", label: "LLM Settings" },
            { key: "integrations", label: "Integrations" },
          ].map((tab) => (
            <div
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 text-center py-2 rounded-full font-medium cursor-pointer transition-all duration-200 mb-1 sm:mb-0 ${
                activeTab === tab.key
                  ? "bg-white shadow-sm"
                  : "text-gray-700"
              }`}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-5 space-y-5">
        {activeTab === "general" && (
          <>
            {/* Default Settings */}
            <div className="bg-white rounded-md p-5 shadow">
              <p className="font-semibold mb-3">Default Settings</p>

              <div className="flex flex-col sm:flex-row gap-5 mb-4">
                <div className="flex-1">
                  <h5 className="font-semibold mb-1">Default Currency</h5>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>INR - Indian Rupee</option>
                  </select>
                </div>

                <div className="flex-1">
                  <h5 className="font-semibold mb-1">Default Tax Rate (%)</h5>
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Threshold Slider */}
              <div>
                <label className="block font-semibold mb-1">Auto-Process Threshold</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  className="w-full h-3 cursor-pointer appearance-none rounded-lg"
                  style={{
                    background: `linear-gradient(to right, #000 ${threshold}%, #ccc ${threshold}%)`,
                  }}
                />
                <div className="flex justify-between text-sm mt-1">
                  <span>0%</span>
                  <span>{threshold}%</span>
                  <span>100%</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  Invoices with confidence scores above this threshold will be
                  automatically marked as processed.
                </p>
              </div>
            </div>

            {/* Theme & Appearance */}
            <div className="bg-white rounded-md p-5 shadow">
              <h3 className="font-semibold mb-3">Theme & Appearance</h3>
              <div>
                <label className="font-semibold mb-1 block">Color Theme</label>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500 text-xs">
                    Choose a color theme that matches your preference
                  </p>
                  <button className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-xs hover:bg-gray-300 transition">
                    <FaPaintBrush className="text-sm" /> Theme
                  </button>
                </div>
                <hr className="border-t border-gray-300 my-4" />
                <div className="flex flex-wrap gap-4">
                  {["primary", "secondary", "accent", "muted"].map((theme) => (
                    <div
                      key={theme}
                      className="flex-1 flex flex-col items-center cursor-pointer min-w-[70px]"
                      onClick={() => setSelectedTheme(theme)}
                    >
                      <div
                        className={`w-full h-11 rounded-md border-2 transition-all ${
                          selectedTheme === theme ? "border-black" : "border-transparent"
                        } ${
                          theme === "primary"
                            ? "bg-black"
                            : theme === "secondary"
                            ? "bg-gray-500"
                            : theme === "accent"
                            ? "bg-gray-400"
                            : "bg-gray-200"
                        }`}
                      ></div>
                      <span className="text-xs font-medium text-gray-800 mt-1 text-center">
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "rules" && <ExtractionRules />}
        {activeTab === "llm" && <LLMSettings />}
        {activeTab === "integrations" && <Integrations />}
      </div>
    </div>
  );
};

export default Configuration;
