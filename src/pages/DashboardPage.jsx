import React, { useState, useEffect } from "react"; // 👈 Import useState and useEffect
import { FaEye, FaDownload } from "react-icons/fa";

const DashboardPage = ({ setActivePage }) => {
  // 1. Use state for fetched invoices and the current set of invoices to display
  const [apiInvoices, setApiInvoices] = useState([]); // To store data from API
  const [uploads, setUploads] = useState([]); // This state seems to be used for the mapped API data
  const [highlightIds, setHighlightIds] = useState([]); // Assuming this is used elsewhere

  // 2. Mock data (kept temporarily for other sections, but will prioritize API data)
  const mockInvoices = [
    {
      id: "MS-2024-001",
      vendor: "Microsoft Corporation",
      date: "2024-01-15",
      amount: "USD 24,850",
      status: "Processed",
      confidence: "96%",
    },
    {
      id: "AWS-2024-156",
      vendor: "Amazon Web Services Inc.",
      date: "2024-03-05",
      amount: "USD 18,750.5",
      status: "Needs Review",
      confidence: "78%",
    },
    {
      id: "STP-2024-0078",
      vendor: "Staples Business Solutions",
      date: "2024-01-20",
      amount: "USD 2,845.99",
      status: "Processing",
      confidence: "89%",
    },
    {
      id: "G-2024-4892",
      vendor: "Google LLC",
      date: "2024-02-10",
      amount: "USD 1,800",
      status: "Failed",
      confidence: "45%",
    },
    {
      id: "SLACK-2024-001",
      vendor: "Slack Technologies Inc.",
      date: "2024-01-08",
      amount: "USD 15,600",
      status: "Processed",
      confidence: "94%",
    },
  ];

  // Combine data: use API data if available, otherwise use mock data
  const invoicesToDisplay = apiInvoices.length > 0 ? apiInvoices : mockInvoices;


  const fetchInvoices = async () => {
    debugger 
    try {
      const response = await fetch("http://192.168.0.102:5050/api/invoices1", {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTM1OWQ0YzMxODI0NDIwODcwZDExMSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc2MDI5NTk3MSwiZXhwIjoxNzYwMzgyMzcxfQ.hFKT12Eh6D8x-u-2ncAB4MFDBRcZZK1UcfY7zmFGoK8",
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) throw new Error(`Network response was not ok, status: ${response.status}`);
      
      const data = await response.json();
      
   
      const mappedData = (data.invoices || []).map((item) => ({
       
        id: item.headers.Invoice_Number || "--",
        vendor: item.headers?.Vendor_Name || "—",
        date: item.createdAt ? item.createdAt.slice(0, 10) : "—", // Using createdAt as the date
        amount:
          item.headers?.Total_Amount !== undefined
            ? `₹${item.headers.Total_Amount.toLocaleString()}`
            : "—", // Using Indian Rupee as per mapping logic
        status: item.status,
        confidence: item.headers?.Confidence || "—", // Assuming a confidence field
        // Additional fields from original mapping (if needed elsewhere)
        fileName: item.pdf_file_name,
        fileUrl: item.pdf_blob_url,
      }));
      
      // 4. Update the state with the fetched and mapped data
      setApiInvoices(mappedData); // 👈 Set the state for rendering
      setUploads(mappedData); // Keep this for backward compatibility if other components rely on it
      
      const today = new Date().toISOString().slice(0, 10);
      const highlightToday = mappedData
        .filter((f) => f.date === today)
        .map((f) => f.id);
      setHighlightIds(highlightToday);

    } catch (error) {
      console.error("Error fetching invoices:", error);
      // Optional: Handle error state for UI display
    }
  };

  useEffect(() => {
    fetchInvoices();
    const interval = setInterval(fetchInvoices, 5000);
    return () => clearInterval(interval);
  }, []);

  const statusClassMap = {
    Processed: "bg-green-100 text-green-800",
    Processing: "bg-blue-100 text-blue-800",
    "Needs Review": "bg-yellow-100 text-yellow-800",
    Failed: "bg-red-100 text-red-800",
  };

  return (
    <div className="flex-1 p-4 sm:p-6 min-h-[calc(100vh-53px)] font-sans bg-gray-50 overflow-x-hidden">
      {/* Header Cards */}
      <div className="flex flex-wrap gap-4 sm:gap-6 mb-8">
        {[
          {
            title: "Total Invoices",
            value: 15,
            trend: "+12.5% this month",
            trendClass: "text-green-700",
          },
          {
            title: "Total Value",
            value: "$169,792.24",
            trend: "+ $25.2K this month",
            trendClass: "text-green-700",
          },
          {
            title: "Avg Processing Time",
            value: "2.3 hours",
            trend: "-0.8min improvement",
            trendClass: "text-red-600",
          },
          {
            title: "Success Rate",
            value: "85.2%",
            trend: "+2.1% this month",
            trendClass: "text-green-700",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="flex-1 min-w-[160px] sm:min-w-[200px] bg-white shadow rounded-2xl p-4 sm:p-5 flex flex-col justify-between
                                 transition-transform transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-800 text-sm sm:text-base">{card.title}</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold mb-1 text-gray-900">
              {card.value}
            </div>
            <div className={`text-sm sm:text-base font-medium ${card.trendClass}`}>
              {card.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Sections */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Recent Activity */}
        <div className="bg-white shadow rounded-2xl p-5 flex-1 min-w-[250px] flex flex-col">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Recent Activity
          </h3>
          <ul className="space-y-4 overflow-y-auto flex-1">
            {/* 5. Use the invoicesToDisplay state for rendering */}
            {invoicesToDisplay.slice(0, 5).map((inv, idx) => ( 
              <li
                key={inv.id} // Use inv.id for a stable key
                className="flex justify-between items-center border-b border-gray-200 pb-3 
                                 hover:bg-blue-50 hover:shadow-md transition-all duration-300 cursor-pointer rounded-lg p-2"
              >
                <div>
                  <span className="font-semibold text-gray-900">{inv.id}</span>
                  <div className="text-gray-600 text-sm">{inv.vendor}</div>
                </div>
                <span className="text-gray-600 text-sm">{inv.date}</span>
              </li>
            ))}
            {/* Display a message if no invoices are loaded */}
            {invoicesToDisplay.length === 0 && (
              <li className="text-gray-500 text-center py-4">
                No recent invoices found.
              </li>
            )}
          </ul>
        </div>

        {/* Top Vendors */}
        <div className="bg-white shadow rounded-2xl p-5 flex-1 min-w-[250px] flex flex-col">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Top Vendors
          </h3>
          <ul className="space-y-4 overflow-y-auto flex-1">
            {/* Using invoicesToDisplay here as well */}
            {invoicesToDisplay.slice(0, 5).map((inv, idx) => (
              <li
                key={inv.id}
                className="flex justify-between items-center border-b border-gray-200 pb-3
                                 hover:bg-blue-50 hover:shadow-md transition-all duration-300 cursor-pointer rounded-lg p-2"
              >
                <span className="bg-blue-100 text-blue-800 rounded-full w-7 h-7 flex items-center justify-center font-bold mr-2 flex-shrink-0">
                  {idx + 1}
                </span>
                <div className="flex flex-col flex-grow">
                  <span className="font-semibold text-gray-900 leading-tight">
                    {inv.vendor}
                  </span>
                  <div className="text-gray-600 text-sm leading-tight">
                    1 invoice
                  </div>
                </div>
                <span className="font-semibold text-gray-900 ml-2 sm:ml-4 flex-shrink-0">
                  {inv.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-x-hidden">
        <h3 className="text-lg sm:text-xl font-bold mb-5 text-gray-900">
          Invoice History
        </h3>

        {/* Filters and other elements... */}
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            placeholder="Search invoices, vendors, or invoice numbers..."
            className="flex-1 min-w-[180px] sm:min-w-[250px] px-3 py-2 sm:px-4 sm:py-3 rounded-md border border-gray-300
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
          />
          <select className="px-3 py-2 sm:px-4 sm:py-3 rounded-md border border-gray-300 focus:outline-none transition text-sm sm:text-base">
            <option>All Statuses</option>
          </select>
          <select className="px-3 py-2 sm:px-4 sm:py-3 rounded-md border border-gray-300 focus:outline-none transition text-sm sm:text-base">
            <option>All Vendors</option>
          </select>
          <button className="px-3 py-2 sm:px-4 sm:py-2 rounded-md bg-blue-100 text-blue-800 font-semibold hover:bg-blue-200 transition cursor-pointer min-w-[80px] text-sm sm:text-base">
            Select dates
          </button>
          <button className="px-3 py-2 sm:px-4 sm:py-2 rounded-md bg-blue-100 text-blue-800 font-semibold hover:bg-blue-200 transition cursor-pointer min-w-[80px] text-sm sm:text-base">
            Export
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Invoice #",
                  "Vendor",
                  "Upload Date",
                  "Amount",
                  "Status",
                  "Confidence",
                  "Actions",
                ].map((col) => (
                  <th
                    key={col}
                    className="p-3 text-gray-700 font-semibold whitespace-nowrap text-sm sm:text-base"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* 7. Use the invoicesToDisplay state for the main table */}
              {invoicesToDisplay.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-gray-200 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <td className="p-3 flex items-center gap-3 whitespace-nowrap text-gray-900 font-semibold text-sm sm:text-base">
                    {inv.id}
                  </td>
                  <td className="p-3 whitespace-nowrap text-gray-900 text-sm sm:text-base">
                    {inv.vendor}
                  </td>
                  <td className="p-3 whitespace-nowrap text-gray-700 text-sm sm:text-base">
                    {inv.date}
                  </td>
                  <td className="p-3 whitespace-nowrap text-gray-700 font-semibold text-sm sm:text-base">
                    {inv.amount}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium ${
                        statusClassMap[inv.status]
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium ${
                        // Use a class based on status for confidence, or define a new map
                        inv.confidence === "—" ? "bg-gray-100 text-gray-800" : statusClassMap[inv.status]
                      }`}
                    >
                      {inv.confidence}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2 sm:gap-3">
                    <button
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-blue-200 text-gray-600 hover:text-blue-800 flex items-center justify-center transition-all duration-200 cursor-pointer"
                      onClick={() => {
                        if (
                          inv.status === "Needs Review" ||
                          inv.status === "Processed"
                        ) {
                          setActivePage("Review");
                        } else {
                          setActivePage("Processing");
                        }
                      }}
                      aria-label={`View invoice ${inv.id}`}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-blue-200 text-gray-600 hover:text-blue-800 flex items-center justify-center transition-all duration-200 cursor-pointer"
                      aria-label={`Download invoice ${inv.id}`}
                    >
                      <FaDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5 text-gray-700 gap-3 text-sm sm:text-base">
          <span>
            Showing {invoicesToDisplay.length} of {invoicesToDisplay.length} invoices
          </span>
          <div className="flex gap-2 sm:gap-3">
            <button className="px-3 sm:px-4 py-2 rounded-md bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition cursor-pointer text-sm sm:text-base">
              Previous
            </button>
            <button className="px-3 sm:px-4 py-2 rounded-md bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition cursor-pointer text-sm sm:text-base">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;