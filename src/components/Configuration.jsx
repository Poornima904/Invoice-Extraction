import React, { useState } from "react";

export default function Configuration() {
  const [activeTab, setActiveTab] = useState("master");

  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col font-sans">
      {/* Top header bar */}
      <div className="bg-white border-b h-[54px] flex items-center px-8 text-lg font-semibold text-gray-900 shadow-sm">
        Configuration
      </div>
      {/* Page padding/content */}
      <div className="flex-1 px-3 sm:px-12 py-9">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("master")}
            className={`px-5 py-2 font-semibold rounded-t-lg ${
              activeTab === "master"
                ? "bg-purple-100 text-purple-700 border-b-4 border-purple-500"
                : "bg-white text-gray-600 border-b border-gray-300"
            }`}
          >
            Field Master
          </button>
          <button
            onClick={() => setActiveTab("vendor")}
            className={`px-5 py-2 font-semibold rounded-t-lg ${
              activeTab === "vendor"
                ? "bg-green-100 text-green-800 border-b-4 border-green-500"
                : "bg-white text-gray-600 border-b border-gray-300"
            }`}
          >
            Vendor Configuration
          </button>
        </div>
        {/* Cards */}
        <div className="flex flex-col gap-8">
          {/* Field Master Card */}
          {activeTab === "master" && (
            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
              {/* Colored header */}
              <div className="bg-purple-100 text-purple-700 font-semibold text-lg px-8 py-4">
                Manage Field Master
              </div>
              {/* Card body */}
              <div className="px-8 pb-8 pt-7">
                <div className="flex gap-7 mb-8">
                  <div className="flex-1">
                    <label className="block mb-2 font-semibold text-gray-900">Choose Operation</label>
                    <select className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none text-gray-900 bg-white transition hover:border-purple-500">
                      <option value="">Select operation</option>
                      <option value="create">Create Field</option>
                      <option value="edit">Edit Field</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block mb-2 font-semibold text-gray-900">Country</label>
                    <select className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none text-gray-900 bg-white transition hover:border-purple-500">
                      <option value="">Select country</option>
                      <option value="India">India</option>
                      <option value="Germany">Germany</option>
                      <option value="US">US</option>
                      <option value="France">France</option>
                    </select>
                  </div>
                </div>

                {/* Tables */}
                <div className="mb-3 font-semibold text-base text-gray-900">Header Fields</div>
                <table className="w-full table-fixed border-collapse mb-7">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-2 px-3 text-xs font-medium text-gray-500">Name</th>
                      <th className="py-2 px-3 text-xs font-medium text-gray-500">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-3 text-sm">Invoice_Number</td>
                      <td className="py-2 px-3 text-sm text-gray-600">Unique number for invoice tracking</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 text-sm">Invoice_Date</td>
                      <td className="py-2 px-3 text-sm text-gray-600">Date invoice issued</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 text-sm">Currency</td>
                      <td className="py-2 px-3 text-sm text-gray-600">Invoice currency (USD, INR, EUR)</td>
                    </tr>
                  </tbody>
                </table>

                <div className="mb-3 font-semibold text-base text-gray-900">Line Item Fields</div>
                <table className="w-full table-fixed border-collapse mb-5">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-2 px-3 text-xs font-medium text-gray-500">Name</th>
                      <th className="py-2 px-3 text-xs font-medium text-gray-500">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-3 text-sm">SL_No</td>
                      <td className="py-2 px-3 text-sm text-gray-600">Line item serial number</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 text-sm">Item_Description</td>
                      <td className="py-2 px-3 text-sm text-gray-600">Product/Service details</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 text-sm">Quantity</td>
                      <td className="py-2 px-3 text-sm text-gray-600">Quantity of items</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 text-sm">Unit_Price</td>
                      <td className="py-2 px-3 text-sm text-gray-600">Price per unit</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 text-sm">Total_Item_Amount</td>
                      <td className="py-2 px-3 text-sm text-gray-600">Total amount for line item</td>
                    </tr>
                  </tbody>
                </table>

                {/* Add Field Form */}
                <div className="flex gap-4 items-end mb-1">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-900 mb-1">Field Name</label>
                    <input
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none text-gray-900 bg-white"
                      placeholder="Enter field name"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-900 mb-1">Description</label>
                    <input
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none text-gray-900 bg-white"
                      placeholder="Enter field description"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-900 mb-1">Type</label>
                    <select
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none text-gray-900 bg-white transition hover:border-purple-500"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select type
                      </option>
                      <option value="string">String</option>
                      <option value="number">Number</option>
                      <option value="percentage">Percentage</option>
                      <option value="date">Date</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-900 mb-1">Created By</label>
                    <input
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none text-gray-900 bg-white"
                      placeholder="Enter creator name"
                    />
                  </div>
                </div>
                <button className="mt-3 px-3 py-2 rounded-md bg-purple-500 text-white font-semibold text-xs shadow-sm hover:bg-purple-700 transition">
                  + Add Field
                </button>
              </div>
            </div>
          )}

          {/* Vendor Configuration Card */}
          {activeTab === "vendor" && (
            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
              <div className="bg-green-100 text-green-800 font-semibold text-lg px-8 py-4">
                Manage Vendor Configuration
              </div>
              <div className="px-8 pb-8 pt-7">
                <div className="flex gap-7 mb-7">
                  <div className="flex-1">
                    <label className="block mb-2 font-semibold text-gray-900">Choose Operation</label>
                    <select className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none text-gray-900 bg-white transition hover:border-purple-500">
                      <option value="">Select operation</option>
                      <option value="create">Create Field</option>
                      <option value="edit">Edit Field</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block mb-2 font-semibold text-gray-900">Country</label>
                    <select className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-purple-200 outline-none text-gray-900 bg-white transition hover:border-purple-500">
                      <option value="">Select country</option>
                      <option value="India">India</option>
                      <option value="Germany">Germany</option>
                      <option value="US">US</option>
                      <option value="France">France</option>
                    </select>
                  </div>
                </div>
                <div className="flex mb-6 gap-6">
                  <div className="flex-1">
                    <label className="block font-semibold text-gray-900 mb-2">Vendor Name</label>
                    <input className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-200 outline-none text-gray-900 bg-white" />
                  </div>
                </div>
                <div className="mb-4 font-semibold text-gray-900 text-base">Prompts</div>
                <label className="block font-semibold text-gray-900 mb-2">Header Prompt</label>
                <textarea
                  className="w-full border rounded-lg bg-[#202124] text-gray-200 px-3 py-3 mb-4"
                  rows={2}
                  placeholder="Enter header extraction prompt..."
                />
                <label className="block font-semibold text-gray-900 mb-2">Line Items Prompt</label>
                <textarea
                  className="w-full border rounded-lg bg-[#202124] text-gray-200 px-3 py-3 mb-4"
                  rows={3}
                  placeholder="Enter prompt for line items..."
                />
                <button className="px-3 py-2 rounded-md bg-green-500 text-white font-semibold text-xs shadow-sm hover:bg-green-700 transition">
                  + Add Vendor
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
