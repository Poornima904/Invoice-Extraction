import React from "react";
import { FaArrowLeft, FaSpinner, FaRedo, FaClock, FaCheck } from "react-icons/fa";

const stepsData = [
  { title: "Upload Complete", description: "Invoice file received and validated", time: "Completed at 4:00:00 pm", duration: "0.5s", status: "completed" },
  { title: "OCR Processing", description: "Extracting text from PDF using advanced OCR", time: "Completed at 4:00:15 pm", duration: "15.2s", status: "completed" },
  { title: "AI Analysis", description: "Identifying invoice structure and key data points", time: "Completed at 4:01:45 pm", duration: "32.1s", status: "completed" },
  { title: "Data Extraction", description: "Extracting vendor, amounts, line items, and metadata", time: "Completed at 4:02:17 pm", duration: "25.8s", status: "completed" },
  { title: "Validation", description: "Validating extracted data against business rules", time: "Started at 4:02:17 pm", duration: "", status: "processing", progress: 60 },
  { title: "Quality Check", description: "Final confidence scoring and quality assessment", time: "", duration: "", status: "pending" },
];

export default function ProcessingPage({ setActivePage }) {
  const overallProgress = 60;
  return (
    <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-6 lg:px-8 py-6 text-gray-900 font-sans overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3 sm:gap-0 w-full">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setActivePage("Upload")}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md
            hover:bg-blue-50 hover:scale-105 transition-transform duration-200 ease-in-out
            text-sm cursor-pointer"
          >
            <FaArrowLeft className="transition-colors duration-200 hover:text-blue-600" /> Back
          </button>
          <div className="text-sm break-words">
            Processing Status: <strong>office_supplies_quarterly.pdf</strong>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 bg-blue-50 text-blue-600 rounded-md font-semibold text-sm
            hover:bg-blue-100 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer">
            <FaSpinner className="animate-spin" /> Processing
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-md font-semibold text-sm
            hover:bg-gray-100 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer">
            <FaRedo /> Re-Run Extraction
          </button>
        </div>
      </div>

      {/* Timeline Card */}
      <div className="border rounded-xl p-4 md:p-6 mb-6 shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out bg-white overflow-x-hidden">
        <div className="flex items-center gap-2 mb-4 text-lg font-semibold text-blue-800">
          <FaClock className="text-blue-600 transition-colors duration-300 ease-in-out" /> Processing Timeline
        </div>
        {/* Overall Progress */}
        <div className="flex items-center mb-2 text-sm">
          <span className="font-medium">Overall Progress</span>
          <span className="ml-auto font-semibold">{overallProgress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mb-5 overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        {/* Steps */}
        <div className="relative pl-8 sm:pl-16 pr-2 sm:pr-0">
          <div className="absolute top-5 left-4 sm:left-8 w-0.5 bg-gray-300 h-full z-0"></div>
          {stepsData.map((step, idx) => {
            const isProcessing = step.status === "processing";
            const isCompleted = step.status === "completed";
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start sm:items-center mb-8 relative gap-2 sm:gap-4
                transition-all duration-300 ease-in-out hover:translate-x-1 hover:bg-blue-50 rounded cursor-pointer w-full"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-14 flex justify-center mt-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ease-in-out
                    ${isCompleted ? "bg-green-500 text-white" : isProcessing ? "bg-blue-600 text-white animate-pulse" : "bg-gray-300 text-white"}`}>
                    {isCompleted ? (
                      <FaCheck />
                    ) : isProcessing ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 pl-2 sm:pl-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full">
                    <div
                      className={`text-sm font-semibold transition-colors duration-300 ease-in-out
                      ${isCompleted ? "text-green-600" : isProcessing ? "text-blue-600" : "text-gray-900"}`}
                    >
                      {step.title}
                    </div>
                    {step.duration && (
                      <div
                        className={`ml-auto text-xs px-2 py-0.5 border rounded transition-colors duration-300 ease-in-out
                        ${isProcessing ? "border-blue-600 text-blue-600" : "border-gray-200 text-gray-700"}`}
                      >
                        {step.duration}
                      </div>
                    )}
                  </div>
                  <div className={`mt-1 text-xs transition-colors duration-300 ease-in-out ${isProcessing ? "text-blue-600" : "text-gray-600"}`}>
                    {step.description}
                  </div>
                  {step.time && <div className="mt-1 text-xs text-gray-500">{step.time}</div>}
                  {isProcessing && step.progress !== undefined && (
                    <div className="mt-2 w-full h-1.5 bg-gray-200 rounded overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded transition-all duration-700 ease-in-out"
                        style={{ width: `${step.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* File Info & Extraction Results */}
      <div className="flex flex-col sm:flex-row gap-5 mb-6 w-full">
        <div className="flex-1 border rounded-xl p-5 shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out bg-white cursor-default w-full">
          <h4 className="font-semibold mb-3 text-blue-700">File Information</h4>
          <div className="flex justify-between mb-2 text-sm"><span>File Name:</span> <span className="font-medium break-words">office_supplies_quarterly.pdf</span></div>
          <div className="flex justify-between mb-2 text-sm"><span>Upload Date:</span> <span className="font-medium">2024-01-20</span></div>
          <div className="flex justify-between mb-2 text-sm"><span>File Size:</span> <span className="font-medium">2.4 MB</span></div>
          <div className="flex justify-between text-sm"><span>Pages:</span> <span className="font-medium">3</span></div>
        </div>
        <div className="flex-1 border rounded-xl p-5 shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out bg-white cursor-default w-full">
          <h4 className="font-semibold mb-3 text-blue-700">Extraction Results</h4>
          <div className="flex justify-between mb-2 text-sm"><span>Confidence Score:</span> <span className="px-2 py-1 bg-blue-50 rounded font-semibold">89%</span></div>
          <div className="flex justify-between mb-2 text-sm"><span>Fields Extracted:</span> <span className="font-medium">12/15</span></div>
          <div className="flex justify-between mb-2 text-sm"><span>Line Items:</span> <span className="font-medium">3</span></div>
          <div className="flex justify-between text-sm"><span>Processing Time:</span> <span className="font-medium">45 seconds</span></div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-start">
        <button className="px-5 py-2 bg-blue-600 text-white rounded-md font-semibold
         hover:bg-blue-700 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer">
          Download Original PDF
        </button>
      </div>
    </div>
  );
}
