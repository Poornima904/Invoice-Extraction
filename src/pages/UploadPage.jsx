import React, { useState, useCallback } from "react";

export default function UploadPage({ setActivePage }) {
  const [uploads, setUploads] = useState([
    { id: 1, fileName: "invoice_124876.pdf", uploadDate: "2024-01-15", vendor: "Microsoft Corporation", amount: "USD 24,850", status: "Processed", file: null },
    { id: 2, fileName: "purchase_order_3321.pdf", uploadDate: "2024-02-12", vendor: "Amazon Web Services", amount: "USD 13,200", status: "Needs Review", file: null },
    { id: 3, fileName: "vendor_invoice_998.pdf", uploadDate: "2024-02-20", vendor: "Apple Inc.", amount: "USD 8,750", status: "Processing", file: null },
    { id: 4, fileName: "invoice_march_2024.pdf", uploadDate: "2024-03-01", vendor: "Google LLC", amount: "USD 15,400", status: "Failed", file: null },
    { id: 5, fileName: "vendor_payment_212.pdf", uploadDate: "2024-03-15", vendor: "Netflix Inc.", amount: "USD 2,850", status: "Processed", file: null },
  ]);

  const handleFiles = useCallback(
    (files) => {
      const pdfFiles = Array.from(files).filter((file) => file.type === "application/pdf");
      if (!pdfFiles.length) return alert("Please upload PDF files only.");
      const newUploads = pdfFiles.map((file, idx) => ({
        id: Date.now() + idx,
        fileName: file.name,
        uploadDate: new Date().toISOString().slice(0, 10),
        vendor: "Unknown Vendor",
        amount: "USD 0",
        status: "Processing",
        file,
      }));
      setUploads(prev => [...newUploads, ...prev]);
    },
    []
  );

  const handleDrop = (e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); };
  const handleDragOver = (e) => e.preventDefault();
  const handleChooseFile = (e) => handleFiles(e.target.files);

  const handleDownload = (upload) => {
    if (!upload.file) return alert("No file available to download.");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(upload.file);
    link.download = upload.fileName;
    link.click();
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Processed": return "bg-green-100 text-green-800";
      case "Needs Review": return "bg-yellow-100 text-yellow-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      case "Failed": return "bg-red-100 text-red-700";
      default: return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="upload-page max-w-8xl mx-auto p-4 sm:p-6 space-y-6 font-sans ">

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">Upload Invoices</h3>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-10 text-center text-gray-500 cursor-pointer flex flex-col items-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 sm:w-12 sm:h-12 mb-2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m16-6l-5-5-5 5m5-5v16" />
          </svg>
          <p className="text-sm sm:text-base">Drag & drop PDF invoices here, or</p>
          <input type="file" id="fileInput" multiple accept="application/pdf" className="hidden" onChange={handleChooseFile} />
          <label htmlFor="fileInput" className="mt-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 font-semibold cursor-pointer hover:bg-gray-100 text-sm sm:text-base">
            Choose Files
          </label>
          <p className="text-xs sm:text-sm text-gray-400 mt-3">Supports batch upload • PDF files only</p>
        </div>
      </div>

      {/* Recent Uploads Section */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 space-y-4">
        <h3 className="text-lg font-semibold mb-2">Recent Uploads</h3>

        {uploads.length === 0 && (
          <p className="text-center text-gray-400">No uploads yet.</p>
        )}

        {/* Mobile Cards */}
        <div className="space-y-3 sm:hidden">
          {uploads.map(upload => (
            <div key={upload.id} className="bg-gray-50 p-3 rounded-lg shadow flex flex-col space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold truncate">{upload.fileName}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusStyle(upload.status)}`}>
                  {upload.status}
                </span>
              </div>
              <div className="text-sm text-gray-600 flex justify-between">
                <span>{upload.uploadDate}</span>
                <span>{upload.vendor}</span>
                <span>{upload.amount}</span>
              </div>
              <div className="flex gap-2 mt-1">
                <button
                  className="flex-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm"
                  onClick={() => {
                    if (upload.status === "Needs Review" || upload.status === "Processed") setActivePage("Review");
                    else if (upload.status === "Processing" || upload.status === "Failed") setActivePage("Processing");
                    else setActivePage("Dashboard");
                  }}
                >
                  View
                </button>
                <button
                  className="flex-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm"
                  onClick={() => handleDownload(upload)}
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full table-auto divide-y divide-gray-200 text-sm sm:text-base">
            <thead className="bg-gray-50">
              <tr>
                {["File Name", "Upload Date", "Vendor", "Amount", "Status", "Actions"].map(header => (
                  <th key={header} className="px-2 py-2 text-left font-semibold text-gray-700">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {uploads.map(upload => (
                <tr key={upload.id} className="hover:bg-gray-50">
                  <td className="px-2 py-2">{upload.fileName}</td>
                  <td className="px-2 py-2">{upload.uploadDate}</td>
                  <td className="px-2 py-2">{upload.vendor}</td>
                  <td className="px-2 py-2">{upload.amount}</td>
                  <td className="px-2 py-2">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(upload.status)}`}>
                      {upload.status}
                    </span>
                  </td>
                  <td className="px-2 py-2 flex gap-2">
                    <button
                      className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm"
                      onClick={() => {
                        if (upload.status === "Needs Review" || upload.status === "Processed") setActivePage("Review");
                        else if (upload.status === "Processing" || upload.status === "Failed") setActivePage("Processing");
                        else setActivePage("Dashboard");
                      }}
                    >
                      View
                    </button>
                    <button
                      className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm"
                      onClick={() => handleDownload(upload)}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
