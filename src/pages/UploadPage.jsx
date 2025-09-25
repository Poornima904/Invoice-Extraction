import React, { useState, useCallback } from "react";
import "./UploadPage.css";

const styles = {
  container: {
    maxWidth: 900,
    margin: "20px auto",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
 card: {
  border: "1px solid #ccc",
  borderRadius: 8,
  padding: 16,
  marginBottom: 24,
  backgroundColor: "#fff",
},
  uploadBox: {
    border: "2px dashed #ccc",
    borderRadius: 8,
    padding: "30px 15px",
    textAlign: "center",
    color: "#555",
    cursor: "pointer",
  },
  uploadIcon: { fontSize: 28, marginBottom: 8 },
  chooseFileButton: {
    marginTop: 10,
    padding: "8px 16px",
    border: "1px solid #e5e7eb", // Softer, subtle border
    borderRadius: 6, // Smooth, modern rounded edges
    backgroundColor: "#ffffff", // Standard white background
    color: "#111827", // Dark, professional text color
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600, // Slightly bold for visibility
    transition: "all 0.2s ease",
  },

  smallText: { color: "#999", marginTop: 15, fontSize: 14 },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    padding: "10px 8px",
    fontWeight: 600,
    fontSize: 13,
  },
  td: {
    padding: "10px 8px",
    fontSize: 13,
    borderBottom: "1px solid #eee",
    color: "#333",
    verticalAlign: "middle",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    borderRadius: 16,
    fontWeight: 600,
    fontSize: 11,
    gap: "5px",
  },
  actionContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
  },
  actionButton: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    cursor: "pointer",
    padding: "6px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "34px",
    height: "34px",
    transition: "all 0.2s ease",
  },
  fileIcon: { marginRight: 5, color: "#888", fontSize: 13 },
};

// Helper to format date
function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

// Get dynamic status style
function getStatusStyle(status) {
  switch (status) {
    case "Processed":
      return {
        backgroundColor: "#d1fae5",
        color: "#065f46",
        icon: "✔️",
      };
    case "Needs Review":
      return {
        backgroundColor: "#fef3c7", // Light yellow
        color: "#92400e", // Brown text
        icon: "⚠️", // Warning icon
      };
    case "Processing":
      return {
        backgroundColor: "#e0f2fe",
        color: "#0369a1",
        icon: "🔄",
      };
    case "Failed":
      return {
        backgroundColor: "#fee2e2",
        color: "#b91c1c",
        icon: "❌",
      };
    default:
      return {
        backgroundColor: "#e5e7eb",
        color: "#374151",
        icon: "❔",
      };
  }
}

export default function UploadPage({ setActivePage }) {
  //   const navigate = useNavigate();

  /** Navigate to view screen */
  //   const handleVieww = (upload) => {
  //     navigate(`/invoice/${upload.id}`, { state: { file: upload } });
  //   };
  const [uploads, setUploads] = useState([
    {
      id: 1,
      fileName: "invoice_124876.pdf",
      uploadDate: "2024-01-15",
      vendor: "Microsoft Corporation",
      amount: "USD 24,850",
      status: "Processed",
      file: null,
    },
    {
      id: 2,
      fileName: "purchase_order_3321.pdf",
      uploadDate: "2024-02-12",
      vendor: "Amazon Web Services",
      amount: "USD 13,200",
      status: "Needs Review",
      file: null,
    },
    {
      id: 3,
      fileName: "vendor_invoice_998.pdf",
      uploadDate: "2024-02-20",
      vendor: "Apple Inc.",
      amount: "USD 8,750",
      status: "Processing",
      file: null,
    },
    {
      id: 4,
      fileName: "invoice_march_2024.pdf",
      uploadDate: "2024-03-01",
      vendor: "Google LLC",
      amount: "USD 15,400",
      status: "Failed",
      file: null,
    },
    {
      id: 5,
      fileName: "vendor_payment_212.pdf",
      uploadDate: "2024-03-15",
      vendor: "Netflix Inc.",
      amount: "USD 2,850",
      status: "Processed",
      file: null,
    },
  ]);

  /** Handles file uploads */
  const handleFiles = useCallback(
    (files) => {
      const pdfFiles = Array.from(files).filter(
        (file) => file.type === "application/pdf"
      );
      if (pdfFiles.length === 0) {
        alert("Please upload PDF files only.");
        return;
      }

      const newUploads = pdfFiles.map((file, index) => ({
        id: Date.now() + index,
        fileName: file.name,
        uploadDate: formatDate(new Date()),
        vendor: "Unknown Vendor",
        amount: "USD 0",
        status: "Processing", // default status for new uploads
        file,
      }));

      setUploads((prev) => [...newUploads, ...prev]);
    },
    [setUploads]
  );

  /** Drag & Drop Handlers */
  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => e.preventDefault();

  /** File Input Handler */
  const handleChooseFile = (e) => {
    handleFiles(e.target.files);
  };

  /** View PDF in a new tab */
  const handleView = (upload) => {
    if (!upload.file) {
      alert("No file available to preview.");
      return;
    }
    const fileURL = URL.createObjectURL(upload.file);
    window.open(fileURL, "_blank");
  };

  /** Download PDF */
  const handleDownload = (upload) => {
    if (!upload.file) {
      alert("No file available to download.");
      return;
    }
    const link = document.createElement("a");
    link.href = URL.createObjectURL(upload.file);
    link.download = upload.fileName;
    link.click();
  };

  return (
    <div className="upload-page">
      <div style={styles.container}>
        {/* Upload Section */}
        <div style={styles.card}>
          <h3 style={{ marginBottom: 14, fontWeight: 600, fontSize: 15 }}>
            Upload Invoices
          </h3>
          <div
            style={styles.uploadBox}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div style={styles.uploadIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="none"
                stroke="#6B7280" // Gray color
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 5 17 10"></polyline>
                <line x1="12" y1="5" x2="12" y2="15"></line>
              </svg>
            </div>
            <p style={{ fontSize: 14 }}>Drag & drop PDF invoices here, or</p>
            <input
              type="file"
              id="fileInput"
              multiple
              accept="application/pdf"
              style={{ display: "none" }}
              onChange={handleChooseFile}
            />
            <label htmlFor="fileInput" style={styles.chooseFileButton}>
              Choose Files
            </label>
            <p style={styles.smallText}>
              Supports batch upload • PDF files only
            </p>
          </div>
        </div>

        {/* Recent Uploads Section */}
        <div style={styles.card}>
          <h3 style={{ marginBottom: 14, fontWeight: 600, fontSize: 15 }}>
            Recent Uploads
          </h3>
          <table style={styles.table}>
            <thead>
              <tr>
                {[
                  "File Name",
                  "Upload Date",
                  "Vendor",
                  "Amount",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th key={header} style={styles.th}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload) => {
                const statusStyle = getStatusStyle(upload.status);
                return (
                  <tr key={upload.id}>
                    <td style={styles.td}>
                      <span style={styles.fileIcon}>📄</span>
                      {upload.fileName}
                    </td>
                    <td style={styles.td}>{upload.uploadDate}</td>
                    <td style={styles.td}>{upload.vendor}</td>
                    <td style={styles.td}>{upload.amount}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          backgroundColor: statusStyle.backgroundColor,
                          color: statusStyle.color,
                        }}
                      >
                        {statusStyle.icon} {upload.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionContainer}>
                        {/* View Button */}
                        <button
                          style={styles.actionButton}
                          title="View"
                          // onClick={() => handleVieww(upload)}
                          onClick={() => {
                            if (
                              upload.status === "Needs Review" ||
                              upload.status === "Processed"
                            ) {
                              setActivePage("Review");
                            } else if (
                              upload.status === "Processing" ||
                              upload.status === "Failed"
                            ) {
                              setActivePage("Processing");
                            } else {
                              setActivePage("Dashboard"); // or default fallback
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>

                        {/* Download Button */}
                        <button
                          style={styles.actionButton}
                          title="Download"
                          onClick={() => handleDownload(upload)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* Empty State */}
              {uploads.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: 16, color: "#999" }}
                  >
                    No uploads yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
