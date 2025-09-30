import React, { useState } from 'react';
import {

  FiSettings

} from "react-icons/fi";
import './Configuration.css';


const Configuration = () => {
  const [activeTab, setActiveTab] = useState('field');
  return (
    <div className="config-bg">
      <div className="config-header">
        
        <span className="config-title flex gap-2 items-center"><FiSettings size={20} className="config-icon" /> Configuration</span>
        <div className="config-actions">
          <button className="reset-btn">Reset to Defaults</button>
          <button className="save-btn">Save Configuration</button>
        </div>
      </div>
      <div className="tab-row">
        <button
          className={activeTab === 'field' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('field')}
        >
          Field Master
        </button>
        <button
          className={activeTab === 'vendor' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('vendor')}
        >
          Vendor Configuration
        </button>
      </div>
      {activeTab === 'field' ? <FieldMaster /> : <VendorConfiguration />}
    </div>
  );
};

const FieldMaster = () => (
  <div className="card">
    <div className="card-header">Manage Field Master</div>
    <div className="form-row">
      <div>
        <label>Choose Operation</label>
        <div className="dropdown">Select operation</div>
      </div>
      <div>
        <label>Country</label>
        <div className="dropdown">Select country</div>
      </div>
    </div>
    <div className="fields-section">
      <div className="fields-title">Header Fields</div>
      <table className="fields-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Invoice_Number</td><td>Unique number for invoice tracking</td></tr>
          <tr><td>Invoice_Date</td><td>Date invoice issued</td></tr>
          <tr><td>Currency</td><td>Invoice currency (USD, INR, EUR)</td></tr>
        </tbody>
      </table>
      <div className="fields-title">Line Item Fields</div>
      <table className="fields-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Sl_No</td><td>Line item serial number</td></tr>
          <tr><td>Item_Description</td><td>Product/Service details</td></tr>
          <tr><td>Quantity</td><td>Quantity of items</td></tr>
          <tr><td>Unit_Price</td><td>Price per unit</td></tr>
          <tr><td>Total_Item_Amount</td><td>Total amount for line item</td></tr>
        </tbody>
      </table>
    </div>
    {/* Add Field Section */}
    <form className="add-fields-form" autoComplete="off">
      <div className="add-fields-grid">
        <div className="add-fields-col">
          <label>Field Name</label>
          <input type="text" placeholder="Enter field name" />
        </div>
        <div className="add-fields-col">
          <label>Description</label>
          <input type="text" placeholder="Enter field description" />
        </div>
        <div className="add-fields-col">
          <label>Type</label>
          <select>
            <option>Select type</option>
          </select>
        </div>
        <div className="add-fields-col">
          <label>Created By</label>
          <input type="text" placeholder="Enter creator name" />
        </div>
      </div>
      <div className="add-btn-row">
        <button className="add-btn" type="button">
          <span className="add-btn-icon">+</span>
          Add Field
        </button>
      </div>
    </form>
  </div>
);

// const VendorConfiguration = () => (
//   <div className="card">
//     <div className="card-header green">Manage Vendor Configuration</div>
//     {/* Vendor config content here */}
//   </div>
// );
const VendorConfiguration = () => (
  <div className="card">
    <div className="card-header vendor-header">
      Manage Vendor Configuration
    </div>
    <div className="vendor-form-row">
      <div className="vendor-form-col">
        <label>Choose Operation</label>
        <div className="dropdown">Select operation</div>
      </div>
      <div className="vendor-form-col">
        <label>Country</label>
        <div className="dropdown">Select country</div>
      </div>
    </div>
    <div className="vendor-form-col" style={{marginBottom: "10px", maxWidth: 330}}>
      <label>Vendor Name</label>
      <input placeholder="Enter vendor name"/>
    </div>
    <div className="prompts-label">Prompts</div>
    <div className="vendor-form-col">
      <label>Header Prompt</label>
      <textarea
        className="prompt-area"
        placeholder="Enter header extraction prompt..."
      />
    </div>
    <div className="vendor-form-col">
      <label>Line Items Prompt</label>
      <textarea
        className="prompt-area"
        defaultValue={`## Fields\nAnalyze the content and extract: {Invoice_Number, Date, Amount, Vendor_Name}\n## Output\nReturn as JSON dictionary format`}
      />
    </div>
    <div className="vendor-form-col" style={{maxWidth: 330}}>
      <label>Created By</label>
      <input placeholder="Enter creator name" />
    </div>
    <button className="add-vendor-btn" type="button">
      <span className="add-vendor-btn-icon">+</span> Add Vendor
    </button>
  </div>
);


export default Configuration;
