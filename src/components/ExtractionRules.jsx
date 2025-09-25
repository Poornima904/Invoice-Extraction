import React from "react";

const ExtractionRules = () => {
  const fields = [
    { label: "Invoice Number", pdf: "Invoice #", required: true },
    { label: "Date", pdf: "Invoice Date", required: true },
    { label: "Vendor", pdf: "From", required: true },
    { label: "Total Amount", pdf: "Total", required: true },
    { label: "PO Number", pdf: "Purchase Order", required: false },
    { label: "Tax Amount", pdf: "Tax", required: false },
  ];

  return (
    <>
      {/* Field Mapping Card */}
      <div className="bg-white rounded-md p-5 shadow mt-5">
        <h3 className="m-0 mb-5 text-lg font-semibold">Field Mapping</h3>
        <p className="text-gray-500 text-sm mb-3">
          Map system fields to PDF labels for better extraction accuracy.
        </p>

        <div className="space-y-4">
          {fields.map((field, idx) => (
            <div
              key={idx}
              className="flex items-center bg-white rounded-lg p-3 border border-gray-300 shadow-sm"
            >
              <div className="flex items-center gap-2 w-[220px] font-semibold text-gray-800">
                {field.label}
                {field.required && (
                  <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                    Required
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 flex-1">
                <span className="text-gray-500">↔</span>
                <input
                  type="text"
                  value={field.pdf}
                  className="flex-0 w-[250px] p-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
                />
                <label className="relative inline-block w-11 h-6">
                  <input
                    type="checkbox"
                    defaultChecked={field.required}
                    className="opacity-0 w-0 h-0"
                  />
                  <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition-all before:absolute before:content-[''] before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all checked:bg-green-500 checked:before:translate-x-5"></span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Regex Rules Card */}
      <div className="bg-white rounded-md p-5 shadow mt-5">
        <h3 className="m-0 mb-5 text-lg font-semibold">Custom Regex Rules</h3>
        <table className="w-full border-separate border-spacing-0 mb-3">
          <thead>
            <tr>
              <th className="text-left font-semibold px-3 py-2 text-sm text-gray-800">
                Field Name
              </th>
              <th className="text-left font-semibold px-3 py-2 text-sm text-gray-800">
                Regex Pattern
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2">
                <input
                  type="text"
                  placeholder="e.g., Reference Number"
                  className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
                />
              </td>
              <td className="px-3 py-2">
                <input
                  type="text"
                  placeholder="e.g., REF-\\d{4}-\\d{4}"
                  className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button className="w-full flex justify-center items-center px-3 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition text-sm">
          Add Custom Rule
        </button>
      </div>
    </>
  );
};

export default ExtractionRules;
