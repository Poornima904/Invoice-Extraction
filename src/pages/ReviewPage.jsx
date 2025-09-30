import React from "react";
import invoiceImage from "../assets/invoiceExample.png";
import { FiEye, FiPlus, FiMinus, FiRefreshCw } from "react-icons/fi";

// Dummy data
const headerInfo = [
  { label: "Invoice Number", value: "AWS-2024-156", confidence: "High", percent: 98, color: "bg-green-100 text-green-800" },
  { label: "Invoice Date", value: "2024-03-01", confidence: "High", percent: 92, color: "bg-green-100 text-green-800" },
  { label: "PO Number", value: "PO-2024-0156", confidence: "Medium", percent: 88, color: "bg-purple-100 text-purple-700" }
];

const supplierInfo = [
  { label: "Supplier Name", value: "Amazon Web Services Inc.", confidence: "High", percent: 95, color: "bg-green-100 text-green-800" },
  { label: "Supplier Address", value: "WATERS OES M.B. HAUPTSTRASSE 4130", confidence: "Medium", percent: 89, color: "bg-purple-100 text-purple-700" },
  { label: "Supplier Code", value: "4130", confidence: "High", percent: 94, color: "bg-green-100 text-green-800" }
];

const lineItems = [
  { desc: "EC2 Instance Usage - c5.4xlarge", qty: 720, unit: "$8.50", amount: "$6,120.00", confidence: "Medium", color: "bg-orange-100 text-orange-700" },
  { desc: "S3 Storage - Standard Tier", qty: 5000, unit: "$0.02", amount: "$115.00", confidence: "Medium", color: "bg-orange-100 text-orange-700" },
  { desc: "RDS Database - Multi-AZ PostgreSQL", qty: 1, unit: "$4850.00", amount: "$4,850.00", confidence: "High", color: "bg-green-100 text-green-800" },
  { desc: "CloudFront CDN Data Transfer", qty: 100000, unit: "$0.09", amount: "$722.50", confidence: "Medium", color: "bg-orange-100 text-orange-700" },
  { desc: "Lambda Function Executions", qty: 50000000, unit: "$0.00", amount: "$10.00", confidence: "Low", color: "bg-red-100 text-red-700" }
];

const totalsSummary = [
  { label: "Subtotal", value: "USD 16,875.45", confidence: "High", percent: 96, color: "bg-green-100 text-green-800" },
  { label: "Tax Amount", value: "USD 1,875.05", confidence: "High", percent: 94, color: "bg-green-100 text-green-800" },
  { label: "Total Amount", value: "USD 18,750.5", confidence: "High", percent: 99, color: "bg-green-100 text-green-800" }
];

export default function ReviewPage() {
  return (
    <div className="flex bg-gray-50 min-h-screen w-full">
      <div className="flex flex-col flex-1">

        {/* Review Page Header */}
        <div className="sticky top-[51px] z-40 bg-white border-b flex items-center justify-between px-8 h-[72px] w-full ">
          <div className="flex items-center gap-5">
            <button className="flex items-center gap-0.5 text-gray-700 bg-white border px-2 py-1 rounded-md font-medium text-sm hover:bg-gray-50 hover:border-gray-300 transition">
              <span className="text-lg">←</span> Back
            </button>
            <div>
              <div className="font-semibold text-lg">
                <span className="text-green-500">Review Invoice:&nbsp;</span>
                <a href="#" className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:underline font-semibold">
                  aws_billing_march_enterprise.pdf
                </a>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Compare source document with extracted data
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-purple-100 text-purple-700 font-semibold text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#a78bfa" strokeWidth="2" />
                <path d="M12 7v5l3 3" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Pending
            </span>
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-700 font-semibold flex items-center gap-1 hover:bg-gray-200">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M16 3v5h-5V3M21 10.5a8.38 8.38 0 01-.9 4.2A8.5 8.5 0 0112 21a8.5 8.5 0 01-7.55-12.3A8.38 8.38 0 013 10.5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Split View
            </button>
          </div>
        </div>

        {/* Two-panel Layout */}
       <div className="flex flex-1 min-h-0 h-[calc(100vh-118px)] min-w-0">

          {/* Left Panel */}
          <div
    className="flex-[3] bg-gray-100 min-w-[400px] max-w-[700px] border-r flex flex-col pt-2"
    style={{ height: "calc(100vh - 118px)", position: "sticky", top: 118 }}
  >
         {/* Buttons */}
    <div className="flex gap-2 mb-2 mt-3 px-4 flex-shrink-0">
      <button className="rounded bg-gray-100 hover:bg-gray-200 px-3 py-1 text-lg"><FiEye size={20} /></button>
      <button className="rounded bg-gray-100 hover:bg-blue-100 text-blue-600 px-3 py-1 text-lg"><FiPlus size={20} /></button>
      <button className="rounded bg-gray-100 hover:bg-blue-100 text-blue-600 px-3 py-1 text-lg"><FiMinus size={20} /></button>
      <button className="rounded bg-gray-100 hover:bg-yellow-100 text-yellow-700 px-3 py-1 text-lg"><FiRefreshCw size={20} /></button>
    </div>
              {/* Image container with scroll */}
    <div className="flex-1 overflow-auto px-3 flex items-start justify-center">
      <img
        src={invoiceImage}
        alt="Invoice"
        className="rounded-lg border shadow max-w-full h-auto"
      />
    </div>
             {/* Confidence legend */}
    <div className="bg-gray-100 py-3 px-6 border-t border-gray-200 flex gap-6 text-xs justify-center flex-shrink-0">
      <span className="flex items-center gap-1 text-green-700 group">
        <span className="w-3 h-3 rounded bg-green-100 inline-block group-hover:bg-green-200 transition"></span> High confidence (90%+)
      </span>
      <span className="flex items-center gap-1 text-orange-500 group">
        <span className="w-3 h-3 rounded bg-orange-100 inline-block group-hover:bg-orange-200 transition"></span> Medium confidence (70-89%)
      </span>
      <span className="flex items-center gap-1 text-red-600 group">
        <span className="w-3 h-3 rounded bg-red-100 inline-block group-hover:bg-red-200 transition"></span> Low confidence (&lt;70%)
      </span>
    </div>
          </div>

          {/* Right Panel */}
          <div className="flex-[3.7] flex flex-col h-full bg-gray-50 min-w-[440px] max-w-[740px] border-l ">

            {/* Scrollable Content with Sticky Header */}
            <div className="flex-1 flex flex-col min-w-0">

              {/* Sticky Extracted Data Header */}
              <div className="fixed top-41 right-3.2 z-50 w-[740px] bg-white border-gray-800 px-10 py-5 mt-1 flex items-center justify-between ">

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Extracted Data</h2>
                  <p className="text-sm text-gray-600">Review and edit extracted invoice information</p>
                </div>
                <span className="flex items-center gap-1 px-4 py-1 rounded-lg bg-purple-100 text-purple-700 font-medium text-base">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="#a78bfa" strokeWidth="2" />
                    <path d="M12 8v4l2 2" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Pending
                </span>
              </div>

              {/* Scrollable Sections */}
              <div className="mt-20 px-10 py-8 space-y-10">
                {/* Header Information */}
                <section>
                  <div className="text-base font-semibold bg-purple-100 text-purple-800 rounded-t-xl px-5 py-3 flex justify-between items-center">
                    Header Information
                  </div>
                  <div className="bg-white rounded-b-xl p-7 shadow space-y-6 border-l-4 border-purple-100">
                    {headerInfo.map((field) => (
                      <div key={field.label} className="mb-3">
                        <div className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                          {field.label}
                          <span className={`rounded-full py-0.5 px-2 font-bold text-xs ${field.color}`}>
                            {field.confidence} ({field.percent}%)
                          </span>
                        </div>
                        <div className="text-base font-medium text-gray-900">{field.value}</div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Supplier Information */}
                <section>
                  <div className="text-base font-semibold bg-green-100 text-green-800 rounded-t-xl px-5 py-3">Supplier Information</div>
                  <div className="bg-white rounded-b-xl p-7 shadow space-y-6 border-l-4 border-green-100">
                    {supplierInfo.map((field) => (
                      <div key={field.label} className="mb-3">
                        <div className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                          {field.label}
                          <span className={`rounded-full py-0.5 px-2 font-bold text-xs ${field.color}`}>
                            {field.confidence} ({field.percent}%)
                          </span>
                        </div>
                        <div className="text-base font-medium text-gray-900">{field.value}</div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Line Items */}
                <section>
                  <div className="text-base font-semibold bg-blue-100 text-blue-800 rounded-t-xl px-5 py-3">Line Items</div>
                  <div className="bg-white rounded-b-xl p-7 shadow border-l-4 border-blue-100">
                    <table className="min-w-full divide-y divide-gray-200 border">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Description</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Qty</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Unit Price</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Amount</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Confidence</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {lineItems.map((item, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-2 text-sm text-gray-800">{item.desc}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{item.qty}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{item.unit}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{item.amount}</td>
                            <td className="px-4 py-2 text-xs">
                              <span className={`rounded-full py-1 px-2 font-bold ${item.color}`}>{item.confidence}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Totals & Summary */}
                <section>
                  <div className="text-base font-semibold bg-blue-100 text-blue-800 rounded-t-xl px-5 py-3 flex items-center gap-1">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#2563eb" strokeWidth="2" d="M18.5 6l-7.5 7.5L5.5 8.5" /></svg>
                    Totals & Summary
                  </div>
                  <div className="bg-white rounded-b-xl p-7 shadow space-y-5 border-l-4 border-blue-100">
                    {totalsSummary.map((item, idx) => (
                      <div key={item.label} className={`flex flex-col sm:flex-row sm:items-center gap-2 justify-between border ${idx === 0 ? "border-green-200" : "border-transparent"} rounded p-3`}>
                        <div className="font-semibold text-gray-700">{item.label}</div>
                        <span className={`rounded-full py-0.5 px-2 font-bold text-xs ${item.color} ml-2`}>{item.confidence} ({item.percent}%)</span>
                        <div className="text-gray-900 font-medium text-base">{item.value}</div>
                      </div>
                    ))}
                    {/* Overall Confidence */}
                    <div className="mt-5 px-4 py-3 rounded bg-green-100 flex items-center gap-4">
                      <span className="text-green-800 font-bold text-base">Overall Confidence</span>
                      <span className="px-4 py-1 rounded-lg bg-purple-100 text-purple-700 font-semibold text-sm ml-4">Medium (78%) Requires review</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer buttons sticky */}
            <div className="sticky bottom-0 left-0 right-0 w-full bg-white border-t px-10 py-5 flex justify-end gap-3 z-30">
              <button className="px-5 py-2 rounded bg-gray-200 font-semibold hover:bg-gray-300 transition-colors">
                Reject Invoice
              </button>
              <button className="px-5 py-2 rounded bg-gray-100 font-semibold hover:bg-gray-200 transition-colors">
                Save Draft
              </button>
              <button className="px-5 py-2 rounded bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold hover:from-green-500 hover:to-blue-600 transition">
                Approve &amp; Process
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
