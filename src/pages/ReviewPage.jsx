import React, { useState } from "react";
import "./ReviewPage.css";

const ReviewPage = () => {
  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNumber: "ADBE-2024-0156",
    vendor: "Adobe Inc.",
    invoiceDate: "2024-02-12",
    poNumber: "PO-2024-0089",
    currency: "USD",
    taxRate: 9.1,
  });

  const [lineItems, setLineItems] = useState([
    {
      id: 1,
      description: "Creative Cloud for Teams - Annual",
      qty: 25,
      unitPrice: 79.99,
      tax: 9.1,
      discount: 0,
      amount: 1999.75,
      confidence: 89,
    },
    {
      id: 2,
      description: "Adobe Stock Standard Plan",
      qty: 15,
      unitPrice: 29.99,
      tax: 9.1,
      discount: 0,
      amount: 449.85,
      confidence: 85,
    },
    {
      id: 3,
      description: "Acrobat Pro DC for Teams",
      qty: 50,
      unitPrice: 22.99,
      tax: 9.1,
      discount: 0,
      amount: 1149.5,
      confidence: 78,
    },
    {
      id: 4,
      description: "Adobe Sign Transactions",
      qty: 5000,
      unitPrice: 2.0,
      tax: 9.1,
      discount: 20,
      amount: 8000.0,
      confidence: 76,
    },
    {
        id: 5,
      description: "Lambda Function Executions",
      qty: 50000000,
      unitPrice: 0.00,
      tax: 10,
      discount: 0.00,
      amount: 10.00,
      confidence: 65,
    }
  ]);

  const handleDetailChange = (field, value) => {
    setInvoiceDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="review-page p-6 space-y-6">
      {/* Header */}
      <div className="header-row-title-reviewpage">
        <button className="button back-button" > ← Back</button>
        <h2 className="title font-bold">
          Review Invoice: adobe_creative_cloud_teams.pdf
        </h2>
        <div className="status-actions flex space-x-6">
          <span className="status needs-review">Needs Review</span>
          <button className="button save-button">Save Changes</button>
        </div>
      </div>

      {/* Invoice Details and Amount Summary */}
      <div className="details-summary flex space-x-6">
        {/* Invoice Details */}
        <div className="invoice-details">
          <h3 className="section-title font-semibold">Invoice Details</h3>
          {Object.entries(invoiceDetails).map(([key, value]) => (
            <div key={key} className="detail-row">
              {/* Label on top */}
              <label className="label capitalize" htmlFor={key}>
                {key.replace(/([A-Z])/g, " $1")}
                {/* Confidence Badge */}
                <span className="confidence-badge">
                  {key === "invoiceNumber"
                    ? "98%"
                    : key === "vendor"
                    ? "95%"
                    : key === "invoiceDate"
                    ? "92%"
                    : key === "poNumber"
                    ? "88%"
                    : key === "currency"
                    ? "99%"
                    : key === "taxRate"
                    ? "85%"
                    : ""}
                </span>
              </label>
              {/* input + Edit button container */}
              <div className="input-with-button">
                <input
                  id={key}
                  type="text"
                  value={value}
                  className="input-text"
                  readOnly
                />
                <button
                  className="button edit-input-button"
                  aria-label={`Edit ${key}`}
                >
                  ✏️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Amount Summary */}
        <div className="amount-summary w-64 bg-white p-4 rounded shadow space-y-2">
          <h3 className="section-title font-semibold">Amount Summary</h3>
          <div className="summary-row flex justify-between">
            <span>Subtotal:</span>
            <span>USD 8,136.59</span>
          </div>
          <div className="summary-row flex justify-between">
            <span>Tax (9.1%):</span>
            <span>USD 813.16</span>
          </div>
          <div className="summary-row flex justify-between font-bold">
            <span>Total Amount:</span>
            <span>USD 8,949.75</span>
          </div>
          <div className="summary-row flex justify-between">
            <span>Overall Confidence:</span>
            <span>82%</span>
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="line-items">
        <h3 className="section-title font-semibold mb-4">Line Items</h3>
        <table className="items-table">
          <thead>
            <tr className="header-row">
              <th>Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Tax %</th>
              <th>Discount</th>
              <th>Amount</th>
              <th>Confidence</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item) => {
              let confidenceClass = "confidence-badge moderate";
              if (item.confidence >= 80)
                confidenceClass = "confidence-badge high";
              if (item.confidence < 70)
                confidenceClass = "confidence-badge low";

              return (
                <tr key={item.id} className="item-row">
                  <td>{item.description}</td>
                  <td>{item.qty}</td>
                  <td>${item.unitPrice.toFixed(2)}</td>
                  <td>{item.tax}%</td>
                  <td>${item.discount.toFixed(2)}</td>
                  <td className="amount">${Math.round(item.amount)}</td>
                  <td>
                    <span className={confidenceClass}>{item.confidence}%</span>
                  </td>
                  <td>
                    <button className="edit-button" aria-label="Edit">
                      ✏️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewPage;
