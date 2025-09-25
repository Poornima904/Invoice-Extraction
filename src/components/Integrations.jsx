import React, { useState } from "react";

const Integrations = () => {
  const [slackWebhook, setSlackWebhook] = useState("");
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [exportLocation, setExportLocation] = useState("Local Download");

  return (
    <div className="space-y-5">

      {/* Notifications Card */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h4 className="text-lg font-semibold mb-3">Notifications</h4>

        {/* Webhook */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Webhook URL (Slack/Teams)</label>
          <input
            type="text"
            placeholder="https://hooks.slack.com/services/..."
            value={slackWebhook}
            onChange={(e) => setSlackWebhook(e.target.value)}
            className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-600"
          />
          <p className="text-gray-500 text-xs mt-1">
            Receive notifications when invoices are processed or require review.
          </p>
        </div>

        {/* Email toggle */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <label className="font-semibold">Email Notifications</label>
            <p className="text-gray-500 text-xs mt-0.5">
              Send email alerts for processing updates
            </p>
          </div>

          <label className="relative inline-block w-10 h-5">
            <input
              type="checkbox"
              checked={emailEnabled}
              onChange={() => setEmailEnabled(!emailEnabled)}
              className="opacity-0 w-0 h-0"
            />
            <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition-all before:absolute before:content-[''] before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all checked:bg-gray-900 checked:before:translate-x-5"></span>
          </label>
        </div>
      </div>

      {/* Export Destination Card */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h4 className="text-lg font-semibold mb-3">Export Destination</h4>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Default Export Location</label>
          <select
            value={exportLocation}
            onChange={(e) => setExportLocation(e.target.value)}
            className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-600"
          >
            <option>Local Download</option>
            <option>Google Drive</option>
            <option>Dropbox</option>
            <option>OneDrive</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
