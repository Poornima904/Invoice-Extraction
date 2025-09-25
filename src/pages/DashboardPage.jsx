import React from "react";

const DashboardPage = ({ setActivePage }) => {
  const invoices = [
    { id: "MS-2024-001", vendor: "Microsoft Corporation", date: "2024-01-15", amount: "USD 24,850", status: "Processed", confidence: "96%" },
    { id: "AWS-2024-156", vendor: "Amazon Web Services Inc.", date: "2024-03-05", amount: "USD 18,750.5", status: "Needs Review", confidence: "78%" },
    { id: "STP-2024-0078", vendor: "Staples Business Solutions", date: "2024-01-20", amount: "USD 2,845.99", status: "Processing", confidence: "89%" },
    { id: "G-2024-4892", vendor: "Google LLC", date: "2024-02-10", amount: "USD 1,800", status: "Failed", confidence: "45%" },
    { id: "SLACK-2024-001", vendor: "Slack Technologies Inc.", date: "2024-01-08", amount: "USD 15,600", status: "Processed", confidence: "94%" },
  ];

  const statusClassMap = {
    Processed: "bg-green-100 text-green-600",
    Processing: "bg-blue-100 text-blue-600",
    "Needs Review": "bg-yellow-100 text-yellow-500",
    Failed: "bg-red-100 text-red-600",
  };

  return (
    <div className="flex-1 p-4 md:p-8  min-h-[calc(100vh-53px)] font-sans">
      {/* Header Cards */}
      <div className="flex flex-wrap gap-4 mb-8">
        {[
          { title: "Total Invoices", value: 15, trend: "+12.5% this month", trendClass: "text-green-600" },
          { title: "Total Value", value: "$169,792.24", trend: "+ $25.2K this month", trendClass: "text-green-600" },
          { title: "Avg Processing Time", value: "2.3 hours", trend: "-0.8min improvement", trendClass: "text-red-500" },
          { title: "Success Rate", value: "85.2%", trend: "+2.1% this month", trendClass: "text-green-600" },
        ].map((card, idx) => (
          <div key={idx} className="flex-1 min-w-[200px] bg-white shadow-lg rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">{card.title}</span>
            </div>
            <div className="text-2xl font-bold mb-1">{card.value}</div>
            <div className={`font-medium ${card.trendClass}`}>{card.trend}</div>
          </div>
        ))}
      </div>

      {/* Bottom Sections */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Recent Activity */}
        <div className="bg-white shadow-lg rounded-2xl p-5 flex-1 min-w-[250px] flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <ul className="space-y-3 overflow-y-auto flex-1">
            {invoices.slice(0, 5).map((inv, idx) => (
              <li key={idx} className="flex justify-between items-center border-b border-gray-200 pb-2">
                <div>
                  <span className="font-semibold">{inv.id}</span>
                  <div className="text-gray-500 text-sm">{inv.vendor}</div>
                </div>
                <span className="text-gray-500 text-sm">{inv.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Vendors */}
        <div className="bg-white shadow-lg rounded-2xl p-5 flex-1 min-w-[250px] flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Top Vendors</h3>
          <ul className="space-y-3 overflow-y-auto flex-1">
            {invoices.slice(0, 5).map((inv, idx) => (
              <li key={idx} className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="bg-gray-200 text-gray-800 rounded-full w-7 h-7 flex items-center justify-center font-bold mr-2">{idx + 1}</span>
                <div>
                  <span className="font-semibold">{inv.vendor}</span>
                  <div className="text-gray-500 text-sm">1 invoice</div>
                </div>
                <span className="font-semibold">{inv.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-xl shadow-lg p-5">
        <h3 className="text-lg font-bold mb-4">Invoice History</h3>

        <div className="flex flex-wrap gap-2 mb-4">
          <input
            placeholder="Search invoices, vendors, or invoice numbers..."
            className="flex-1 min-w-[150px] px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none">
            <option>All Statuses</option>
          </select>
          <select className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none">
            <option>All Vendors</option>
          </select>
          <button className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition">Select dates</button>
          <button className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition">Export</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {["Invoice #", "Vendor", "Upload Date", "Amount", "Status", "Confidence", "Actions"].map((col) => (
                  <th key={col} className="p-2 text-gray-600 font-semibold whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, idx) => (
                <tr key={inv.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-2 flex items-center gap-2 whitespace-nowrap">{inv.id}</td>
                  <td className="p-2 whitespace-nowrap">{inv.vendor}</td>
                  <td className="p-2 whitespace-nowrap">{inv.date}</td>
                  <td className="p-2 whitespace-nowrap">{inv.amount}</td>
                  <td className="p-2 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-md text-sm font-medium ${statusClassMap[inv.status]}`}>{inv.status}</span>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-md text-sm font-medium ${statusClassMap[inv.status]}`}>{inv.confidence}</span>
                  </td>
                  <td className="p-2 flex gap-2">
                    <button
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      onClick={() => {
                        if (inv.status === "Needs Review" || inv.status === "Processed") {
                          setActivePage("Review");
                        } else {
                          setActivePage("Processing");
                        }
                      }}
                    >
                      👁️
                    </button>
                    <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                      ⬇️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-3 text-gray-600 gap-2">
          <span>Showing {invoices.length} of {invoices.length} invoices</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition">Previous</button>
            <button className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
