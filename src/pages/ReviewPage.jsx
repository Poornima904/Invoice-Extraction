import React, { useState } from "react";
import invoiceImage from "../assets/invoiceExample.png";
import {
  ClockIcon,
  BoltIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const headerInfoInitial = [
  {
    key: "invoice_number",
    label: "Invoice Number",
    value: "AWS-2024-156",
    confidence: "High",
    percent: 98,
    color: "bg-green-100 text-green-800",
    editable: true,
    externalLink: true,
  },
  {
    key: "invoice_date",
    label: "Invoice Date",
    value: "2024-03-01",
    confidence: "High",
    percent: 92,
    color: "bg-green-100 text-green-800",
    editable: true,
    externalLink: false,
  },
  {
    key: "po_number",
    label: "PO Number",
    value: "PO-2024-0156",
    confidence: "Medium",
    percent: 88,
    color: "bg-purple-100 text-purple-700",
    editable: true,
    externalLink: false,
  },
];

const supplierInfoInitial = [
  {
    key: "supplier_name",
    label: "Supplier Name",
    value: "Amazon Web Services Inc.",
    confidence: "High",
    percent: 95,
    color: "bg-green-100 text-green-800",
    editable: true,
  },
  {
    key: "supplier_address",
    label: "Supplier Address",
    value: "WATERS OES M.B. HAUPTSTRASSE 4130",
    confidence: "Medium",
    percent: 89,
    color: "bg-purple-100 text-purple-700",
    editable: true,
  },
  {
    key: "supplier_code",
    label: "Supplier Code",
    value: "4130",
    confidence: "High",
    percent: 94,
    color: "bg-green-100 text-green-800",
    editable: true,
  },
];

const lineItemsInitial = [
  {
    key: "line_1",
    desc: "EC2 Instance Usage - c5.4xlarge",
    qty: 720,
    unit: "$8.50",
    amount: "$6,120.00",
    confidence: "Medium",
    color: "bg-orange-100 text-orange-700",
  },
  {
    key: "line_2",
    desc: "S3 Storage - Standard Tier",
    qty: 5000,
    unit: "$0.02",
    amount: "$115.00",
    confidence: "Medium",
    color: "bg-orange-100 text-orange-700",
  },
  {
    key: "line_3",
    desc: "RDS Database - Multi-AZ PostgreSQL",
    qty: 1,
    unit: "$4850.00",
    amount: "$4,850.00",
    confidence: "High",
    color: "bg-green-100 text-green-800",
  },
  {
    key: "line_4",
    desc: "CloudFront CDN Data Transfer",
    qty: 100000,
    unit: "$0.09",
    amount: "$722.50",
    confidence: "Medium",
    color: "bg-orange-100 text-orange-700",
  },
  {
    key: "line_5",
    desc: "Lambda Function Executions",
    qty: 50000000,
    unit: "$0.00",
    amount: "$10.00",
    confidence: "Low",
    color: "bg-red-100 text-red-700",
  },
];

const totalsSummaryInitial = [
  {
    key: "subtotal",
    label: "Subtotal",
    value: "USD 16,875.45",
    confidence: "High",
    percent: 96,
    color: "bg-green-100 text-green-800",
    editable: true,
  },
  {
    key: "tax_amount",
    label: "Tax Amount",
    value: "USD 1,875.05",
    confidence: "High",
    percent: 94,
    color: "bg-green-100 text-green-800",
    editable: true,
  },
  {
    key: "total_amount",
    label: "Total Amount",
    value: "USD 18,750.5",
    confidence: "High",
    percent: 99,
    color: "bg-green-100 text-green-800",
    editable: true,
  },
];

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

  React.useEffect(() => {
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
    unit: line.unit,
    amount: line.amount,
  });

  React.useEffect(() => {
    if (isEditing)
      setDraftValues({
        desc: line.desc,
        qty: line.qty,
        unit: line.unit,
        amount: line.amount,
      });
  }, [isEditing, line]);

  const setDraftField = (field, val) => {
    setDraftValues((prev) => ({ ...prev, [field]: val }));
  };

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
            onClick={() =>
              onSave(line.key, {
                ...line,
                desc: draftValues.desc,
                qty: draftValues.qty,
                unit: draftValues.unit,
                amount: draftValues.amount,
              })
            }
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
        {line.qty.toLocaleString()}
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

  // Regular info fields section
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

export default function ReviewPage({ setActivePage }) {
   const [zoom, setZoom] = useState(100);
  return (
    <div className="flex bg-gray-50 h-[calc(100vh-53px)] w-full overflow-hidden flex-col lg:flex-row">
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className="sticky top-2 z-50 bg-white border-b flex items-center justify-between px-3 sm:px-6 lg:px-8 h-16 sm:h-[72px] w-full flex-shrink-0">
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
                <a
                  href="#"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:underline font-semibold text-xs sm:text-sm lg:text-base"
                >
                  aws_billing.pdf
                </a>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-5"
                viewBox="0 0 20 20"
              >
                <path d="M10 15V7" />
                <path d="M10 7L6.5 10" />
                <path d="M10 7l3.5 3" />
              </svg>
              Split View
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(100vh-53px)] w-full bg-gray-50 overflow-auto">
          <div className="flex flex-col w-full lg:w-7/12 bg-gray-100 border-r p-0">
            <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          onTransformed={(e) => setZoom((e.state.scale * 100).toFixed(0))}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="flex items-center gap-3 py-2 px-3 bg-white rounded shadow sticky top-1 z-20">
                <button
                  onClick={() => zoomIn()}
                  className="rounded border p-2 hover:bg-blue-50"
                   title="Zoom In"
                >
                  <MagnifyingGlassPlusIcon className="w-6 h-6" />
                 
                </button>

                <button
                  onClick={() => zoomOut()}
                  className="rounded border p-2 hover:bg-blue-50"
                   title="Zoom Out"
                >
                  <MagnifyingGlassMinusIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={() => resetTransform()}
                  className="rounded border p-2 hover:bg-yellow-50"
                    title="Reset View"
                >
                  <ArrowPathIcon className="w-6 h-6" />
                </button>
                <span className="ml-4 text-gray-600 font-medium select-none">
                  Zoom: {zoom}%
                </span>
              </div>

              <TransformComponent>
                <div className="flex justify-center overflow-auto p-10">
                  <img
                    src={invoiceImage}
                    alt="Invoice"
                    className="rounded-lg border shadow max-w-full h-auto cursor-grab"
                    draggable={false}
                  />
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
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
          <div className="w-full lg:w-5/12 flex flex-col h-auto bg-gray-50 border-l px-1 py-2 space-y-6 sm:space-y-8 lg:space-y-10 overflow-visible">
            <div className="sticky top-0 z-30 bg-white px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-5 flex items-center justify-between">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
                Extracted Data
              </h2>
              <span className="flex items-center gap-1 px-2 sm:px-3 lg:px-4 py-1 rounded-lg bg-purple-100 text-purple-700 font-medium text-xs sm:text-sm">
                <ClockIcon className="w-4 h-4" /> Pending
              </span>
            </div>
            <div className="flex-1 overflow-auto px-3 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 lg:space-y-10">
              <InfoSection
                title="Header Information"
                data={headerInfoInitial}
                bgColor="bg-blue-100 text-blue-800"
                borderColor="border-l-blue-500"
                iconColor="text-blue-800"
                editable={true}
              />
              <InfoSection
                title="Supplier Information"
                data={supplierInfoInitial}
                bgColor="bg-green-100 text-green-800"
                borderColor="border-l-green-500"
                iconColor="text-green-800"
                editable={true}
              />
              <InfoSection
                title="Line Items"
                data={lineItemsInitial}
                bgColor="bg-blue-100 text-blue-800"
                borderColor="border-l-blue-500"
                iconColor="text-blue-800"
                editable={true}
                isLineItems={true}
              />
              <InfoSection
                title="Totals & Summary"
                data={totalsSummaryInitial}
                bgColor="bg-purple-100 text-purple-800"
                borderColor="border-l-purple-500"
                iconColor="text-purple-800"
                editable={true}
              />
            </div>
            <div className="sticky bottom-0 left-0 right-0 w-full bg-white px-3 sm:px-6 lg:px-10 py-3 sm:py-4 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 z-30">
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
      </div>
    </div>
  );
}
