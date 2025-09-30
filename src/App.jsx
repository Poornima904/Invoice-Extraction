// App.js

import React, { useState } from "react";
import Header from "./pages/Header";
import Sidebar from "./pages/Sidebar";

import UploadPage from "./pages/UploadPage";
import ReviewPage from "./pages/ReviewPage";
import ProcessingPage from "./pages/ProcessingPage";
import DashboardPage from "./pages/DashboardPage";
import ConfigurationPage from "./components/Configuration";

const invoices = [
  { id: 1, status: "Processed" },
  { id: 2, status: "Needs Review" },
  { id: 3, status: "Processing" },
  { id: 4, status: "Needs Review" },
  { id: 5, status: "Processing" },
];

function App() {
  const [expanded, setExpanded] = useState(true);
  const [activePage, setActivePage] = useState("Upload");

  // Compute counts for badges
  const reviewCount = invoices.filter(inv => inv.status === "Needs Review").length;
  const processingCount = invoices.filter(inv => inv.status === "Processing").length;

  const HEADER_HEIGHT = 53;
  const SIDEBAR_WIDTH_EXPANDED = 224;
  const SIDEBAR_WIDTH_COLLAPSED = 64;
  const sidebarWidth = expanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED;

  const renderPage = () => {
    switch (activePage) {
      case "Upload":
        return <UploadPage setActivePage={setActivePage} />;
      case "Review":
        return <ReviewPage setActivePage={setActivePage} />;
      case "Processing":
        return <ProcessingPage setActivePage={setActivePage} />;
      case "Dashboard":
        return <DashboardPage setActivePage={setActivePage} />;
      case "Configuration":
        return <ConfigurationPage />;
      default:
        return <UploadPage setActivePage={setActivePage} />;
    }
  };

  return (
    <div>
      <Header />
      <Sidebar
        expanded={expanded}
        toggleExpand={setExpanded}
        activePage={activePage}
        setActivePage={setActivePage}
        reviewCount={reviewCount}
        processingCount={processingCount}
      />

      <main
        style={{
          marginLeft: sidebarWidth,
          paddingTop: HEADER_HEIGHT,
          transition: "margin-left 0.3s cubic-bezier(.4,0,.2,1)",
          minHeight: "100vh",
          backgroundColor: "white",
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <div className="max-w-[1500px] mx-auto">{renderPage()}</div>
      </main>
    </div>
  );
}

export default App;
