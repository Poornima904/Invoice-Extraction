import React, { useState, useEffect, useMemo, useRef } from "react";
import { pdfjs } from "react-pdf";
import {
  ClockIcon,
  BoltIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Utility to extract filename from URL (kept for completeness)
function extractFilename(url) {
  if (!url) return "";
  const parts = url.split("/");
  let filename = parts[parts.length - 1].split("?")[0];
  return filename;
}

// EditableField, EditableLineItemRow, and InfoSection components are unchanged
// as their core logic is fine, but they are included below for a complete, runnable example.

// --- Start of Unchanged Components (for context) ---

function EditableField({ label, value, confidence, percent, color, editable, externalLink, isEditing, onStartEdit, onSave, onCancel }) {
  const [hovered, setHovered] = useState(false);
  const [draftValue, setDraftValue] = useState(value);

  useEffect(() => {
    if (isEditing) setDraftValue(value);
  }, [isEditing, value]);

  if (isEditing) {
    return (
      <div className="my-4 rounded-xl border-2 border-teal-300 bg-blue-50 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-gray-700 text-base">{label}</span>
          <span className={`rounded px-2 py-1 text-xs font-bold ${color}`}>
            {confidence} ({percent}%)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="flex-1 p-2 border-2 border-teal-400 rounded-lg focus:outline-none focus:border-blue-400"
            value={draftValue}
            onChange={(e) => setDraftValue(e.target.value)}
            autoFocus
          />
          <button className="p-1 rounded border border-green-300 hover:bg-green-100" aria-label="Confirm" onClick={() => onSave(draftValue)}>
            <CheckIcon className="w-6 h-6 text-green-600" />
          </button>
          <button className="p-1 rounded border border-gray-300 hover:bg-gray-100" aria-label="Cancel" onClick={onCancel}>
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`my-4 rounded-xl border px-4 py-3 flex flex-col transition ${
        hovered ? "bg-blue-50 border-teal-200" : "border-transparent bg-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-700 text-base">{label}</span>
        <span className={`rounded px-2 py-1 text-xs font-bold ${color}`}>
          {confidence} ({percent}%)
        </span>
        {editable && hovered && (
          <button className="ml-auto p-1 rounded hover:bg-blue-100" aria-label={`Edit ${label}`} onClick={onStartEdit}>
            <PencilIcon className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>
      <div className="text-gray-800 text-base mt-1">{value}</div>
    </div>
  );
}

function EditableLineItemRow({ line, isEditing, onStartEdit, onSave, onCancel }) {
  const [hovered, setHovered] = useState(false);
  const [draftValues, setDraftValues] = useState({
    desc: line.desc,
    qty: line.qty,
    unit: line.unit,
    amount: line.amount,
  });

  useEffect(() => {
    if (isEditing)
      setDraftValues({
        desc: line.desc,
        qty: line.qty,
        unit: line.unit,
        amount: line.amount,
      });
  }, [isEditing, line]);

  const setDraftField = (field, val) => setDraftValues((prev) => ({ ...prev, [field]: val }));

  if (isEditing) {
    return (
      <tr className="bg-blue-50 border border-teal-300">
        <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
          <input
            value={draftValues.desc}
            onChange={(e) => setDraftField("desc", e.target.value)}
            className="w-full border rounded p-1 text-sm"
          />
        </td>
        <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
          <input
            value={draftValues.qty}
            onChange={(e) => setDraftField("qty", e.target.value)}
            className="w-full border rounded p-1 text-sm"
            type="number"
            min="0"
          />
        </td>
        <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
          <input
            value={draftValues.unit}
            onChange={(e) => setDraftField("unit", e.target.value)}
            className="w-full border rounded p-1 text-sm"
          />
        </td>
        <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
          <input
            value={draftValues.amount}
            onChange={(e) => setDraftField("amount", e.target.value)}
            className="w-full border rounded p-1 text-sm"
          />
        </td>
        <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
          <button
            aria-label="Confirm"
            className="mr-2 p-1 rounded bg-green-100 hover:bg-green-200"
            onClick={() => onSave(line.key, { ...line, ...draftValues })}
          >
            <CheckIcon className="w-5 h-5 text-green-700" />
          </button>
          <button aria-label="Cancel" className="p-1 rounded bg-gray-100 hover:bg-gray-200" onClick={onCancel}>
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </td>
      </tr>
    );
  }

  return (
    <tr
      className="hover:bg-gray-50 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{line.desc}</td>
      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{line.qty?.toLocaleString?.() || line.qty}</td>
      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{line.unit}</td>
      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium">{line.amount}</td>
      <td className="px-3 sm:px-4 py-2 relative">
        <span className={`rounded-full py-1 px-2 text-xs font-bold ${line.color}`}>{line.confidence}</span>
        {hovered && (
          <button className="absolute top-1 right-1 p-1 rounded hover:bg-blue-100" aria-label={`Edit line ${line.desc}`} onClick={onStartEdit}>
            <PencilIcon className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </td>
    </tr>
  );
}

const InfoSection = ({
  title,
  data,
  bgColor,
  borderColor,
  iconColor,
  editable,
  isLineItems = false,
}) => {
  const [fieldsOrLines, setFieldsOrLines] = useState(data);
  const [editingKey, setEditingKey] = useState(null);

  const startEdit = (key) => setEditingKey(key);
  const cancelEdit = () => setEditingKey(null);

  const saveEdit = (key, newValue) => {
    setFieldsOrLines(fieldsOrLines.map((item) => (item.key === key ? { ...item, value: newValue } : item)));
    setEditingKey(null);
  };

  const saveLineEdit = (key, newLine) => {
    setFieldsOrLines(fieldsOrLines.map((item) => (item.key === key ? newLine : item)));
    setEditingKey(null);
  };

  useEffect(() => {
    setFieldsOrLines(data);
  }, [data]);

  if (isLineItems) {
    return (
      <section>
        <div className={`${bgColor} ${borderColor} rounded-t-xl px-4 sm:px-5 py-3 border-l-4 flex items-center gap-2 text-sm sm:text-base font-semibold`}>
          <BoltIcon className={`w-5 h-5 ${iconColor}`} />
          {title}
        </div>
        <div className="bg-white rounded-b-xl p-3 sm:p-5 lg:p-7 shadow border-l-4 border-blue-100 overflow-x-auto">
          <table className="min-w-[600px] w-full border divide-y divide-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 text-xs sm:text-sm">Description</th>
                <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 text-xs sm:text-sm">Qty</th>
                <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 text-xs sm:text-sm">Unit Price</th>
                <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 text-xs sm:text-sm">Amount</th>
                <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 text-xs sm:text-sm">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {fieldsOrLines.map((line) => (
                <EditableLineItemRow
                  key={line.key}
                  line={line}
                  editable={editable}
                  isEditing={editingKey === line.key}
                  onStartEdit={() => startEdit(line.key)}
                  onSave={saveLineEdit}
                  onCancel={cancelEdit}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className={`${bgColor} ${borderColor} rounded-t-xl px-4 sm:px-5 py-3 border-l-4 flex items-center gap-2 text-sm sm:text-base font-semibold`}>
        <BoltIcon className={`w-5 h-5 ${iconColor}`} />
        {title}
      </div>
      <div className="bg-white rounded-b-xl p-4 sm:p-7 shadow border-l-4 border-gray-100 flex flex-col">
        {fieldsOrLines.map((field) => (
          <EditableField
            key={field.key}
            label={field.label}
            value={field.value}
            confidence={field.confidence}
            percent={field.percent}
            color={field.color}
            editable={editable && field.editable}
            externalLink={field.externalLink}
            isEditing={editingKey === field.key}
            onStartEdit={() => startEdit(field.key)}
            onSave={(val) => saveEdit(field.key, val)}
            onCancel={cancelEdit}
          />
        ))}
      </div>
    </section>
  );
};
// --- End of Unchanged Components ---

export default function ReviewPage({ setActivePage, uploads, invoiceNumber, recentPdfUrl }) {
  const [zoom, setZoom] = useState(100);
  const [recentPdf, setRecentPdf] = useState(null);
  const [invoicePdf, setInvoicePdf] = useState(null);
  const pdfContainerRef = useRef(null);

  const [headerInfo, setHeaderInfo] = useState([]);
  const [supplierInfo, setSupplierInfo] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [totalsSummary, setTotalsSummary] = useState([]);
  const [pdfFileName, setPdfFileName] = useState("");

  // Zoom functionality (unchanged)
  const handleZoomIn = () => {
    setZoom(prev => {
      const newZoom = Math.min(prev + 25, 200);
      return newZoom;
    });
  };

  const handleZoomOut = () => {
    setZoom(prev => {
      const newZoom = Math.max(prev - 25, 50);
      return newZoom;
    });
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  // Data fetching logic (unchanged)
  useEffect(() => {
    if (!invoiceNumber) return;

    const fetchInvoiceDetails = async () => {
      try {
        // NOTE: The Authorization header contains a token that is likely expired or invalid outside of a real session.
        // It's kept here to match the provided code structure but won't work in isolation.
        const res = await fetch(`http://192.168.0.102:5050/api/invoices1/${invoiceNumber}`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTM1OWQ0YzMxODI0NDIwODcwZDExMSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc2MDI5NTk3MSwiZXhwIjoxNzYwMzgyMzcxfQ.hFKT12Eh6D8x-u-2ncAB4MFDBRcZZK1UcfY7zmFGoK8",
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        const invoiceData = data.newInvoice || data.invoice;
        if (!invoiceData) return;

        if (invoiceData.pdf_blob_url) {
          setInvoicePdf(invoiceData.pdf_blob_url);
          setPdfFileName(extractFilename(invoiceData.pdf_blob_url));
        }

        // Header Info
        const headers = invoiceData.headers || {};
        setHeaderInfo([
          { key: "invoice_number", label: "Invoice Number", value: headers.Invoice_Number || "", confidence: "High", percent: 90, color: "bg-green-100 text-green-800", editable: true, externalLink: false },
          { key: "invoice_date", label: "Invoice Date", value: headers.Invoice_Date ? new Date(headers.Invoice_Date).toLocaleDateString() : "", confidence: "High", percent: 90, color: "bg-green-100 text-green-800", editable: true, externalLink: false },
          { key: "po_number", label: "PO Number", value: headers.Purchase_Order_Number || "", confidence: "Medium", percent: 80, color: "bg-purple-100 text-purple-700", editable: true, externalLink: false },
          { key: "currency", label: "Currency", value: headers.Currency || "", confidence: "High", percent: 95, color: "bg-green-100 text-green-800", editable: false },
          { key: "document_type", label: "Document Type", value: headers.Document_Type || "", confidence: "Medium", percent: 80, color: "bg-purple-100 text-purple-700", editable: false },
          { key: "status", label: "Status", value: invoiceData.status || "", confidence: "High", percent: 90, color: "bg-green-100 text-green-800", editable: false },
        ]);

        // Supplier Info
        setSupplierInfo([
          { key: "supplier_name", label: "Supplier Name", value: headers.Vendor_Name || "", confidence: "High", percent: 95, color: "bg-green-100 text-green-800", editable: true },
          { key: "supplier_gstin", label: "Supplier GSTIN", value: headers.Vendor_GSTIN || "", confidence: "Medium", percent: 75, color: "bg-purple-100 text-purple-700", editable: true },
          { key: "customer_name", label: "Customer Name", value: headers.Customer_Name || "", confidence: "High", percent: 90, color: "bg-green-100 text-green-800", editable: true },
          { key: "customer_gstin", label: "Customer GSTIN", value: headers.Customer_GSTIN || "", confidence: "Medium", percent: 80, color: "bg-purple-100 text-purple-700", editable: true },
          { key: "country", label: "Country", value: invoiceData.country || "", confidence: "High", percent: 95, color: "bg-green-100 text-green-800", editable: false },
        ]);

        // Line Items
        const mappedLineItems = (invoiceData.line_items || []).map((item, idx) => ({
          key: `line_${idx + 1}`,
          desc: item.Item_Description || "",
          qty: item.Quantity || 0,
          unit: item.Unit_Price ? `$${Number(item.Unit_Price).toLocaleString()}` : "",
          amount: item.Total_Item_Amount ? `$${Number(item.Total_Item_Amount).toLocaleString()}` : "",
          confidence: "Medium",
          color: "bg-orange-100 text-orange-700",
        }));
        setLineItems(mappedLineItems);

        // Totals
        setTotalsSummary([
          { key: "total_igst_percent", label: "Total IGST %", value: headers.Total_IGST_Percent ? `${headers.Total_IGST_Percent}%` : "", confidence: "Medium", percent: 80, color: "bg-purple-100 text-purple-800", editable: true },
          { key: "total_igst_amount", label: "Total IGST Amount", value: headers.Total_IGST_Amount ? `$${headers.Total_IGST_Amount.toLocaleString()}` : "", confidence: "Medium", percent: 80, color: "bg-purple-100 text-purple-800", editable: true },
          { key: "discount_percent", label: "Discount Percent", value: headers.Discount_Percent ? `${headers.Discount_Percent}%` : "", confidence: "Medium", percent: 80, color: "bg-purple-100 text-purple-800", editable: true },
          { key: "discount_amount", label: "Discount Amount", value: headers.Discount_Amount ? `$${headers.Discount_Amount.toLocaleString()}` : "$0", confidence: "High", percent: 95, color: "bg-green-100 text-green-800", editable: true },
          { key: "total_amount", label: "Total Amount", value: headers.Total_Amount ? `$${headers.Total_Amount.toLocaleString()}` : "", confidence: "High", percent: 95, color: "bg-green-100 text-green-800", editable: true },
        ]);
      } catch (error) {
        console.error("Failed to fetch invoice details", error);
      }
    };
    fetchInvoiceDetails();
  }, [invoiceNumber]);

  useEffect(() => {
    if (!uploads) return;
    const pdfFile = uploads.find(
      (u) => u.fileName && u.fileName.toLowerCase().endsWith(".pdf")
    );
    if (pdfFile) {
      setRecentPdf(
        pdfFile.fileUrl || (pdfFile.file && URL.createObjectURL(pdfFile.file))
      );
    }
  }, [uploads]);

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      
      {/* LEFT: PDF Viewer - Takes full width on mobile, and 7/12 on large screens */}
      <div className="flex-1 lg:w-7/12 bg-gray-100 border-r border-gray-200 min-h-[40vh] max-h-screen lg:min-h-0 flex flex-col">
        
        {/* Toolbar - Sticky on top of the PDF pane */}
        <div className="sticky top-0 z-50 bg-white border-b flex items-center justify-between px-3 sm:px-6 lg:px-8 h-16 sm:h-[72px] w-full flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-5">
            <button
              onClick={() => setActivePage("Upload")}
              className="flex items-center gap-1 text-gray-700 bg-white border px-2 sm:px-3 py-1.5 sm:py-1 rounded-md font-medium text-sm hover:bg-gray-50 hover:border-gray-300 transition"
            >
              <span className="text-lg">←</span>
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="max-w-[180px] sm:max-w-none">
              <div className="font-semibold text-sm sm:text-base lg:text-lg leading-tight">
                <span className="text-green-500">Review:&nbsp;</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:underline font-semibold text-xs sm:text-sm lg:text-base">
                  {pdfFileName || "No PDF"}
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-0.5 hidden sm:block">
                Compare source document with extracted data
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg bg-purple-100 text-purple-700 font-semibold text-xs sm:text-sm">
              <ClockIcon className="w-4 h-4" />
              Pending
            </span>
            <button className="hidden sm:flex px-3 py-1 rounded bg-gray-100 text-gray-700 font-semibold items-center gap-1 hover:bg-gray-200 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-5" viewBox="0 0 20 20">
                <path d="M10 15V7" />
                <path d="M10 7L6.5 10" />
                <path d="M10 7l3.5 3" />
              </svg>
              Split View
            </button>
          </div>
        </div>
        
        {/* PDF Display & Zoom Controls */}
        <div className="flex flex-col flex-1 min-h-0">
          
          {/* Zoom Controls Bar */}
          <div className="flex items-center gap-3 py-2 px-3 bg-white rounded shadow sticky top-1 z-20 mx-4 sm:mx-6 lg:mx-8 mt-2">
            <button
              onClick={handleZoomIn}
              className="rounded-[8px] border border-gray-300 p-2 hover:bg-blue-50 transition"
              title="Zoom In"
            >
              <MagnifyingGlassPlusIcon className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="rounded-[8px] border border-gray-300 p-2 hover:bg-blue-50"
              title="Zoom Out"
            >
              <MagnifyingGlassMinusIcon className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="rounded-[8px] border border-gray-300 p-2 hover:bg-yellow-50"
              title="Reset View"
            >
              <ArrowPathIcon className="w-4 h-4" />
            </button>
            <span className="ml-4 text-gray-600 font-medium select-none text-sm">
              Zoom: {zoom}%
            </span>
          </div>
          
          {/* PDF Container with zoom */}
          <div 
            ref={pdfContainerRef}
            // Mobile: min-h-full, so it takes the remaining height of the 40vh section
            // Tablet/Desktop: max-h-full (no change from min-h-0 in parent flex-1)
            className="overflow-auto flex-1 w-full bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8"
          >
            {invoicePdf ? (
              <div 
                className="bg-white shadow-lg"
                style={{ 
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'top center', // Adjusting origin to top center for better mobile scrolling
                  transition: 'transform 0.2s ease-in-out',
                  width: '100%',
                  // Min height is important for the scrollable area on mobile
                  minHeight: '350px', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* iframe is the content, so it should take a reasonable size */}
                <iframe
                  src={invoicePdf}
                  title="Invoice PDF Preview"
                  // Ensure iframe is contained within the parent scaled div
                  className="w-full h-full min-h-[500px] lg:min-h-[80vh]" 
                  style={{ border: "none" }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-white p-10">
                <p className="p-4 text-center text-gray-500 text-lg">
                  No PDF available for this invoice.
                </p>
              </div>
            )}
          </div>
          
          {/* Confidence Legend Footer */}
          <div className="bg-gray-100 py-2 sm:py-3 px-3 sm:px-4 border-t border-gray-200 flex flex-col sm:flex-row gap-1 sm:gap-4 text-xs justify-center flex-shrink-0">
            <span className="flex items-center gap-1 text-green-700 justify-center sm:justify-start">
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-green-100 inline-block"></span>
              High (90%+)
            </span>
            <span className="flex items-center gap-1 text-orange-500 justify-center sm:justify-start">
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-orange-100 inline-block"></span>
              Medium (70-89%)
            </span>
            <span className="flex items-center gap-1 text-red-600 justify-center sm:justify-start">
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-red-100 inline-block"></span>
              Low (&lt;70%)
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT: Extracted Data - Full width on mobile, and 5/12 on large screens */}
      {/* We add padding-bottom to account for the fixed footer on mobile */}
      <div className="w-full lg:w-5/12 flex flex-col h-full lg:h-screen bg-gray-50 border-l pb-[72px] lg:pb-0 overflow-hidden">
        
        {/* Extracted Data Header - Sticky on top of the data pane */}
        <div className="sticky top-0 z-30 bg-white px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-5 flex items-center justify-between border-b border-gray-200">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
            Extracted Data
          </h2>
          <span className="flex items-center gap-1 px-2 sm:px-3 lg:px-4 py-1 rounded-lg bg-purple-100 text-purple-700 font-medium text-xs sm:text-sm">
            <ClockIcon className="w-4 h-4" /> Pending
          </span>
        </div>
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 lg:space-y-10">
          <InfoSection
            title="Header Information"
            data={headerInfo}
            bgColor="bg-blue-100 text-blue-800"
            borderColor="border-l-blue-500"
            iconColor="text-blue-800"
            editable={true}
          />

          <InfoSection
            title="Supplier Information"
            data={supplierInfo}
            bgColor="bg-green-100 text-green-800"
            borderColor="border-l-green-500"
            iconColor="text-green-800"
            editable={true}
          />

          <InfoSection
            title="Line Items"
            data={lineItems}
            bgColor="bg-blue-100 text-blue-800"
            borderColor="border-l-blue-500"
            iconColor="text-blue-800"
            editable={true}
            isLineItems={true}
          />

          <InfoSection
            title="Totals & Summary"
            data={totalsSummary}
            bgColor="bg-purple-100 text-purple-800"
            borderColor="border-l-purple-500"
            iconColor="text-purple-800"
            editable={true}
          />
        </div>
        
        {/* FIXED FOOTER BUTTONS */}
        <div className="fixed bottom-0 left-0 right-0 w-full lg:sticky lg:bottom-0 bg-white px-3 sm:px-6 lg:px-10 py-3 sm:py-4 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 z-40 border-t border-gray-200 shadow-xl lg:shadow-none">
          <button className="px-3 sm:px-4 lg:px-5 py-2 rounded bg-gray-200 font-semibold hover:bg-gray-300 text-sm sm:text-base order-2 sm:order-1">
            Reject Invoice
          </button>
          <button className="px-3 sm:px-4 lg:px-5 py-2 rounded bg-gray-100 font-semibold hover:bg-gray-200 text-sm sm:text-base order-3 sm:order-2">
            Save Draft
          </button>
          <button className="px-3 sm:px-4 lg:px-5 py-2 rounded bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold text-sm sm:text-base order-1 sm:order-3 mb-2 sm:mb-0">
            Approve & Process
          </button>
        </div>
      </div>
    </div>
  );
}