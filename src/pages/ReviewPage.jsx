import React from "react";
import invoiceImage from "../assets/invoiceExample.png";
import { FiEye, FiPlus, FiMinus, FiRefreshCw, FiChevronLeft } from "react-icons/fi";

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

const InfoSection = ({ title, data, bgColor, borderColor }) => (
  <section>
    <div className={`text-sm sm:text-base font-semibold ${bgColor} ${borderColor} rounded-t-xl px-4 sm:px-5 py-3 border-l-4`}>
      {title}
    </div>
    <div className="bg-white rounded-b-xl p-4 sm:p-7 shadow border-l-4 border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col">
            <div className="text-xs sm:text-sm text-gray-500 mb-1">{item.label}</div>
            <div className="font-medium text-sm sm:text-base mb-1">{item.value}</div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full py-1 px-2 text-xs font-bold ${item.color}`}>
                {item.confidence}
              </span>
              <span className="text-xs text-gray-500">{item.percent}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function ReviewPage({ setActivePage }) {
  return (
    <div className="flex bg-gray-50 h-[calc(100vh-53px)] w-full overflow-hidden flex-col lg:flex-row">
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        {/* Sticky Review Page Header - Responsive */}
        <div className="sticky top-2 z-50 bg-white border-b flex items-center justify-between px-3 sm:px-6 lg:px-8 h-16 sm:h-[72px] w-full flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-5">
            <button
              onClick={() => setActivePage("Upload")}
              className="flex items-center gap-1 text-gray-700 bg-white border px-2 sm:px-3 py-1.5 sm:py-1 rounded-md font-medium text-sm hover:bg-gray-50 hover:border-gray-300 transition"
            >
              <FiChevronLeft size={18} className="sm:hidden" />
              <span className="hidden sm:inline text-lg">←</span>
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="max-w-[180px] sm:max-w-none">
              <div className="font-semibold text-sm sm:text-base lg:text-lg leading-tight">
                <span className="text-green-500">Review:&nbsp;</span>
                <a
                  href="#"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:underline font-semibold text-xs sm:text-sm lg:text-base"
                >
                  aws_billing.pdf
                </a>
              </div>
              <div className="text-xs text-gray-400 mt-0.5 hidden sm:block">
                Compare source document with extracted data
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg bg-purple-100 text-purple-700 font-semibold text-xs sm:text-sm">
              Pending
            </span>
            <button className="hidden sm:flex px-3 py-1 rounded bg-gray-100 text-gray-700 font-semibold items-center gap-1 hover:bg-gray-200 text-sm">
              Split View
            </button>
          </div>
        </div>

        {/* Responsive Panels Container: flex column for mobile, row for desktop */}
       <div className="flex flex-col lg:flex-row h-[calc(100vh-53px)] w-full bg-gray-50 overflow-auto"> 
      <div className="flex flex-col w-full lg:w-1/2 bg-gray-100 border-r p-0">
            {/* Toolbar Responsive */}
            <div className="flex gap-1 sm:gap-2 mb-2 mt-3 px-3 sm:px-4 flex-shrink-0 justify-center sm:justify-start">
              <button className="rounded bg-gray-100 hover:bg-gray-200 p-2 sm:px-3 sm:py-1 text-lg">
                <FiEye size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button className="rounded bg-gray-100 hover:bg-blue-100 text-blue-600 p-2 sm:px-3 sm:py-1 text-lg">
                <FiPlus size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button className="rounded bg-gray-100 hover:bg-blue-100 text-blue-600 p-2 sm:px-3 sm:py-1 text-lg">
                <FiMinus size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button className="rounded bg-gray-100 hover:bg-yellow-100 text-yellow-700 p-2 sm:px-3 sm:py-1 text-lg">
                <FiRefreshCw size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Invoice Image - Responsive */}
            <div className="flex justify-center overflow-auto">
              <img
                src={invoiceImage}
                alt="Invoice"
                className="rounded-lg border shadow max-w-full h-auto"
              />
            </div>

            {/* Confidence Legend */}
            <div className="bg-gray-100 py-2 sm:py-3 px-3 sm:px-4 border-t border-gray-200 flex flex-col sm:flex-row gap-1 sm:gap-4 text-xs justify-center flex-shrink-0">
              <span className="flex items-center gap-1 text-green-700 justify-center sm:justify-start">
                <span className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-green-100 inline-block"></span>
                High (90%+)
              </span>
              <span className="flex items-center gap-1 text-orange-500 justify-center sm:justify-start">
                <span className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-orange-100 inline-block"></span>
                Medium (70-89%)
              </span>
              <span className="flex items-center gap-1 text-red-600 justify-center sm:justify-start">
                <span className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-red-100 inline-block"></span>
                Low (&lt;70%)
              </span>
            </div>
          </div>

          {/* Right Panel - Extracted Data */}
          {/* On mobile, this div will be below left panel since flex-col on mobile */}
         <div className="w-full lg:w-1/2 flex flex-col h-auto bg-gray-50 border-l px-1 py-2
          space-y-6 sm:space-y-8 lg:space-y-10 overflow-visible">
            {/* Sticky Extracted Data Header */}
            <div className="sticky top-0 z-30 bg-white px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-5 flex items-center justify-between">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">Extracted Data</h2>
              <span className="flex items-center gap-1 px-2 sm:px-3 lg:px-4 py-1 rounded-lg bg-purple-100 text-purple-700 font-medium text-xs sm:text-sm">
                Pending
              </span>
            </div>

            {/* Scrollable Sections */}
            <div className="flex-1 overflow-auto px-3 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 lg:space-y-10">
              <InfoSection
                title="Header Information"
                data={headerInfo}
                bgColor="bg-blue-100 text-blue-800"
                borderColor="border-l-blue-500"
              />

              <InfoSection
                title="Supplier Information"
                data={supplierInfo}
                bgColor="bg-green-100 text-green-800"
                borderColor="border-l-green-500"
              />

              <section>
                <div className="text-sm sm:text-base font-semibold bg-blue-100 text-blue-800 rounded-t-xl px-4 sm:px-5 py-3 border-l-4 border-blue-500">
                  Line Items
                </div>
                <div className="bg-white rounded-b-xl p-3 sm:p-5 lg:p-7 shadow border-l-4 border-blue-100 overflow-x-auto">
                  <div className="min-w-[600px]"> {/* Horizontal scrolling on mobile */}
                    <table className="w-full divide-y divide-gray-200 border text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 text-xs sm:text-sm">Description</th>
                          <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 text-xs sm:text-sm">Qty</th>
                          <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 text-xs sm:text-sm">Unit Price</th>
                          <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 text-xs sm:text-sm">Amount</th>
                          <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 text-xs sm:text-sm">Confidence</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {lineItems.map((item, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{item.desc}</td>
                            <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{item.qty.toLocaleString()}</td>
                            <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{item.unit}</td>
                            <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium">{item.amount}</td>
                            <td className="px-3 sm:px-4 py-2">
                              <span className={`rounded-full py-1 px-2 text-xs font-bold ${item.color}`}>
                                {item.confidence}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <InfoSection
                title="Totals & Summary"
                data={totalsSummary}
                bgColor="bg-purple-100 text-purple-800"
                borderColor="border-l-purple-500"
              />
            </div>

            {/* Sticky Footer */}
            <div className="sticky bottom-0 left-0 right-0 w-full bg-white px-3 sm:px-6 lg:px-10 py-3 sm:py-4 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 z-30">
              <button className="px-3 sm:px-4 lg:px-5 py-2 rounded bg-gray-200 font-semibold hover:bg-gray-300 text-sm sm:text-base order-2 sm:order-1">
                Reject Invoice
              </button>
              <button className="px-3 sm:px-4 lg:px-5 py-2 rounded bg-gray-100 font-semibold hover:bg-gray-200 text-sm sm:text-base order-3 sm:order-2">
                Save Draft
              </button>
              <button className="px-3 sm:px-4 lg:px-5 py-2 rounded bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold text-sm sm:text-base order-1 sm:order-3 mb-2 sm:mb-0">
                Approve & Process
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
