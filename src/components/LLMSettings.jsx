import React, { useState } from "react";

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

  const gradientPercent = ((tokens - 500) / 3500) * 100;

  return (
    <div className="bg-white p-5 rounded-lg shadow mb-5">
      <h3 className="text-lg font-semibold mb-4">Model Configuration</h3>

      {/* LLM Model */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">LLM Model</label>
        <select
          defaultValue="GPT-4"
          className="w-full px-3 py-2 rounded-md bg-gray-100 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>GPT-4 (Recommended)</option>
          <option>GPT-3.5</option>
          <option>Custom Model</option>
        </select>
      </div>

      {/* API Key */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">API Key</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1 px-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleTest}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            Test
          </button>
        </div>
      </div>

      {/* Status */}
      <p className="mb-4">
        Status:{" "}
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            status === "Disconnected ❌"
              ? "bg-red-600 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {status}
        </span>
      </p>

      {/* Max Tokens */}
      <div>
        <label className="block font-semibold mb-2">Max Tokens</label>
        <input
          type="range"
          min="500"
          max="4000"
          value={tokens}
          onChange={(e) => setTokens(e.target.value)}
          style={{
            background: `linear-gradient(to right, #000 ${gradientPercent}%, #ccc ${gradientPercent}%)`,
          }}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm mt-1 mb-2">
          <span>500</span>
          <span>{tokens} tokens</span>
          <span>4000</span>
        </div>
        <p className="text-gray-500 text-sm">
          Higher token limits allow for more detailed analysis but increase
          processing costs.
        </p>
      </div>
    </div>
  );
};

export default LLMSettings;
