import React, { useState } from "react";
import "./Integrations.css";

const Integrations = () => {
  const [slackWebhook, setSlackWebhook] = useState("");
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [exportLocation, setExportLocation] = useState("Local Download");

  return (
    <div className="integrations-container">

      {/* Notifications Card */}
      <div className="config-card">
        <h4>Notifications</h4>

        {/* Webhook */}
        <div className="form-group">
          <label>Webhook URL (Slack/Teams)</label>
          <input
            type="text"
            placeholder="https://hooks.slack.com/services/..."
            value={slackWebhook}
            onChange={(e) => setSlackWebhook(e.target.value)}
          />
          <p className="hint">
            Receive notifications when invoices are processed or require review.
          </p>
        </div>

        {/* Email toggle */}
        <div className="form-group email-row">
          <div className="email-text">
            <label>Email Notifications</label>
            <p className="hint">Send email alerts for processing updates</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={emailEnabled}
              onChange={() => setEmailEnabled(!emailEnabled)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* Export Destination Card */}
      <div className="config-card">
        <h4>Export Destination</h4>
        <div className="form-group">
          <label>Default Export Location</label>
          <select
            value={exportLocation}
            onChange={(e) => setExportLocation(e.target.value)}
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
