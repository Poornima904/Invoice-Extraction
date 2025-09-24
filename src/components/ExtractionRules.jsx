import React from "react";
import "./ExtractionRules.css";

const ExtractionRules = () => {
  const fields = [
    { label: "Invoice Number", pdf: "Invoice #", required: true },
    { label: "Date", pdf: "Invoice Date", required: true },
    { label: "Vendor", pdf: "From", required: true },
    { label: "Total Amount", pdf: "Total", required: true },
    { label: "PO Number", pdf: "Purchase Order", required: false },
    { label: "Tax Amount", pdf: "Tax", required: false },
  ];

  return (
    <>
      {/* Field Mapping Card */}
      <div className="config-card">
        <h3>Field Mapping</h3>
        <p className="hint">
          Map system fields to PDF labels for better extraction accuracy.
        </p>

        <div className="field-mapping">
          {fields.map((field, idx) => (
            <div key={idx} className="field-row">
              <div className="field-label">
                {field.label}
                {field.required && (
                  <span className="required-tag">Required</span>
                )}
              </div>

              <div className="field-actions">
                <span className="arrow">↔</span>

                <input type="text" value={field.pdf} className="pdf-label" />

                <label className="switch">
                  <input type="checkbox" defaultChecked={field.required} />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Regex Rules Card */}
      <div className="config-card">
        <h3>Custom Regex Rules</h3>
        <table className="regex-table">
          <thead>
            <tr>
              <th>Field Name</th>
              <th>Regex Pattern</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="e.g., Reference Number"
                  className="regex-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="e.g., REF-\\d{4}-\\d{4}"
                  className="regex-input"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button className="btn-secondary full-width">Add Custom Rule</button>
      </div>
    </>
  );
};

export default ExtractionRules;
