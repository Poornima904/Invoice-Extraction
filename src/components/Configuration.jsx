import React, { useState } from 'react';
import { FiSettings } from "react-icons/fi";

const Configuration = () => {
  const [activeTab, setActiveTab] = useState('field');
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between px-8 pt-7">
        <span className="flex items-center gap-2 text-gray-500 font-medium text-lg">
          <FiSettings size={20} />
          Configuration
        </span>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <button className="bg-gray-100 px-6 py-2 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition">
            Reset to Defaults
          </button>
          <button className="bg-green-500 px-6 py-2 text-white font-medium rounded-lg hover:bg-green-600 transition">
            Save Configuration
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mt-5 ml-8">
        <button
          className={`rounded-t-lg px-6 py-3 text-base font-medium focus:outline-none transition ${
            activeTab === 'field' ? 'bg-white text-gray-900 border-t border-x border-gray-300' : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => setActiveTab('field')}
        >
          Field Master
        </button>
        <button
          className={`rounded-t-lg px-6 py-3 text-base font-medium focus:outline-none transition ${
            activeTab === 'vendor' ? 'bg-white text-gray-900 border-t border-x border-gray-300' : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => setActiveTab('vendor')}
        >
          Vendor Configuration
        </button>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-b-xl rounded-t-none shadow-lg mt-1 mx-8 mb-10 overflow-hidden">
        {activeTab === 'field' ? <FieldMaster /> : <VendorConfiguration />}
      </div>
    </div>
  );
};

const FieldMaster = () => (
  <div className="p-6">
    <div className="bg-green-100 text-green-900 text-lg font-semibold rounded-t-xl px-6 py-4 mb-6">
      Manage Field Master
    </div>

    {/* Operation + Country Row */}
    <div className="flex flex-col md:flex-row gap-6 mb-10">
      <div className="flex-1">
        <label className="block text-gray-700 font-semibold mb-2">Choose Operation</label>
        <select className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option disabled selected>Select operation</option>
          <option value="create">Create Field</option>
          <option value="edit">Edit Field</option>
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-gray-700 font-semibold mb-2">Country</label>
        <select className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option disabled selected>Select country</option>
          <option value="us">United States</option>
          <option value="in">India</option>
          <option value="uk">United Kingdom</option>
          <option value="de">Germany</option>
          <option value="fr">France</option>
        </select>
      </div>
    </div>

    {/* Header Fields */}
    <SectionWithTable
      title="Header Fields"
      rows={[
        { name: "Invoice_Number", description: "Unique number for invoice tracking" },
        { name: "Invoice_Date", description: "Date invoice issued" },
        { name: "Currency", description: "Invoice currency (USD, INR, EUR)" }
      ]}
    />

    {/* Line Item Fields */}
    <SectionWithTable
      title="Line Item Fields"
      rows={[
        { name: "Sl_No", description: "Line item serial number" },
        { name: "Item_Description", description: "Product/Service details" },
        { name: "Quantity", description: "Quantity of items" },
        { name: "Unit_Price", description: "Price per unit" },
        { name: "Total_Item_Amount", description: "Total amount for line item" }
      ]}
    />

    {/* Add new field form */}
    <form className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Field Name</label>
          <input type="text" placeholder="Enter field name" className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <input type="text" placeholder="Enter field description" className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Type</label>
          <select className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option disabled selected>Select type</option>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="percentage">Percentage</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Created By</label>
          <input type="text" placeholder="Enter creator name" className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
      </div>

      <div className="mt-6">
        <button type="button" className="bg-gradient-to-r from-green-500 to-indigo-600 text-white text-lg px-6 py-3 rounded-lg font-semibold hover:brightness-90 transition">
          <span className="mr-2">+</span> Add Field
        </button>
      </div>
    </form>
  </div>
);

const VendorConfiguration = () => (
  <div className="p-6">
    <div className="bg-green-100 text-green-900 text-lg font-semibold rounded-t-xl px-6 py-4 mb-6">
      Manage Vendor Configuration
    </div>

    {/* Operation + Country */}
    <div className="flex flex-col md:flex-row gap-6 mb-6">
      <div className="flex-1">
        <label className="block text-gray-700 font-semibold mb-2">Choose Operation</label>
        <select className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option disabled selected>Select operation</option>
          <option>Onboard Vendor</option>
          <option>Edit Vendor</option>
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-gray-700 font-semibold mb-2">Country</label>
        <select className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option disabled selected>Select country</option>
          <option>United States</option>
          <option>India</option>
          <option>United Kingdom</option>
          <option>Germany</option>
          <option>France</option>
        </select>
      </div>
    </div>

    {/* Vendor Name */}
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">Vendor Name</label>
      <input placeholder="Enter vendor name" className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" />
    </div>

    {/* Prompts */}
    <div className="mb-4 text-gray-700 font-semibold text-lg">Prompts</div>
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">Header Prompt</label>
      <textarea className="w-full min-h-[90px] bg-gray-900 text-gray-200 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter header extraction prompt..."></textarea>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">Line Items Prompt</label>
      <textarea className="w-full min-h-[90px] bg-gray-900 text-gray-200 rounded-lg px-4 py-3 font-mono text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-400" defaultValue={`## Fields\nAnalyze the content and extract: {Invoice_Number, Date, Amount, Vendor_Name}\n## Output\nReturn as JSON dictionary format`}></textarea>
    </div>

    {/* Created By */}
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">Created By</label>
      <input placeholder="Enter creator name" className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" />
    </div>

    {/* Add Vendor Button */}
    <button className="bg-gradient-to-r from-green-500 to-indigo-600 text-white text-lg px-6 py-3 rounded-lg font-semibold hover:brightness-90 transition flex items-center justify-center gap-2">
      <span>+</span> Add Vendor
    </button>
  </div>
);

// Shared reusable component for showing table sections
const SectionWithTable = ({ title, rows }) => (
  <div className="mb-10">
    <div className="text-gray-700 font-semibold mb-4">{title}</div>
    <div className="overflow-x-auto rounded-lg border border-gray-300">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left text-sm font-semibold">
            <th className="py-3 px-4 border-r border-gray-300">Name</th>
            <th className="py-3 px-4">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={idx}
              className="border-t border-gray-300 odd:bg-white even:bg-gray-50"
            >
              <td className="py-2 px-4 border-r border-gray-300 align-top text-sm">
                {row.name}
              </td>
              <td className="py-2 px-4 text-sm">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);


export default Configuration;
