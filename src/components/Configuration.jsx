import React, { useState, useEffect } from "react";
import { FiSettings } from "react-icons/fi";

// -------------------- MAIN COMPONENT --------------------
const Configuration = () => {
  const [activeTab, setActiveTab] = useState("field");

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
            activeTab === "field"
              ? "bg-white text-gray-900 border-t border-x border-gray-300"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setActiveTab("field")}
        >
          Field Master
        </button>
        <button
          className={`rounded-t-lg px-6 py-3 text-base font-medium focus:outline-none transition ${
            activeTab === "vendor"
              ? "bg-white text-gray-900 border-t border-x border-gray-300"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setActiveTab("vendor")}
        >
          Vendor Configuration
        </button>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-b-xl rounded-t-none shadow-lg mt-1 mx-8 mb-10 overflow-hidden">
        {activeTab === "field" ? <FieldMaster /> : <VendorConfiguration />}
      </div>
    </div>
  );
};

// -------------------- FIELD MASTER --------------------

const FieldMaster = () => {
  const [headerFields, setHeaderFields] = useState([]);
  const [lineItemFields, setLineItemFields] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form input states
  const [operation, setOperation] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [description, setDescription] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [country, setCountry] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  // Fetch fields from API
  const fetchFields = async () => {
    debugger;
    setLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTM1OWQ0YzMxODI0NDIwODcwZDExMSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc2MDUwNjE3NywiZXhwIjoxNzYwNTkyNTc3fQ.YqdCfJz5jHtonqZ33-HkzcKDAA-wZnCB929wlSlr1K8"
      );
      myHeaders.append("Content-Type", "application/json");

      // Note: GET requests don't usually have a body, so we omit 'body' here.
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        "https://hczbk50t-5050.inc1.devtunnels.ms/fieldmaster",
        requestOptions
      );

      if (!response.ok) throw new Error("Failed to fetch fields");

      const result = await response.json();
      const fields = result.fields || [];

      setHeaderFields(fields.filter((f) => f.Type === "Header"));
      setLineItemFields(fields.filter((f) => f.Type === "Line Item"));
    } catch (error) {
      console.error("Error fetching fields:", error);
      setHeaderFields([]);
      setLineItemFields([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldAction = async () => {
    debugger;
    if (
      !operation ||
      !fieldName ||
      (operation === "create" &&
        (!description || !fieldType || !country || !createdBy)) ||
      (operation === "delete" && !country)
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTM1OWQ0YzMxODI0NDIwODcwZDExMSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc2MDUwNjE3NywiZXhwIjoxNzYwNTkyNTc3fQ.YqdCfJz5jHtonqZ33-HkzcKDAA-wZnCB929wlSlr1K8"
    );
    myHeaders.append("Content-Type", "application/json");

    if (operation === "create") {
      const raw = JSON.stringify({
        fieldname: fieldName,
        Description: description,
        Type: fieldType,
        country,
        createdby: createdBy,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        setLoading(true);
        const response = await fetch(
          "https://hczbk50t-5050.inc1.devtunnels.ms/fieldmaster",
          requestOptions
        );
        if (!response.ok) throw new Error("Failed to create field");
        const result = await response.text();
        console.log(result);
        alert("Field created successfully!");
        fetchFields();
      } catch (error) {
        alert("Error creating field: " + error.message);
      } finally {
        setLoading(false);
      }
    } else if (operation === "delete") {
      try {
        setLoading(true);
        const raw = JSON.stringify({
          name: fieldName,
          country: country,
        });

        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(
          "https://hczbk50t-5050.inc1.devtunnels.ms/fieldmaster",
          requestOptions
        );
        if (!response.ok) throw new Error("Failed to delete field");
        const result = await response.text();
        console.log(result);
        alert("Field deleted successfully!");
        fetchFields();
        setFieldName("");
        setCountry("");
      } catch (error) {
        alert("Error deleting field: " + error.message);
        setFieldName("");
        setCountry("");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchFields();
  }, []);

  return (
    <div className="p-6">
      <div className="bg-green-100 text-green-900 text-lg font-semibold rounded-t-xl px-6 py-4 mb-6">
        Manage Field Master
      </div>

      {/* Operation + Country */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">
            Choose Operation
          </label>
          <select
            value={operation}
            onChange={(e) => {
              setOperation(e.target.value);
              // Reset form fields on operation change
              setFieldName("");
              setDescription("");
              setFieldType("");
              setCountry("");
              setCreatedBy("");
            }}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Select operation
            </option>
            <option value="create">Create Field</option>
            <option value="delete">Delete Field</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">
            Country
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Select country
            </option>
            <option>USA</option>
            <option>India</option>
            <option>United Kingdom</option>
            <option>Germany</option>
            <option>France</option>
          </select>
        </div>
      </div>

      {/* Fields Tables */}
      <SectionWithTable
        title="Header Fields"
        rows={headerFields}
        loading={loading}
      />
      <SectionWithTable
        title="Line Item Fields"
        rows={lineItemFields}
        loading={loading}
      />

      {/* Form inputs depending on operation */}

      {operation === "delete" && (
        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleFieldAction();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
     
       

            {/* Field Name dropdown populated with API fields */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Field Name
              </label>
              <select
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled>
                  Select field to delete
                </option>
                {[...headerFields, ...lineItemFields].map((field) => (
                  <option key={field.fieldname} value={field.fieldname}>
                    {field.fieldname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-red-600 text-white text-lg px-6 py-3 rounded-lg font-semibold hover:brightness-90 transition"
              disabled={loading}
            >
              Delete Field
            </button>
          </div>
        </form>
      )}

      {operation === "create" && (
        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleFieldAction();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Field Name
              </label>
              <input
                type="text"
                placeholder="Enter field name"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <input
                type="text"
                placeholder="Enter field description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Type
              </label>
              <select
                value={fieldType}
                onChange={(e) => setFieldType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="Header">Header</option>
                <option value="Line Item">Line Item</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Created By
              </label>
              <input
                type="text"
                placeholder="Enter creator name"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-indigo-600 text-white text-lg px-6 py-3 rounded-lg font-semibold hover:brightness-90 transition"
              disabled={loading}
            >
              Create Field
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

// -------------------- VENDOR CONFIGURATION --------------------
const VendorConfiguration = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [headerPrompt, setHeaderPrompt] = useState("");
  const [lineItemPrompt, setLineItemPrompt] = useState("");

  // Fetch vendor names from API
  const fetchVendors = async () => {
    debugger
    setLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTM1OWQ0YzMxODI0NDIwODcwZDExMSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc2MDUwNjE3NywiZXhwIjoxNzYwNTkyNTc3fQ.YqdCfJz5jHtonqZ33-HkzcKDAA-wZnCB929wlSlr1K8"
      );
      const requestOptions = { method: "GET", headers: myHeaders };
      const url = `https://hczbk50t-5050.inc1.devtunnels.ms/api/vendors?country=${encodeURIComponent(
        selectedCountry
      )}&active=true`;

      const response = await fetch(url, requestOptions);
      if (!response.ok) throw new Error("Failed to fetch vendors");
      const data = await response.json();
      const vendorNames = (data || data?.result || []).map((v) => v.vendor_name);
      setVendors(vendorNames);
    } catch (error) {
      console.error(error);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCountry && selectedOperation === "Edit Vendor") fetchVendors();
    else setVendors([]);
  }, [selectedCountry, selectedOperation]);

  const handleVendorAction = async () => {
    if (
      !selectedOperation ||
      !selectedCountry ||
      !createdBy ||
      !selectedVendor
    ) {
      alert("Please fill all required fields.");
      return;
    }
    // Implement your POST/PUT logic here
    alert(`✅ ${selectedOperation} successful!`);
    fetchVendors();
    setSelectedVendor("");
    setHeaderPrompt("");
    setLineItemPrompt("");
    setCreatedBy("");
    if (selectedOperation === "Onboard Vendor") setSelectedOperation("");
  };

  return (
    <div className="p-6">
      <div className="bg-green-100 text-green-900 text-lg font-semibold rounded-t-xl px-6 py-4 mb-6">
        Manage Vendor Configuration
      </div>

      {/* Operation + Country */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">
            Choose Operation
          </label>
          <select
            value={selectedOperation}
            onChange={(e) => setSelectedOperation(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Select operation
            </option>
            <option>Onboard Vendor</option>
            <option>Edit Vendor</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2">
            Country
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Select country
            </option>
            <option>USA</option>
            <option>India</option>
            <option>United Kingdom</option>
            <option>Germany</option>
            <option>France</option>
          </select>
        </div>
      </div>

      {/* Vendor Name */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Vendor Name
        </label>
        {selectedOperation === "Onboard Vendor" ? (
          <input
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
            placeholder="Enter vendor name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          <select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              {loading ? "Loading..." : "Select vendor"}
            </option>
            {vendors.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Prompts */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Header Prompt
        </label>
        <textarea
          value={headerPrompt}
          onChange={(e) => setHeaderPrompt(e.target.value)}
          className="w-full min-h-[90px] bg-gray-900 text-gray-200 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter header extraction prompt..."
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Line Items Prompt
        </label>
        <textarea
          value={lineItemPrompt}
          onChange={(e) => setLineItemPrompt(e.target.value)}
          className="w-full min-h-[90px] bg-gray-900 text-gray-200 rounded-lg px-4 py-3 font-mono text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter line item extraction prompt..."
        />
      </div>

      {/* Created By */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Created By
        </label>
        <input
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          placeholder="Enter creator name"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Add Vendor Button */}
      <button
        onClick={handleVendorAction}
        className="bg-gradient-to-r from-green-500 to-indigo-600 text-white text-lg px-6 py-3 rounded-lg font-semibold hover:brightness-90 transition flex items-center justify-center gap-2"
      >
        <span>+</span>{" "}
        {selectedOperation === "Edit Vendor" ? "Edit Vendor" : "Add Vendor"}
      </button>
    </div>
  );
};

// -------------------- SHARED TABLE COMPONENT --------------------
const SectionWithTable = ({ title, rows, loading }) => (
  <div className="mb-10">
    <div className="text-gray-700 font-semibold mb-4">{title}</div>
    <div className="overflow-x-auto rounded-lg border border-gray-300">
      {loading ? (
        <div className="text-center py-6 text-gray-500">Loading...</div>
      ) : rows.length === 0 ? (
        <div className="text-center py-6 text-gray-500">No data available</div>
      ) : (
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
                  {row.name || row.fieldname}
                </td>
                <td className="py-2 px-4 text-sm">{row.Description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);

export default Configuration;
