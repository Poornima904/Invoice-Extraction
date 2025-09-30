import React, { useState, useCallback } from "react";
import { FiEye, FiDownload } from "react-icons/fi";

export default function UploadPage({ setActivePage }) {
  const [uploads, setUploads] = useState([
    { id: 1, fileName: "invoice_124876.pdf", uploadDate: "2024-01-15", vendor: "Microsoft Corporation", amount: "USD 24,850", status: "Processed", file: null },
    { id: 2, fileName: "purchase_order_3321.pdf", uploadDate: "2024-02-12", vendor: "Amazon Web Services", amount: "USD 13,200", status: "Needs Review", file: null },
    { id: 3, fileName: "vendor_invoice_998.pdf", uploadDate: "2024-02-20", vendor: "Apple Inc.", amount: "USD 8,750", status: "Processing", file: null },
    { id: 4, fileName: "invoice_march_2024.pdf", uploadDate: "2024-03-01", vendor: "Google LLC", amount: "USD 15,400", status: "Failed", file: null },
    { id: 5, fileName: "vendor_payment_212.pdf", uploadDate: "2024-03-15", vendor: "Netflix Inc.", amount: "USD 2,850", status: "Processed", file: null },
  ]);

  // --- Handle file uploads ---
  const handleFiles = useCallback((files) => {
    const pdfFiles = Array.from(files).filter((file) => {
      if (file.type !== "application/pdf") {
        alert(`${file.name} is not a PDF.`);
        return false;
      }
      if (file.size > 50 * 1024 * 1024) {
        alert(`${file.name} exceeds 50MB limit.`);
        return false;
      }
      return true;
    });

    if (!pdfFiles.length) return;

    const newUploads = pdfFiles.map((file, idx) => ({
      id: Date.now() + idx,
      fileName: file.name,
      uploadDate: new Date().toISOString().slice(0, 10),
      vendor: "",
      amount: "",
      status: "Processing",
      file,
    }));

    setUploads((prev) => [...newUploads, ...prev]);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleChooseFile = (e) => handleFiles(e.target.files);

  // --- File download ---
  const handleDownload = (upload) => {
    if (!upload.file) return alert("No file available to download.");
    const url = URL.createObjectURL(upload.file);
    const link = document.createElement("a");
    link.href = url;
    link.download = upload.fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  // --- Status styles ---
  const getStatusStyle = (status) => {
    switch (status) {
      case "Processed": return "bg-green-100 text-green-800";
      case "Needs Review": return "bg-yellow-100 text-yellow-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      case "Failed": return "bg-red-100 text-red-700";
      default: return "bg-gray-200 text-gray-700";
    }
  };

  // --- View navigation handler ---
  const handleView = (upload) => {
    if (upload.status === "Needs Review" || upload.status === "Processed") {
      setActivePage("Review");
    } else if (upload.status === "Processing" || upload.status === "Failed") {
      setActivePage("Processing");
    } else {
      setActivePage("Dashboard");
    }
  };

  return (
    <div className="upload-page max-w-8xl mx-auto p-4 sm:p-6 space-y-6 font-sans overflow-x-hidden">
      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">Upload Invoices</h3>
        <div
          role="button"
          tabIndex={0}
          className="border-2 border-dashed border-[#53DEBA] bg-[#EEFDF6] rounded-xl p-8 md:p-14 text-center flex flex-col items-center justify-center shadow transition hover:bg-[#d5fbe6] focus:outline-none focus:ring-2 focus:ring-blue-400"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {/* Icon */}
          <div className="mx-auto mb-4">
            <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-tr from-[#7C6BFA] to-[#47D8E0] rounded-full shadow-lg">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>
          </div>
          <div className="text-xl font-semibold text-[#333] mb-1">Drop your PDF invoices here</div>
          <div className="text-gray-500 text-sm mb-4">or click below to browse and select files</div>
          <input
            type="file"
            id="fileInput"
            multiple
            accept="application/pdf"
            className="hidden"
            onChange={handleChooseFile}
          />
          <label
            htmlFor="fileInput"
            className="inline-block px-8 py-2 rounded bg-gradient-to-tr from-[#7C6BFA] to-[#47D8E0] text-white font-semibold shadow cursor-pointer transition hover:from-[#6951E6] hover:to-[#2DBFCB]"
          >
            Choose Files
          </label>
          <div className="text-xs text-gray-400 mt-3">
            Supports batch upload • PDF files only • Max 50MB per file
          </div>
        </div>
      </div>

      {/* Recent Uploads Section */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 space-y-4 overflow-x-hidden">
        <h3 className="text-lg font-semibold mb-2">Recent Uploads</h3>

        {uploads.length === 0 && (
          <p className="text-center text-gray-400">No uploads yet.</p>
        )}

        {/* Mobile Cards */}
        <div className="space-y-3 sm:hidden">
          {uploads.map((upload) => (
            <div
              key={upload.id}
              className="bg-gray-50 p-3 rounded-lg shadow flex flex-col space-y-1 transition hover:shadow-md hover:bg-indigo-50 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold truncate">{upload.fileName}</span>
                <span
                  className={`px-2 py-0.5 text-xs rounded-full transition-colors duration-300 ${getStatusStyle(upload.status)}`}
                >
                  {upload.status}
                </span>
              </div>
              <div className="text-sm text-gray-600 flex flex-wrap justify-between gap-x-2">
                <span>{upload.uploadDate}</span>
                <span>{upload.vendor || "—"}</span>
                <span>{upload.amount || "—"}</span>
              </div>
              <div className="flex gap-2 mt-1">
                <button
                  className="flex-1 px-3 py-1 border border-gray-300 rounded hover:bg-indigo-100 text-sm transition flex items-center justify-center gap-1"
                  onClick={() => handleView(upload)}
                  title="View"
                >
                  <FiEye size={16} />
                  View
                </button>
                <button
                  className="flex-1 px-3 py-1 border border-gray-300 rounded hover:bg-indigo-100 text-sm transition flex items-center justify-center gap-1"
                  onClick={() => handleDownload(upload)}
                  title="Download"
                >
                  <FiDownload size={16} />
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
                {["File Name", "Upload Date", "Vendor", "Amount", "Status", "Actions"].map((header) => (
                  <th key={header} className="px-2 py-2 text-left font-semibold text-gray-700 whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {uploads.map((upload) => (
                <tr
                  key={upload.id}
                  className="hover:bg-indigo-50 transition-colors duration-300 cursor-pointer"
                >
                  <td className="px-2 py-2">{upload.fileName}</td>
                  <td className="px-2 py-2">{upload.uploadDate}</td>
                  <td className="px-2 py-2">{upload.vendor || "—"}</td>
                  <td className="px-2 py-2">{upload.amount || "—"}</td>
                  <td className="px-2 py-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full transition-colors duration-300 ${getStatusStyle(upload.status)}`}
                    >
                      {upload.status}
                    </span>
                  </td>
                  <td className="px-2 py-2 flex gap-2 justify-center">
                    <button
                      className="p-1 border border-gray-300 rounded hover:bg-indigo-100 text-gray-700 transition flex items-center justify-center"
                      onClick={() => handleView(upload)}
                      aria-label="View"
                      title="View"
                    >
                      <FiEye size={18} />
                    </button>
                    <button
                      className="p-1 border border-gray-300 rounded hover:bg-indigo-100 text-gray-700 transition flex items-center justify-center"
                      onClick={() => handleDownload(upload)}
                      aria-label="Download"
                      title="Download"
                    >
                      <FiDownload size={18} />
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
