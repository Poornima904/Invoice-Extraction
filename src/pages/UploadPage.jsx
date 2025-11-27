import React, { useState, useCallback, useEffect } from "react";
import { FiEye, FiDownload, FiTrash2 } from "react-icons/fi";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Typography from "@mui/material/Typography";

export default function UploadPage({
  setActivePage,
  uploads,
  setUploads,
  setSelectedInvoice,
}) {
  const [highlightIds, setHighlightIds] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [country, setCountry] = useState("India");
  const [vendor, setVendor] = useState("USA default");
  const [uploadComplete, setUploadComplete] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    open: false,
    type: "success", // or "error"
    title: "",
    message: "",
  });



  const fetchVendors = async (selectedCountry) => {
    debugger;
    setLoadingVendors(true);
    try {
      const response = await fetch(
        "https://hczbk50t-5000.inc1.devtunnels.ms/vendor/all",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: selectedCountry,
            active: true,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to fetch vendors");

      const data = await response.json();
      const vendorNames = (data.vendors || []).map((v) => v);
      // if (selectedCountry === "USA") {
      //   const vendorNames = "USA v1";
      //   setVendors(vendorNames);
      //   return;
      // }
      // const vendorNames = "IN v1";
      setVendors(vendorNames);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      setVendors([]);
    } finally {
      setLoadingVendors(false);
    }
  };

  useEffect(() => {
    if (country) {
      fetchVendors(country);
      setVendor("");
    }
  }, [country]);

  const fetchInvoices = async () => {
    debugger;
    try {
      const response = await fetch(
        "https://hczbk50t-5000.inc1.devtunnels.ms/invoice",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const text = await response.text(); // safer to read text only once
        throw new Error(`Network response was not ok: ${text}`);
      }

      const data = await response.json(); // ✅ read body once

      const mappedData = (data || []).map((item) => {
        let headers = {};
        try {
          headers = item.Headers ? JSON.parse(item.Headers) : {};
        } catch {
          headers = {};
        }

        return {
          id: item.Id || "--",
          fileName: item.PdfFileName || "—",
          uploadDate: item.CreatedAt ? item.CreatedAt.slice(0, 10) : "—",
          vendor: item.Vendor,
          amount: (() => {
            if (item.Country === "India") {
              return headers.Total_Amount
                ? `₹${Number(headers.Total_Amount).toLocaleString("en-IN")}`
                : "—";
            } else if (item.Country === "USA") {
              return headers.Total_Invoice_Amount
                ? `$${Number(headers.Total_Invoice_Amount).toLocaleString(
                    "en-US"
                  )}`
                : "—";
            } else {
              return "—";
            }
          })(),

          status: item.Status || "—",
          fileUrl: item.PdfBlobUrl || "#",
          invoiceNumber: item.Id || "—",
          country: item.Country || "—",
        };
      });

      setUploads(mappedData);

      const today = new Date().toISOString().slice(0, 10);
      const highlightToday = mappedData
        .filter((f) => f.uploadDate === today)
        .map((f) => f.id);

      setHighlightIds(highlightToday);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
    const interval = setInterval(fetchInvoices, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (uploads.length > 0)
      localStorage.setItem("uploads", JSON.stringify(uploads));
  }, [uploads]);

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
    setSelectedFiles((prev) => [
      ...prev,
      ...pdfFiles.filter((f) => !prev.find((x) => x.name === f.name)),
    ]);
  }, []);

const handleDownload = (upload) => {
  try {
    if (!upload?.fileUrl) {
      alert("No file available to download.");
      return;
    }
    const link = document.createElement("a");
    link.href = upload.fileUrl; // Direct SAS URL
    link.download = upload.fileName || "downloaded_file.pdf";
    link.target = "_blank"; // optional: opens in new tab for safety
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("❌ Download failed:", error);
  }
};


  const handleView = (upload) => {
    setSelectedInvoice(upload.invoiceNumber);
    if (["Needs Review", "Processed"].includes(upload.status))
      setActivePage("Review");
    else if (["Processing", "Failed"].includes(upload.status))
      setActivePage("Processing");
    else setActivePage("Dashboard");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleChooseFile = (e) => {
    handleFiles(e.target.files);
    e.target.value = "";
  };
  const deleteFile = (name) =>
    setSelectedFiles((prev) => prev.filter((f) => f.name !== name));

  const handleUploadFile = async () => {
    debugger;
    if (!selectedFiles.length) return;
    setIsUploading(true);
    try {
      for (const file of selectedFiles) {
        const formdata = new FormData();
        formdata.append("pdf", file, file.name);
        formdata.append("country", country);
        formdata.append("vendor", vendor);
        formdata.append("save_metadata", "true");
        const response = await fetch(
          "https://hczbk50t-5000.inc1.devtunnels.ms/invoice",
          { method: "POST", body: formdata }
        );
        if (!response.ok) throw new Error(await response.text());
      }
      setDialogInfo({
        open: true,
        type: "success",
        title: "Upload Successful",
        message: "File(s) uploaded successfully!",
      });

      fetchInvoices();
      setSelectedFiles([]);
      setUploadComplete(true);
    } catch (error) {
      setDialogInfo({
        open: true,
        type: "error",
        title: "Upload Failed",
        message:
          "Something went wrong while uploading your file(s). Please try again.",
      });
      console.error("❌ Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const humanFileSize = (size) => {
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
    return (size / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="max-w-9xl mx-auto p-4 sm:p-6 font-sans">
      {/* === UPLOAD BOX === */}
      <div
        className="border-2 border-dashed rounded-xl bg-[#E9FFF6] p-6 sm:p-10 flex flex-col items-center transition"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ borderColor: "#47D8E0" }}
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-gradient-to-tr from-[#7C6BFA] to-[#47D8E0] rounded-full shadow-lg mb-4">
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8"
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
        <div className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 text-center">
          Drop your PDF invoices here
        </div>
        <div className="text-gray-500 text-sm mb-4 text-center">
          or click below to browse and select files
        </div>
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
          className="px-5 sm:px-7 py-2 sm:py-3 rounded bg-gradient-to-tr from-[#6E98FF] to-[#47D8E0] text-white font-semibold shadow cursor-pointer hover:from-[#6951E6] hover:to-[#2DBFCB] text-sm sm:text-base"
        >
          Choose Files
        </label>
        <div className="text-xs text-gray-400 mt-3 sm:mt-4 text-center">
          Supports batch upload • PDF files only • Max 50MB per file
        </div>
      </div>

      {/* === FILE PREVIEW & UPLOAD SECTION === */}
      {selectedFiles.length > 0 && !isUploading && !uploadComplete && (
        <div className="mt-6">
          <div className="mb-4 font-semibold text-gray-700 text-sm sm:text-base">
            Ready to Upload ({selectedFiles.length} file
            {selectedFiles.length > 1 ? "s" : ""}):
          </div>
          <div className="space-y-3 mb-6">
            {selectedFiles.map((file) => (
              <div
                key={file.name}
                className="flex flex-col sm:flex-row sm:items-center bg-white border rounded-lg px-4 py-3 shadow justify-between gap-3"
              >
                <div className="flex items-center gap-3 w-full sm:w-3/4 truncate">
                  <span className="bg-green-100 text-green-700 rounded-full p-2">
                    📄
                  </span>
                  <div className="flex flex-col truncate">
                    <span className="font-medium text-gray-800 truncate text-sm sm:text-base">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {humanFileSize(file.size)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteFile(file.name)}
                  className="text-gray-400 hover:text-red-600 transition-colors p-2 self-end sm:self-auto"
                  aria-label="Delete"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm sm:text-base"
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
              </select>
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vendor
              </label>
              <select
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                disabled={loadingVendors || vendors.length === 0}
                className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm sm:text-base"
              >
                <option value="" disabled>
                  {loadingVendors ? "Loading..." : "Select Vendor"}
                </option>
                {vendors.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
                {/* <option key={vendors} value={vendors}>
                  {vendors}
                </option> */}
              </select>
            </div>
          </div>

          <button
            onClick={handleUploadFile}
            disabled={isUploading}
            className="w-full py-3 rounded-lg text-base sm:text-lg font-semibold bg-gradient-to-r from-[#53DEBA] to-[#7C6BFA] text-white shadow-md hover:from-[#47D8E0] hover:to-[#6951E6]"
          >
            Upload {selectedFiles.length} File
            {selectedFiles.length > 1 ? "s" : ""}
          </button>
        </div>
      )}

      {isUploading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white px-6 py-4 rounded shadow text-base sm:text-lg font-semibold text-gray-800">
            Uploading file(s), please wait...
          </div>
        </div>
      )}

      {/* === RECENT UPLOADS === */}
      <div className="bg-white rounded-xl shadow p-4 mt-7 overflow-x-auto">
        <h3 className="text-base sm:text-lg font-semibold mb-3">
          Recent Uploads
        </h3>
        {uploads.length === 0 ? (
          <p className="text-center text-gray-400">No uploads yet.</p>
        ) : (
          <table className="w-full min-w-[600px] text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100">
                {[
                  "File Name",
                  "Upload Date",
                  "Vendor",
                  "Amount",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-2 py-2 text-left font-semibold text-gray-700 whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload, idx) => {
                const highlight = highlightIds.includes(upload.id);
                return (
                  <tr
                    key={upload.id}
                    className={`transition-colors ${
                      highlight
                        ? "bg-green-50 border-l-4 border-green-400"
                        : idx % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50"
                    }`}
                  >
                    <td className="px-2 py-2 truncate">{upload.fileName}</td>
                    <td className="px-2 py-2">{upload.uploadDate}</td>
                    <td className="px-2 py-2">{upload.vendor}</td>

                    <td className="px-2 py-2">
                      {upload.amount
                        ? (() => {
                            const numericValue = parseFloat(
                              String(upload.amount).replace(/[^0-9.-]+/g, "")
                            );

                            if (isNaN(numericValue)) return "—"; // invalid or empty number

                            // Format based on country
                            if (upload.country === "USA") {
                              return `$${numericValue.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}`;
                            } else if (upload.country === "India") {
                              return `₹${numericValue.toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}`;
                            } else {
                              // Default formatting if no country matches
                              return `${numericValue.toLocaleString()} ${
                                country || ""
                              }`;
                            }
                          })()
                        : "NA"}
                    </td>

                    {/* <td className="px-2 py-2">
  {upload.amount
    ? (() => {
        // Clean and extract the numeric part
        const numericValue = parseFloat(
          String(upload.amount).replace(/[^0-9.-]+/g, "")
        );

        if (isNaN(numericValue)) return "—"; // invalid number
        `$${numericValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

        // return country === "USA" ?
          // ? `$${numericValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          // : country === "India"
          // ?
          //  `₹${numericValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          // :
          //  `${numericValue.toLocaleString()} ${country || ""}`;
      })()
    : "—"}
</td> */}

                    <td className="px-2 py-2">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          upload.status === "Processed"
                            ? "bg-green-100 text-green-800"
                            : upload.status === "Needs Review"
                            ? "bg-yellow-100 text-yellow-800"
                            : upload.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {upload.status}
                      </span>
                    </td>
                    <td className="px-2 py-2 flex gap-2 justify-center">
                      <button
                        onClick={() => handleView(upload)}
                        className="p-1 border border-gray-300 rounded hover:bg-indigo-100"
                        title="View"
                      >
                        <FiEye size={16} />
                      </button>
                      <button
                        onClick={() => handleDownload(upload)}
                        className="p-1 border border-gray-300 rounded hover:bg-indigo-100"
                        title="Download"
                      >
                        <FiDownload size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <Dialog
        open={dialogInfo.open}
        keepMounted
        onClose={() => setDialogInfo({ ...dialogInfo, open: false })}
        aria-labelledby="upload-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: "18px",
            padding: "12px 18px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            textAlign: "center",
            position: "absolute",
            top: "15%",
            m: "auto",
            minWidth: "340px",
          },
        }}
      >
        <DialogTitle
          id="upload-dialog-title"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            fontSize: "1.25rem",
            fontWeight: 600,
            color: dialogInfo.type === "success" ? "#2e7d32" : "#d32f2f",
          }}
        >
          {dialogInfo.type === "success" ? (
            <CheckCircleOutlineIcon
              color="success"
              sx={{ fontSize: 34, verticalAlign: "middle" }}
            />
          ) : (
            <span style={{ fontSize: 30 }}>❌</span>
          )}
          {dialogInfo.title}
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ fontSize: "0.95rem", color: "#444", mt: 1 }}>
            {dialogInfo.message}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={() => setDialogInfo({ ...dialogInfo, open: false })}
            variant="contained"
            sx={{
              px: 4,
              borderRadius: "10px",
              fontWeight: 600,
              textTransform: "none",
              background:
                dialogInfo.type === "success"
                  ? "linear-gradient(90deg, #53DEBA, #7C6BFA)"
                  : "linear-gradient(90deg, #FF6B6B, #E63946)",
              "&:hover": {
                background:
                  dialogInfo.type === "success"
                    ? "linear-gradient(90deg, #47D8E0, #6951E6)"
                    : "linear-gradient(90deg, #FF4C4C, #C53030)",
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
