import React, { useState } from "react";

const ReviewPage = () => {
  const [invoiceDetails] = useState({
    invoiceNumber: "ADBE-2024-0156",
    vendor: "Adobe Inc.",
    invoiceDate: "2024-02-12",
    poNumber: "PO-2024-0089",
    currency: "USD",
    taxRate: 9.1,
  });

  const [lineItems] = useState([
    { id: 1, description: "Creative Cloud for Teams - Annual", qty: 25, unitPrice: 79.99, tax: 9.1, discount: 0, amount: 1999.75, confidence: 89 },
    { id: 2, description: "Adobe Stock Standard Plan", qty: 15, unitPrice: 29.99, tax: 9.1, discount: 0, amount: 449.85, confidence: 85 },
    { id: 3, description: "Acrobat Pro DC for Teams", qty: 50, unitPrice: 22.99, tax: 9.1, discount: 0, amount: 1149.5, confidence: 78 },
    { id: 4, description: "Adobe Sign Transactions", qty: 5000, unitPrice: 2.0, tax: 9.1, discount: 20, amount: 8000.0, confidence: 76 },
    { id: 5, description: "Lambda Function Executions", qty: 50000000, unitPrice: 0.0, tax: 10, discount: 0, amount: 10.0, confidence: 65 },
  ]);

  const getConfidenceClass = (confidence) =>
    confidence >= 80 ? "bg-yellow-100 text-yellow-800" :
    confidence < 70 ? "bg-red-400 text-white" :
    "bg-orange-50 text-orange-700";

  return (
    <div className="review-page p-4 sm:p-6 flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm">← Back</button>
        <h2 className="text-lg font-bold truncate sm:text-base">Review Invoice: adobe_creative_cloud_teams.pdf</h2>
        <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 sm:mt-0">
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 font-semibold rounded-md text-sm">Needs Review</span>
          <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 text-sm">Save Changes</button>
        </div>
      </div>

      {/* Invoice Details & Amount Summary */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Invoice Details */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow flex-1 space-y-4">
          <h3 className="text-lg font-semibold">Invoice Details</h3>
          {Object.entries(invoiceDetails).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="flex items-center gap-2 font-semibold text-gray-700 capitalize text-sm sm:text-base">
                {key.replace(/([A-Z])/g, " $1")}
                <span className="bg-gray-800 text-green-200 text-xs sm:text-sm font-bold px-2 py-0.5 rounded-full">
                  {key === "invoiceNumber" ? "98%" :
                   key === "vendor" ? "95%" :
                   key === "invoiceDate" ? "92%" :
                   key === "poNumber" ? "88%" :
                   key === "currency" ? "99%" :
                   key === "taxRate" ? "85%" : ""}
                </span>
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={value}
                  readOnly
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md bg-gray-100 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 cursor-not-allowed text-sm sm:text-base"
                />
                <button className="px-3 py-2 border border-gray-300 border-l-0 rounded-r-md bg-white hover:bg-gray-100 text-sm sm:text-base">✏️</button>
              </div>
            </div>
          ))}
        </div>

        {/* Amount Summary */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow w-full md:w-80 flex flex-col gap-2 text-sm sm:text-base">
          <h3 className="text-lg font-semibold mb-2">Amount Summary</h3>
          <div className="flex justify-between"><span>Subtotal:</span> <span>USD 8,136.59</span></div>
          <div className="flex justify-between"><span>Tax (9.1%):</span> <span>USD 813.16</span></div>
          <div className="flex justify-between font-bold"><span>Total Amount:</span> <span>USD 8,949.75</span></div>
          <div className="flex justify-between"><span>Overall Confidence:</span> <span>82%</span></div>
        </div>
      </div>

      {/* Line Items */}
      <div className="space-y-3 sm:hidden">
        {lineItems.map(item => (
          <div key={item.id} className="bg-white p-3 rounded-lg shadow flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold truncate">{item.description}</span>
              <span className={`px-2 py-0.5 rounded-full font-bold ${getConfidenceClass(item.confidence)}`}>{item.confidence}%</span>
            </div>
            <div className="text-sm text-gray-600 flex flex-col gap-1">
              <div>Qty: {item.qty}</div>
              <div>Unit Price: ${item.unitPrice.toFixed(2)}</div>
              <div>Tax: {item.tax}%</div>
              <div>Discount: ${item.discount.toFixed(2)}</div>
              <div>Amount: ${Math.round(item.amount)}</div>
            </div>
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm">✏️ Edit</button>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto bg-white p-4 sm:p-6 rounded-2xl shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 rounded-tl-2xl">Description</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Qty</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Unit Price</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Tax %</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Discount</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Amount</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Confidence</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 rounded-tr-2xl">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {lineItems.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">{item.qty}</td>
                <td className="px-4 py-2">${item.unitPrice.toFixed(2)}</td>
                <td className="px-4 py-2">{item.tax}%</td>
                <td className="px-4 py-2">${item.discount.toFixed(2)}</td>
                <td className="px-4 py-2 font-bold">${Math.round(item.amount)}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-0.5 rounded-full font-bold ${getConfidenceClass(item.confidence)}`}>{item.confidence}%</span>
                </td>
                <td className="px-4 py-2">
                  <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewPage;
