import React, { useState } from 'react';
import './Configuration.css';

const Configuration = () => {
  const [activeTab, setActiveTab] = useState('field');
  return (
    <div className="config-bg">
      <div className="config-header">
        <span className="config-title">Configuration</span>
        <div className="config-actions">
          <button className="reset-btn">Reset to Defaults</button>
          <button className="save-btn">Save Configuration</button>
        </div>
      </div>
      <div className="tab-row">
        <button className={activeTab === 'field' ? 'tab active' : 'tab'} onClick={() => setActiveTab('field')}>Field Master</button>
        <button className={activeTab === 'vendor' ? 'tab active' : 'tab'} onClick={() => setActiveTab('vendor')}>Vendor Configuration</button>
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
    <select className="custom-dropdown">
      <option value="" disabled selected>Select operation</option>
      <option value="create">Create Field</option>
      <option value="edit">Edit Field</option>
    </select>
  </div>
  <div>
    <label>Country</label>
    <select className="custom-dropdown">
      <option value="" disabled selected>Select country</option>
      <option value="us">United States</option>
      <option value="in">India</option>
      <option value="uk">United Kingdom</option>
      <option value="de">Germany</option>
      <option value="fr">France</option>
    </select>
  </div>
</div>


    <div className="fields-section">
      <div className="fields-title">Header Fields</div>
      <table className="fields-table">
        <thead><tr><th>Name</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Invoice_Number</td><td>Unique number for invoice tracking</td></tr>
          <tr><td>Invoice_Date</td><td>Date invoice issued</td></tr>
          <tr><td>Currency</td><td>Invoice currency (USD, INR, EUR)</td></tr>
        </tbody>
      </table>

      <div className="fields-title">Line Item Fields</div>
      <table className="fields-table">
        <thead><tr><th>Name</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Sl_No</td><td>Line item serial number</td></tr>
          <tr><td>Item_Description</td><td>Product/Service details</td></tr>
          <tr><td>Quantity</td><td>Quantity of items</td></tr>
          <tr><td>Unit_Price</td><td>Price per unit</td></tr>
          <tr><td>Total_Item_Amount</td><td>Total amount for line item</td></tr>
        </tbody>
      </table>
    </div>

    {/* Added wrapper with margin for alignment */}
    <div className="fields-section-alignment">
      <form className="add-fields-form" autoComplete="off">
        <div className="add-fields-grid">
          <div>
            <label>Field Name</label>
            <input type="text" placeholder="Enter field name" />
          </div>
          <div>
            <label>Description</label>
            <input type="text" placeholder="Enter field description" />
          </div>
          <div>
            <label>Type</label>
            <select className="custom-dropdown">
              <option value="" disabled selected>Select type</option>
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="percentage">Percentage</option>
              <option value="date">Date</option>
            </select>
          </div>
          <div>
            <label>Created By</label>
            <input type="text" placeholder="Enter creator name" />
          </div>
        </div>
        <div className="add-btn-row">
          <button className="add-btn" type="button"><span className="add-btn-icon">+</span>Add Field</button>
        </div>
      </form>
    </div>
  </div>
);

const VendorConfiguration = () => (
  <div className="card">
    <div className="card-header vendor-header">Manage Vendor Configuration</div>
    <div className="vendor-section-alignment">
      <div className="vendor-form-row">
        <div className="vendor-form-col">
          <label>Choose Operation</label>
          <select className="custom-dropdown">
            <option value="" disabled selected>Select operation</option>
            <option>Onboard Vendor</option>
            <option>Edit Vendor</option>
          </select>
        </div>
        <div className="vendor-form-col">
          <label>Country</label>
          <select className="custom-dropdown">
            <option value="" disabled selected>Select country</option>
            <option>United States</option>
            <option>India</option>
            <option>United Kingdom</option>
            <option>Germany</option>
            <option>France</option>
          </select>
        </div>
      </div>
      <div className="vendor-form-col">
        <label>Vendor Name</label>
        <input placeholder="Enter vendor name" />
      </div>
      <div className="prompts-label">Prompts</div>
      
      <div className="vendor-form-col">
        <label>Header Prompt</label>
        <textarea className="prompt-area" placeholder="Enter header extraction prompt..." />
      </div>
      <div className="vendor-form-col">
        <label>Line Items Prompt</label>
        <textarea
          className="prompt-area"
          defaultValue={`## Fields\nAnalyze the content and extract: {Invoice_Number, Date, Amount, Vendor_Name}\n## Output\nReturn as JSON dictionary format`}
        />
      </div>
      <div className="vendor-form-col">
        <label>Created By</label>
        <input placeholder="Enter creator name" />
      </div>
      <button className="add-btn" type="button">
        <span>+</span> Add Vendor
      </button>
    </div>
  </div>
);


export default Configuration;
