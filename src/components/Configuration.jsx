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
 

  // Fetch fields from API
  const fetchFields = async (country) => {
    debugger;
    setLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        country: country,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw, // ✅ fixed typo
        redirect: "follow",
      };

      const response = await fetch(
        "https://hczbk50t-5000.inc1.devtunnels.ms/fields/all",
        requestOptions
      );

      if (!response.ok)
        throw new Error(`Failed to fetch fields (${response.status})`);

      const result = await response.json();
      console.log("✅ Fetched fields:", result);

      const fields = result.fields || result.result || [];

      setHeaderFields(fields.filter((f) => f.Type === "Header"));
      setLineItemFields(fields.filter((f) => f.Type === "Line Item"));
    } catch (error) {
      console.error("❌ Error fetching fields:", error);
      setHeaderFields([]);
      setLineItemFields([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldAction = async () => {
    debugger;

    // 🔹 Validation for required fields
    if (!operation) {
      alert("Please choose an operation.");
      return;
    }

    if (operation === "create") {
      debugger;
      if (!fieldName || !description || !fieldType || !country || !createdBy) {
        alert(
          "Please fill all required fields: Field Name, Description, Type, Country, Created By."
        );
        return;
      }

      try {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          name: fieldName,
          description: description,
          type: fieldType,
          country: country,
          created_by: createdBy,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(
          "https://hczbk50t-5000.inc1.devtunnels.ms/fields/create_field",
          requestOptions
        );

        if (!response.ok) {
          throw new Error(
            `Failed to create field (${response.status} ${response.statusText})`
          );
        }

        const result = await response.text();
        console.log("✅ Field created successfully:", result);
        alert("✅ Field created successfully!");
        fetchFields(country);

        // Reset form
        setFieldName("");
        setDescription("");
        setFieldType("");
        setCountry("");
        setCreatedBy("");
        setOperation("");
      } catch (error) {
        console.error("❌ Error creating field:", error);
        alert("Failed to create field. Check console for details.");
      } finally {
        setLoading(false);
      }
    }

    // 🔴 Delete logic remains same
    else if (operation === "delete") {
      debugger;
      if (!fieldName || !country) {
        alert("Please select a Field Name and Country to delete.");
        return;
      }

      try {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          name: fieldName,
          country: country,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(
          "https://hczbk50t-5000.inc1.devtunnels.ms/fields/delete",
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`Failed to delete field (${response.status})`);
        }

        const result = await response.text();
        console.log("✅ Field deleted successfully:", result);
        alert("✅ Field deleted successfully!");

        fetchFields(country);
        setFieldName("");
        setCountry("");
      } catch (error) {
        console.error("❌ Error deleting field:", error);
        alert("Failed to delete field. Check console for details.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchFields(country);
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
            onChange={(e) => {setCountry(e.target.value)
              fetchFields(e.target.value)
            }}
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
      {/* 🔹 Type Dropdown (Header / Line Item) */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Field Type
        </label>
        <select
          value={fieldType}
          onChange={(e) => {
            setFieldType(e.target.value);
            setFieldName(""); // reset selected field when type changes
          }}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            Select field type
          </option>
          <option value="Header">Header</option>
          <option value="Line Item">Line Item</option>
        </select>
      </div>

      {/* 🔹 Field Name Dropdown (Filtered Based on Type) */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Field Name
        </label>
        <select
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={!fieldType} // disable if no type selected
        >
          <option value="" disabled>
            {fieldType ? "Select field to delete" : "Select field type first"}
          </option>

          {(fieldType === "Header" ? headerFields : lineItemFields).map(
            (field) => (
              <option key={field.Name || field.fieldname} value={field.Name || field.fieldname}>
                {field.Name || field.fieldname}
              </option>
            )
          )}
        </select>
      </div>
    </div>

    <div className="mt-6">
      <button
        type="submit"
        className="bg-red-600 text-white text-lg px-6 py-3 rounded-lg font-semibold hover:brightness-90 transition"
        disabled={loading || !fieldType || !fieldName}
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
  const defaultHeaderPrompt = `## Fields
Analyze the content given to you and extract the following fields from the data:
{fields}
## Output
It has to be strictly a dict.`;

  const defaultLineItemPrompt = `## Fields
Analyze the content given to you and extract the following fields at each line item level from the data:
{fields}

## Input
It will be a string having list of different table contents found in an invoice. All strings in that list are different tables found in the invoice.

## Output
It has to be strictly a dict: {"data": [{"line_item_1 fields"}, {"line_item_2 fields"}, ......]}.

## Other Instructions
1. If you don't find any of these fields return it as an empty string.
2. All the amount fields should be only number (ex. '36.00' or '45.78'), no other string should be present.
3. Percentages should be only number (ex. '36%'' -> '36.00' or '36.91%'' -> '36.91'), no other string should be present.
4. Quantity field should be strictly a number (ex. '30 pieces' -> '30').
5. The tax fields should strictly be extracted only if mentioned in the Line Items and not at the end of the document.
6. Please note all the values should be of string type.
7. MAKE SURE ALL THE LINE ITEMS ARE EXTRACTED. This is a very important step.
8. Another important thing is that multiple pages can be involved and the line items of the next page may be separated by some other table in between. It's your responsibility to understand that and accordingly extract the fields.

## Important Note
STRICTLY DO NOT CALCULATE THE TAX FIELDS ON YOUR OWN.

## Content`;

  const fetchVendors = async () => {
    debugger;
    setLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        country: selectedCountry || "USA",
        active: true,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "https://hczbk50t-5000.inc1.devtunnels.ms/vendor/all",
        requestOptions
      );

      if (!response.ok) throw new Error("Failed to fetch vendors");

      const data = await response.json();

      const vendorNames = (data.vendors || data?.result || []).map((v) => v);
      setVendors(vendorNames);
    } catch (error) {
      console.error(error);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      selectedCountry &&
      (selectedOperation === "Update Vendor" ||
        selectedOperation === "Delete Vendor")
    ) {
      fetchVendors();
    } else {
      setVendors([]);
    }
  }, [selectedCountry, selectedOperation]);

  useEffect(() => {
    if (
      selectedOperation === "Onboard Vendor" ||
      selectedOperation === "Update Vendor"
    ) {
      setHeaderPrompt(defaultHeaderPrompt);
      setLineItemPrompt(defaultLineItemPrompt);
    } else if (selectedOperation === "Delete Vendor") {
      setHeaderPrompt("");
      setLineItemPrompt("");
    }
  }, [selectedOperation]);

  const handleVendorAction = async () => {
    debugger;
    if (!selectedOperation || !selectedCountry || !createdBy) {
      alert("Please fill all required fields.");
      return;
    }

    // 🔹 Helper function to fetch vendor ID by name
    const getVendorIdByName = async (vendorName) => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({ vendor_name: vendorName });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(
          "https://hczbk50t-5000.inc1.devtunnels.ms/vendor/config",
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Failed to fetch vendor ID.");
        }

        const data = await response.json();
        console.log("Fetched vendor config:", data);

        // ✅ Try multiple keys to ensure we get the ID correctly
        const vendorId =
          data?.id || data?.vendor_id || data?.result?.id || data?.vendor?.id;

        return vendorId || null;
      } catch (error) {
        console.error("❌ Error fetching vendor ID:", error);
        return null;
      }
    };

    if (selectedOperation === "Onboard Vendor") {
      if (!selectedVendor) {
        alert("Please enter Vendor Name.");
        return;
      }

      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          vendor_name: selectedVendor,
          header_prompt: headerPrompt || "NA",
          line_item_prompt: lineItemPrompt || "NA",
          country: selectedCountry,
          created_by: createdBy,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(
          "https://hczbk50t-5000.inc1.devtunnels.ms/vendor/create",
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.text();
        console.log("✅ Vendor created successfully:", result);
        alert("✅ Vendor onboarded successfully!");

        // Reset fields
        setSelectedVendor("");
        setHeaderPrompt("");
        setLineItemPrompt("");
        setCreatedBy("");
        setSelectedOperation("");
        setSelectedCountry("");
      } catch (error) {
        console.error("❌ Error creating vendor:", error);
        alert("Failed to onboard vendor. Check console for details.");
      }
    } else if (selectedOperation === "Update Vendor") {
      debugger;
      if (!selectedVendor) {
        alert("Please select a vendor to update.");
        return;
      }

      try {
        // 1️⃣ Get vendor ID (shared function)
        const vendorId = await getVendorIdByName(selectedVendor);
        if (!vendorId) {
          alert("Vendor ID not found. Cannot update vendor.");
          return;
        }

        // 2️⃣ Update vendor using ID
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          id: vendorId,
          header_prompt: headerPrompt || "NA",
          table_prompt: lineItemPrompt || "NA",
          country: selectedCountry,
          updated_by: createdBy,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(
          "https://hczbk50t-5000.inc1.devtunnels.ms/vendor/update",
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`Error updating vendor: ${response.statusText}`);
        }

        const result = await response.text();
        console.log("✅ Vendor updated successfully:", result);
        alert(`✅ Vendor "${selectedVendor}" updated successfully!`);

        fetchVendors();
        setSelectedVendor("");
        setHeaderPrompt("");
        setLineItemPrompt("");
        setCreatedBy("");
      } catch (error) {
        console.error("❌ Error updating vendor:", error);
        alert("Failed to update vendor. Check console for details.");
      }
    } else if (selectedOperation === "Delete Vendor") {
      debugger;
      if (!selectedVendor) {
        alert("Please select a vendor to delete.");
        return;
      }

      const confirmDelete = window.confirm(
        `Are you sure you want to delete vendor: ${selectedVendor}?`
      );
      if (!confirmDelete) return;

      try {
        // 1️⃣ Get vendor ID (shared function)
        const vendorId = await getVendorIdByName(selectedVendor);
        if (!vendorId) {
          alert("Vendor ID not found. Cannot delete this vendor.");
          return;
        }

        // 2️⃣ Call delete API using fetched vendor ID
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          id: vendorId,
          updated_by: createdBy,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(
          "https://hczbk50t-5000.inc1.devtunnels.ms/vendor/delete",
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`Error deleting vendor: ${response.statusText}`);
        }

        const result = await response.text();
        console.log("✅ Vendor deleted successfully:", result);
        alert(`✅ Vendor "${selectedVendor}" deleted successfully!`);

        fetchVendors();
        setSelectedVendor("");
      } catch (error) {
        console.error("❌ Error deleting vendor:", error);
        alert("Failed to delete vendor. Check console for details.");
      }
    }
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
            <option>Update Vendor</option>
            <option>Delete Vendor</option>
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
      {/* Created By / Updated By */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          {selectedOperation === "Update Vendor" ||
          selectedOperation === "Delete Vendor"
            ? "Updated By"
            : "Created By"}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          placeholder={
            selectedOperation === "Update Vendor" ||
            selectedOperation === "Delete Vendor"
              ? "Enter updater email"
              : "Enter creator email"
          }
          className={`w-full px-4 py-3 rounded-lg border ${
            !createdBy &&
            (selectedOperation === "Update Vendor" ||
              selectedOperation === "Delete Vendor" ||
              selectedOperation === "Onboard Vendor")
              ? "border-red-400"
              : "border-gray-300"
          } text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
      </div>

      {/* Add Vendor Button */}
      {selectedOperation === "Delete Vendor" ? (
        <button
          onClick={handleVendorAction}
          className="bg-red-600 text-white text-lg px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
        >
          🗑 Delete Vendor
        </button>
      ) : (
        <button
          onClick={handleVendorAction}
          className="bg-gradient-to-r from-green-500 to-indigo-600 text-white text-lg px-6 py-3 rounded-lg font-semibold hover:brightness-90 transition flex items-center justify-center gap-2"
        >
          <span>+</span>{" "}
          {selectedOperation === "Update Vendor"
            ? "Update Vendor"
            : "Add Vendor"}
        </button>
      )}
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
                  {row.Name || row.fieldname}
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
