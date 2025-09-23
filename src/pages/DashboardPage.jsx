import React from "react";
import "./DashboardPage.css";

const invoices = [
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
  {
    id: "ADBE-2024-0156",
    vendor: "Adobe Inc.",
    date: "2024-02-15",
    amount: "USD 8,949.75",
    status: "Needs Review",
    confidence: "82%",
  },
  {
    id: "SFDC-2024-7891",
    vendor: "Salesforce Inc.",
    date: "2024-03-01",
    amount: "USD 45,600",
    status: "Processing",
    confidence: "91%",
  },
  {
    id: "ZM-2024-0445",
    vendor: "Zoom Video Communications",
    date: "2024-01-25",
    amount: "USD 7,188",
    status: "Processed",
    confidence: "97%",
  },
  {
    id: "MC-2024-1256",
    vendor: "The Rocket Science Group LLC",
    date: "2024-02-20",
    amount: "USD 3,288",
    status: "Needs Review",
    confidence: "76%",
  },
  {
    id: "DBX-2024-3344",
    vendor: "Dropbox Inc.",
    date: "2024-03-10",
    amount: "USD 4,800",
    status: "Failed",
    confidence: "52%",
  },
  {
    id: "TEAM-2024-0789",
    vendor: "Atlassian Corporation",
    date: "2024-01-30",
    amount: "USD 12,960",
    status: "Processed",
    confidence: "93%",
  },
  {
    id: "HUBS-2024-5677",
    vendor: "HubSpot Inc.",
    date: "2024-02-05",
    amount: "USD 18,000",
    status: "Processing",
    confidence: "87%",
  },
  {
    id: "NOT-2024-8899",
    vendor: "Notion Labs Inc.",
    date: "2024-03-15",
    amount: "USD 960",
    status: "Needs Review",
    confidence: "81%",
  },
  {
    id: "FIG-2024-2233",
    vendor: "Figma Inc.",
    date: "2024-01-12",
    amount: "USD 1,800",
    status: "Processed",
    confidence: "95%",
  },
  {
    id: "VCL-2024-1122",
    vendor: "Vercel Inc.",
    date: "2024-02-28",
    amount: "USD 2,400",
    status: "Processing",
    confidence: "88%",
  },
];

const statusClassMap = {
  Processed: "status-green",
  Processing: "status-blue",
  "Needs Review": "status-yellow",
  Failed: "status-red",
};

const confidenceClassMap = {
  "96%": "status-green",
  "78%": "status-yellow",
  "89%": "status-green",
  "45%": "status-red",
  "94%": "status-green",
  "82%": "status-yellow",
  "91%": "status-green",
  "97%": "status-green",
  "76%": "status-yellow",
  "52%": "status-red",
  "93%": "status-green",
  "87%": "status-yellow",
  "81%": "status-yellow",
  "95%": "status-green",
  "88%": "status-yellow",
};

const recentActivityItems = [
  {
    title: "Invoice processed",
    subtitle: "MS-2024-001",
    time: "5 minutes ago",
  },
  {
    title: "Review required",
    subtitle: "AWS-2024-156",
    time: "12 minutes ago",
  },
  {
    title: "Processing started",
    subtitle: "VCL-2024-1122",
    time: "25 minutes ago",
  },
  { title: "Invoice uploaded", subtitle: "NOT-2024-8899", time: "1 hour ago" },
  {
    title: "Processing failed",
    subtitle: "DBX-2024-3344",
    time: "2 hours ago",
  },
];

const topVendors = [
  { rank: 1, name: "Salesforce Inc.", invoices: 1, amount: "$45,600" },
  { rank: 2, name: "Microsoft Corporation", invoices: 1, amount: "$24,850" },
  {
    rank: 3,
    name: "Amazon Web Services Inc.",
    invoices: 1,
    amount: "$18,750.5",
  },
  { rank: 4, name: "HubSpot Inc.", invoices: 1, amount: "$18,000" },
  { rank: 5, name: "Slack Technologies Inc.", invoices: 1, amount: "$15,600" },
];
const DashboardPage = ({ setActivePage }) => (
  <div className="dashboard-container">
    <div className="dashboard-header-row">
      <div className="dashboard-card">
        <div className="card-header">
          <span>Total Invoices</span>
          <span className="card-icon">{/* file icon */}</span>
        </div>
        <div className="card-value">15</div>
        <div className="card-desc up">+12.5% this month</div>
      </div>
      <div className="dashboard-card">
        <div className="card-header">
          <span>Total Value</span>
          <span className="card-icon">{/* dollar icon */}</span>
        </div>
        <div className="card-value">$169,792.24</div>
        <div className="card-desc up">+ $25.2K this month</div>
      </div>
      <div className="dashboard-card">
        <div className="card-header">
          <span>Avg Processing Time</span>
          <span className="card-icon">{/* clock icon */}</span>
        </div>
        <div className="card-value">2.3 hours</div>
        <div className="card-desc up">-0.8min improvement</div>
      </div>
      <div className="dashboard-card">
        <div className="card-header">
          <span>Success Rate</span>
          <span className="card-icon">{/* graph icon */}</span>
        </div>
        <div className="card-value">85.2%</div>
        <div className="card-desc up">+2.1% this month</div>
      </div>
    </div>

    <div className="dashboard-bottom-row">
      {/* Recent Activity */}
      <div className="dashboard-section recent-activity">
        <div className="section-header">
          <span className="section-icon">
            {/* Pulse icon SVG */}
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="#222"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <polyline points="2 12 7 7 13 13 19 6" />
              <circle cx="19" cy="6" r="2" />
            </svg>
          </span>
          <span className="section-title">Recent Activity</span>
        </div>
        <ul className="section-list">
          {recentActivityItems.map((item, index) => (
            <li key={index}>
              <div>
                <span className="bold">{item.title}</span>
                <div className="sub-title">{item.subtitle}</div>
              </div>
              <span className="activity-time">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Top Vendors */}
      <div className="dashboard-section top-vendors">
        <div className="section-header">
          <span className="section-icon">
            {/* Bar chart icon SVG */}
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="#222"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M6 20V8l6-4 6 4v12" />
              <rect x="10" y="16" width="4" height="4" />
            </svg>
          </span>
          <span className="section-title">Top Vendors</span>
        </div>
        <ul className="section-list">
          {topVendors.map((vendor) => (
            <li key={vendor.rank}>
              <span className="vendor-rank">{vendor.rank}</span>
              <div>
                <span className="bold">{vendor.name}</span>
                <div className="vendor-invoice">
                  {vendor.invoices} invoice{vendor.invoices > 1 ? "s" : ""}
                </div>
              </div>
              <span className="vendor-amount">{vendor.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Invoice History Table Section */}
    <div className="ih-card">
      <div className="ih-title">Invoice History</div>
      <div className="ih-toolbar">
        <input
          className="ih-search"
          placeholder="Search invoices, vendors, or invoice numbers..."
        />
        <select>
          <option>All Statuses</option>
        </select>
        <select>
          <option>All Vendors</option>
        </select>
        <button className="ih-btn">Select dates</button>
        <button className="ih-btn">Export</button>
      </div>
      <div className="ih-table-wrapper">
        <table className="ih-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Vendor</th>
              <th>Upload Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Confidence</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td>
                  <span className="ih-fileicon" /> {inv.id}
                </td>
                <td>{inv.vendor}</td>
                <td>{inv.date}</td>
                <td>{inv.amount}</td>
                <td>
                  <span className={`ih-status ${statusClassMap[inv.status]}`}>
                    {inv.status}
                  </span>
                </td>
                <td>
                  <span
                    className={`ih-status ${
                      confidenceClassMap[inv.confidence]
                    }`}
                  >
                    {inv.confidence}
                  </span>
                </td>
                <td>
                  <button
                    className="ih-action-btn"
                    title="View"
                    onClick={() => {
                      if (
                        inv.status === "Needs Review" ||
                        inv.status === "Processed"
                      ) {
                        setActivePage("Review");
                      } else if (
                        inv.status === "Processing" ||
                        inv.status === "Failed"
                      ) {
                        setActivePage("Processing");
                      } else {
                        setActivePage("Dashboard"); // or default fallback
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="#222"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button className="ih-action-btn" title="Download">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="#222"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ih-footer">
        Showing {invoices.length} of {invoices.length} invoices
        <div>
          <button className="ih-btn">Previous</button>
          <button className="ih-btn">Next</button>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardPage;
