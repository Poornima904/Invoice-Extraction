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
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Utility to extract filename from URL
function extractFilename(url) {
  if (!url) return "";
  const parts = url.split("/");
  let filename = parts[parts.length - 1].split("?")[0];
  return filename;
}

// EditableField Component
function EditableField({
  label,
  value,
  confidence,
  percent,
  color,
  editable,
  externalLink,
  isEditing,
  onStartEdit,
  onSave,
  onCancel,
}) {
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
          <button
            className="p-1 rounded border border-green-300 hover:bg-green-100"
            aria-label="Confirm"
            onClick={() => onSave(draftValue)}
          >
            <CheckIcon className="w-6 h-6 text-green-600" />
          </button>
          <button
            className="p-1 rounded border border-gray-300 hover:bg-gray-100"
            aria-label="Cancel"
            onClick={onCancel}
          >
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
          <button
            className="ml-auto p-1 rounded hover:bg-blue-100"
            aria-label={`Edit ${label}`}
            onClick={onStartEdit}
          >
            <PencilIcon className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>
      <div className="text-gray-800 text-base mt-1">{value}</div>
    </div>
  );
}

// EditableLineItemRow Component
function EditableLineItemRow({
  line,
  isEditing,
  onStartEdit,
  onSave,
  onCancel,
}) {
  const [hovered, setHovered] = useState(false);
  const [draftValues, setDraftValues] = useState({
    desc: line.desc,
    qty: line.qty,
    UOM: line.Unit_Of_Measure,
    Tax: line.Tax,
    unit: line.unit,
    amount: line.amount,
  });

  useEffect(() => {
    if (isEditing)
      setDraftValues({
        desc: line.desc,
        qty: line.qty,
        UOM: line.Unit_Of_Measure,
        Tax: line.Tax,
        unit: line.unit,
        amount: line.amount,
      });
  }, [isEditing, line]);

  const setDraftField = (field, val) =>
    setDraftValues((prev) => ({ ...prev, [field]: val }));

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
            value={draftValues.UOM}
            onChange={(e) => setDraftField("UOM", e.target.value)}
            className="w-full border rounded p-1 text-sm"
            type="number"
            min="0"
          />
        </td>
         <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
          <input
            value={draftValues.Tax}
            onChange={(e) => setDraftField("Tax", e.target.value)}
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
          <button
            aria-label="Cancel"
            className="p-1 rounded bg-gray-100 hover:bg-gray-200"
            onClick={onCancel}
          >
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
      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
        {line.qty?.toLocaleString?.() || line.qty}
      </td>
      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
        {line.UOM?.toLocaleString?.() || line.UOM}
      </td>
      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
        {line.Tax?.toLocaleString?.() || line.Tax}
      </td>
      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{line.unit}</td>
      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium">
        {line.amount}
      </td>
      <td className="px-3 sm:px-4 py-2 relative">
        <span
          className={`rounded-full py-1 px-2 text-xs font-bold ${line.color}`}
        >
          {line.confidence}
        </span>
        {hovered && (
          <button
            className="absolute top-1 right-1 p-1 rounded hover:bg-blue-100"
            aria-label={`Edit line ${line.desc}`}
            onClick={onStartEdit}
          >
            <PencilIcon className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </td>
    </tr>
  );
}

// InfoSection Component - Make sure this is properly defined
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
    setFieldsOrLines(
      fieldsOrLines.map((item) =>
        item.key === key ? { ...item, value: newValue } : item
      )
    );
    setEditingKey(null);
  };

  const saveLineEdit = (key, newLine) => {
    setFieldsOrLines(
      fieldsOrLines.map((item) => (item.key === key ? newLine : item))
    );
    setEditingKey(null);
  };

  useEffect(() => {
    setFieldsOrLines(data);
  }, [data]);

  if (isLineItems) {
    return (
      <section>
        <div
          className={`${bgColor} ${borderColor} rounded-t-xl px-4 sm:px-5 py-3 border-l-4 flex items-center gap-2 text-sm sm:text-base font-semibold`}
        >
          <BoltIcon className={`w-5 h-5 ${iconColor}`} />
          {title}
        </div>
        <div className="bg-white rounded-b-xl p-3 sm:p-5 lg:p-7 shadow border-l-4 border-blue-100 overflow-x-auto">
          <table className="min-w-[600px] w-full border divide-y divide-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 text-xs sm:text-sm">
                  Description
                </th>
                <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 text-xs sm:text-sm">
                  Qty
                </th>
                <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 text-xs sm:text-sm">
                  UOM
                </th>
                 <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 text-xs sm:text-sm">
                  Tax
                </th>
                <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 text-xs sm:text-sm">
                  Unit Price
                </th>
                <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 text-xs sm:text-sm">
                  Amount
                </th>
                <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 text-xs sm:text-sm">
                  Confidence
                </th>
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
      <div
        className={`${bgColor} ${borderColor} rounded-t-xl px-4 sm:px-5 py-3 border-l-4 flex items-center gap-2 text-sm sm:text-base font-semibold`}
      >
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

// Main ReviewPage Component
export default function ReviewPage({
  setActivePage,
  uploads,
  invoiceNumber,
  recentPdfUrl,
}) {
  const [zoom, setZoom] = useState(100);
  const [recentPdf, setRecentPdf] = useState(null);
  const [invoicePdf, setInvoicePdf] = useState(null);
  const pdfContainerRef = useRef(null);

  const [headerInfo, setHeaderInfo] = useState([]);
  const [supplierInfo, setSupplierInfo] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [totalsSummary, setTotalsSummary] = useState([]);
  const [pdfFileName, setPdfFileName] = useState("");

  // Zoom functionality
  const handleZoomIn = () => {
    setZoom((prev) => {
      const newZoom = Math.min(prev + 25, 200);
      return newZoom;
    });
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 25, 50);
      return newZoom;
    });
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  // Data fetching logic
  useEffect(() => {
    debugger;
    if (!invoiceNumber) return;

    const fetchInvoiceDetails = async () => {
      debugger;
      try {
        const res = await fetch(
          `https://hczbk50t-5000.inc1.devtunnels.ms/invoice/${invoiceNumber}`
        );
        const data = await res.json();
        const invoiceData = data.newInvoice || data.invoice || data; // fallback if wrapped

        if (!invoiceData) return;

        // ✅ Parse headers safely
        let headers = {};
        try {
          headers = invoiceData.Headers ? JSON.parse(invoiceData.Headers) : {};
        } catch {
          headers = {};
        }

        // ✅ Parse line items safely
        let lineItems = [];
        try {
          lineItems = invoiceData.LineItems
            ? JSON.parse(invoiceData.LineItems)
            : [];
        } catch {
          lineItems = [];
        }

        // ✅ PDF file info
        if (invoiceData.PdfBlobUrl) {
          setInvoicePdf(invoiceData.PdfBlobUrl);
          setPdfFileName(invoiceData.PdfFileName || "invoice.pdf");
        }

        // ✅ Header info
        setHeaderInfo([
          {
            key: "invoice_number",
            label: "Invoice Number",
            value: headers.Invoice_Number || "",
            confidence: "High",
            percent: 90,
            color: "bg-green-100 text-green-800",
            editable: true,
          },
          {
            key: "invoice_date",
            label: "Invoice Date",
            value: headers.Invoice_Date || "",
            confidence: "High",
            percent: 90,
            color: "bg-green-100 text-green-800",
            editable: true,
          },
          {
            key: "po_number",
            label: "PO Number",
            value: headers.Purchase_Order_Number || "",
            confidence: "Medium",
            percent: 80,
            color: "bg-purple-100 text-purple-700",
            editable: true,
          },
          {
            key: "Payment_Terms",
            label: "Payment Terms",
            value: headers.Payment_Terms || "",
            confidence: "Medium",
            percent: 80,
            color: "bg-purple-100 text-purple-700",
            editable: true,
          },
          {
            key: "currency",
            label: "Currency",
            value: headers.Currency || "",
            confidence: "High",
            percent: 95,
            color: "bg-green-100 text-green-800",
            editable: false,
          },
          {
            key: "document_type",
            label: "Document Type",
            value: headers.Document_Type || "",
            confidence: "Medium",
            percent: 80,
            color: "bg-purple-100 text-purple-700",
            editable: false,
          },
          {
            key: "status",
            label: "Status",
            value: invoiceData.Status || "",
            confidence: "High",
            percent: 90,
            color: "bg-green-100 text-green-800",
            editable: false,
          },
        ]);

        // ✅ Supplier info
        setSupplierInfo([
          {
            key: "supplier_name",
            label: "Supplier Name",
            value: headers.Vendor_Name || "",
            confidence: "High",
            percent: 95,
            color: "bg-green-100 text-green-800",
            editable: true,
          },
          {
            key: "supplier_gstin",
            label: "Supplier GSTIN",
            value: headers.Vendor_GSTIN || "",
            confidence: "Medium",
            percent: 75,
            color: "bg-purple-100 text-purple-700",
            editable: true,
          },
          {
            key: "customer_name",
            label: "Customer Name",
            value: headers.Customer_Name || "",
            confidence: "High",
            percent: 90,
            color: "bg-green-100 text-green-800",
            editable: true,
          },
          {
            key: "customer_gstin",
            label: "Customer GSTIN",
            value: headers.Customer_GSTIN || "",
            confidence: "Medium",
            percent: 80,
            color: "bg-purple-100 text-purple-700",
            editable: true,
          },
          {
            key: "country",
            label: "Country",
            value: invoiceData.Country || "",
            confidence: "High",
            percent: 95,
            color: "bg-green-100 text-green-800",
            editable: false,
          },
        ]);

        // ✅ Line items
        const mappedLineItems = lineItems.map((item, idx) => ({
          key: `line_${idx + 1}`,
          desc: item.Item_Description || "",
          qty: item.Quantity || 0,
          UOM: item.Unit_Of_Measure || "",
          Tax: item.Tax || "",
          unit: item.Unit_Price
            ? headers.Currency === "USD"
              ? `$${Number(item.Unit_Price).toLocaleString()}`
              : headers.Currency === "INR"
              ? `₹${Number(item.Unit_Price).toLocaleString()}`
              : `${Number(item.Unit_Price).toLocaleString()} ${
                  item.Currency || ""
                }`
            : "",
          amount: item.Total_Item_Amount
            ? headers.Currency === "USD"
              ? `$${Number(item.Total_Item_Amount).toLocaleString()}`
              : headers.Currency === "INR"
              ? `₹${Number(item.Total_Item_Amount).toLocaleString()}`
              : `${Number(item.Total_Item_Amount).toLocaleString()} ${
                  item.Currency || ""
                }`
            : "",
          confidence: "Medium",
          color: "bg-orange-100 text-orange-700",
        }));
        setLineItems(mappedLineItems);

        // ✅ Totals summary
        setTotalsSummary([
          {
            key: "total_igst_percent",
            label: "Total IGST %",
            value: headers.Total_IGST_Percent
              ? `${headers.Total_IGST_Percent}%`
              : "",
            confidence: "Medium",
            percent: 80,
            color: "bg-purple-100 text-purple-800",
            editable: true,
          },
          {
            key: "total_igst_amount",
            label: "Total IGST Amount",
            value: headers.Total_IGST_Amount
              ? `₹${Number(headers.Total_IGST_Amount).toLocaleString()}`
              : "",
            confidence: "Medium",
            percent: 80,
            color: "bg-purple-100 text-purple-800",
            editable: true,
          },
          {
            key: "discount_percent",
            label: "Discount Percent",
            value: headers.Discount_Percent
              ? `${headers.Discount_Percent}%`
              : "",
            confidence: "Medium",
            percent: 80,
            color: "bg-purple-100 text-purple-800",
            editable: true,
          },
          {
            key: "discount_amount",
            label: "Discount Amount",
            value: headers.Discount_Amount
              ? `₹${Number(headers.Discount_Amount).toLocaleString()}`
              : "₹0",
            confidence: "High",
            percent: 95,
            color: "bg-green-100 text-green-800",
            editable: true,
          },
          {
            key: "total_amount",
            label: "Total Amount",
            value: headers.Total_Amount
              ? headers.Currency === "USD"
                ? `$${Number(headers.Total_Amount).toLocaleString()}`
                : headers.Currency === "INR"
                ? `₹${Number(headers.Total_Amount).toLocaleString()}`
                : `${Number(headers.Total_Amount).toLocaleString()} ${
                    headers.Currency || ""
                  }`
              : "",
            confidence: "High",
            percent: 95,
            color: "bg-green-100 text-green-800",
            editable: true,
          },
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
      {/* LEFT: PDF Viewer */}
      <div className="flex-1 lg:w-7/12 bg-gray-100 border-r border-gray-200 min-h-[50vh] lg:min-h-0 flex flex-col">
        {/* Toolbar - Improved mobile header */}
        <div className="sticky top-0 z-50 bg-white border-b flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 lg:py-4 w-full flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <button
              onClick={() => setActivePage("Upload")}
              className="flex-shrink-0 flex items-center gap-1 text-gray-700 bg-white border px-2 sm:px-3 py-1.5 rounded-md font-medium text-sm hover:bg-gray-50 hover:border-gray-300 transition"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span className="hidden xs:inline">Back</span>
            </button>
            <div className="min-w-0 flex-1 ml-2">
              <div className="font-semibold text-sm sm:text-base truncate">
                <span className="text-green-500">Review:&nbsp;</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-500">
                  {pdfFileName || "No PDF"}
                </span>
              </div>
              <div className="text-xs text-gray-500 truncate hidden sm:block">
                Compare source document with extracted data
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="hidden xs:flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg bg-purple-100 text-purple-700 font-semibold text-xs">
              <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              Pending
            </span>
            <button className="hidden sm:flex px-3 py-1 rounded bg-gray-100 text-gray-700 font-semibold items-center gap-1 hover:bg-gray-200 text-xs">
              Split View
            </button>
          </div>
        </div>

        {/* PDF Display & Zoom Controls */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* Zoom Controls Bar - Improved for mobile */}
          <div className="flex items-center justify-between sm:justify-start gap-2 py-2 px-3 bg-white border-b border-gray-200 sticky top-[60px] lg:top-[68px] z-20">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={handleZoomIn}
                className="rounded border border-gray-300 p-1.5 sm:p-2 hover:bg-blue-50 transition"
                title="Zoom In"
              >
                <MagnifyingGlassPlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="rounded border border-gray-300 p-1.5 sm:p-2 hover:bg-blue-50"
                title="Zoom Out"
              >
                <MagnifyingGlassMinusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="rounded border border-gray-300 p-1.5 sm:p-2 hover:bg-yellow-50"
                title="Reset View"
              >
                <ArrowPathIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
            <span className="text-gray-600 font-medium text-xs sm:text-sm flex-shrink-0">
              {zoom}%
            </span>
          </div>

          {/* PDF Container with improved mobile scaling */}
          <div
            ref={pdfContainerRef}
            className="overflow-auto flex-1 w-full bg-white flex items-start justify-center p-2 sm:p-4 lg:p-6"
          >
            {invoicePdf ? (
              <div
                className="bg-white shadow-lg max-w-full"
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: "top center",
                  transition: "transform 0.2s ease-in-out",
                  width: "100%",
                  maxWidth: "800px",
                  minHeight: "400px",
                }}
              >
                <iframe
                  src={invoicePdf}
                  title="Invoice PDF Preview"
                  className="w-full h-full min-h-[400px] lg:min-h-[600px]"
                  style={{ border: "none" }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-white p-4 sm:p-6">
                <p className="text-center text-gray-500 text-sm sm:text-base">
                  No PDF available for this invoice.
                </p>
              </div>
            )}
          </div>

          {/* Confidence Legend Footer - Improved for mobile */}
          <div className="bg-gray-100 py-2 px-3 border-t border-gray-200 flex flex-wrap gap-2 sm:gap-4 text-xs justify-center">
            <span className="flex items-center gap-1 text-green-700">
              <span className="w-2 h-2 rounded bg-green-500 inline-block"></span>
              High (90%+)
            </span>
            <span className="flex items-center gap-1 text-orange-500">
              <span className="w-2 h-2 rounded bg-orange-500 inline-block"></span>
              Medium (70-89%)
            </span>
            <span className="flex items-center gap-1 text-red-600">
              <span className="w-2 h-2 rounded bg-red-500 inline-block"></span>
              Low (&lt;70%)
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT: Extracted Data */}
      <div className="w-full lg:w-5/12 flex flex-col h-auto lg:h-screen bg-gray-50 border-l pb-16 lg:pb-0">
        {/* Extracted Data Header */}
        <div className="sticky top-0 z-30 bg-white px-3 sm:px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between border-b border-gray-200">
          <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate">
            Extracted Data
          </h2>
          <span className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg bg-purple-100 text-purple-700 font-medium text-xs flex-shrink-0">
            <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4" /> Pending
          </span>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6 space-y-4 sm:space-y-6 lg:space-y-8">
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

        {/* FIXED FOOTER BUTTONS - Improved mobile layout */}
        <div className="fixed bottom-0 left-0 right-0 lg:sticky lg:bottom-0 bg-white px-3 sm:px-4 py-3 flex gap-2 z-40 border-t border-gray-200 shadow-lg lg:shadow-none">
          <button className="flex-1 px-3 py-2.5 rounded bg-gray-200 font-semibold hover:bg-gray-300 text-xs sm:text-sm">
            Reject
          </button>
          <button className="flex-1 px-3 py-2.5 rounded bg-gray-100 font-semibold hover:bg-gray-200 text-xs sm:text-sm">
            Save Draft
          </button>
          <button className="flex-1 px-3 py-2.5 rounded bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold text-xs sm:text-sm">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
