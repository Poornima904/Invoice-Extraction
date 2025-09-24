import React, { useState } from "react";
import { FiSettings, FiRefreshCw, FiSave } from "react-icons/fi";
import { FaPaintBrush } from "react-icons/fa";

import ExtractionRules from "./ExtractionRules";
import LLMSettings from "./LLMSettings";
import Integrations from "./Integrations";

import "./Configuration.css";

const Configuration = () => {
  const [currency, setCurrency] = useState("USD - US Dollar");
  const [taxRate, setTaxRate] = useState(10);
  const [threshold, setThreshold] = useState(75);
  const [activeTab, setActiveTab] = useState("general");
  const [selectedTheme, setSelectedTheme] = useState("primary");

  return (
    <div className="config-container">
      {/* Header + Tabs */}
      <div className="config-header-tabs">
        <div className="config-header">
          <h2 className="config-title">
            <FiSettings className="settings-icon" /> Configuration
          </h2>
          <div>
            <button className="btn-secondary">
              <FiRefreshCw className="btn-icon" /> Reset to Defaults
            </button>
            <button className="btn-primary">
              <FiSave className="btn-icon" /> Save Configuration
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <div
            className={`tab-item ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            General
          </div>
          <div
            className={`tab-item ${activeTab === "rules" ? "active" : ""}`}
            onClick={() => setActiveTab("rules")}
          >
            Extraction Rules
          </div>
          <div
            className={`tab-item ${activeTab === "llm" ? "active" : ""}`}
            onClick={() => setActiveTab("llm")}
          >
            LLM Settings
          </div>
          <div
            className={`tab-item ${
              activeTab === "integrations" ? "active" : ""
            }`}
            onClick={() => setActiveTab("integrations")}
          >
            Integrations
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "general" && (
        <>
          {/* Default Settings */}
          <div className="config-card">
            <p>Default Settings</p>

            <div className="form-row">
              <div className="form-group">
                <h5>Default Currency</h5>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option>USD - US Dollar</option>
                  <option>EUR - Euro</option>
                  <option>INR - Indian Rupee</option>
                </select>
              </div>

              <div className="form-group">
                <h5>Default Tax Rate (%)</h5>
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />
              </div>
            </div>

            {/* Threshold Slider */}
            <div className="form-group">
              <label>Auto-Process Threshold</label>
              <input
                type="range"
                min="0"
                max="100"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                style={{
                  background: `linear-gradient(to right, #000 ${threshold}%, #ccc ${threshold}%)`,
                }}
              />
              <div className="range-labels">
                <span>0%</span>
                <span>{threshold}%</span>
                <span>100%</span>
              </div>
              <p className="hint">
                Invoices with confidence scores above this threshold will be
                automatically marked as processed.
              </p>
            </div>
          </div>

          {/* Theme & Appearance */}
          <div className="config-card">
            <h3>Theme & Appearance</h3>
            <div className="form-group">
              <label>Color Theme</label>
              <div className="theme-header-row">
                <p className="hint">
                  Choose a color theme that matches your preference
                </p>
                <button className="btn-secondary">
                  <FaPaintBrush className="btn-icon" /> Theme
                </button>
              </div>
              <hr className="theme-divider" />
              <div className="theme-options">
                {["primary", "secondary", "accent", "muted"].map((theme) => (
                  <div
                    key={theme}
                    className="theme-item"
                    onClick={() => setSelectedTheme(theme)}
                  >
                    <div
                      className={`theme-box ${
                        selectedTheme === theme ? "selected" : ""
                      }`}
                    ></div>
                    <span className="theme-label">
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
  );
};

export default Configuration;
