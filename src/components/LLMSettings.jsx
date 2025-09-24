import React, { useState } from "react";
import "./LLMSettings.css";

const LLMSettings = () => {
  const [apiKey, setApiKey] = useState("");
  const [status, setStatus] = useState("Disconnected");
  const [tokens, setTokens] = useState(2000);

  const handleTest = () => {
    if (apiKey.trim()) {
      setStatus("Connected ✅");
    } else {
      setStatus("Disconnected ❌");
    }
  };

  return (
    <div className="config-card">
      <h3>Model Configuration</h3>

      {/* LLM Model */}
      <div className="form-group">
        <label>LLM Model</label>
        <select defaultValue="GPT-4">
          <option>GPT-4 (Recommended)</option>
          <option>GPT-3.5</option>
          <option>Custom Model</option>
        </select>
      </div>

      {/* API Key */}
      <div className="form-group">
        <label>API Key</label>
        <div className="api-row">
          <input
            type="text"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <button className="btn-secondary" onClick={handleTest}>
            Test
          </button>
        </div>
      </div>

      {/* Status */}
      <p>
        Status:{" "}
        <span
          className={`status-tag ${
            status === "Disconnected ❌" ? "disconnected" : "connected"
          }`}
        >
          {status}
        </span>
      </p>

      {/* Max Tokens */}
      <div className="form-group">
        <label>Max Tokens</label>
        <input
          type="range"
          min="500"
          max="4000"
          value={tokens}
          onChange={(e) => setTokens(e.target.value)}
          style={{
            background: `linear-gradient(to right, #000 ${
              ((tokens - 500) / 3500) * 100
            }%, #ccc ${((tokens - 500) / 3500) * 100}%)`,
          }}
        />
        <div className="range-labels">
          <span>500</span>
          <span>{tokens} tokens</span>
          <span>4000</span>
        </div>
        <p className="hint">
          Higher token limits allow for more detailed analysis but increase
          processing costs.
        </p>
      </div>
    </div>
  );
};

export default LLMSettings;
