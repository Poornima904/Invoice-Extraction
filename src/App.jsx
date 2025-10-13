import React, { useState, useEffect } from "react";
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
const [uploads, setUploads] = useState([]);

  // counts
  const reviewCount = invoices.filter(inv => inv.status === "Needs Review").length;
  const processingCount = invoices.filter(inv => inv.status === "Processing").length;

  // window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // auto collapse sidebar on small screens
  useEffect(() => {
    if (windowWidth < 1024) setExpanded(false);
    else setExpanded(true);
  }, [windowWidth]);

  const renderPage = () => {
    switch (activePage) {
      case "Upload": return <UploadPage setActivePage={setActivePage}  uploads={uploads}
          setUploads={setUploads} setSelectedInvoice={setSelectedInvoice}/>;
      case "Review": return <ReviewPage setActivePage={setActivePage}  uploads={uploads} invoiceNumber={selectedInvoice}/>;
      case "Processing": return <ProcessingPage setActivePage={setActivePage} />;
      case "Dashboard": return <DashboardPage setActivePage={setActivePage} />;
      case "Configuration": return <ConfigurationPage />;
      default: return <UploadPage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Header toggleMobileSidebar={setMobileSidebarOpen} />

      <Sidebar
        expanded={expanded}
        toggleExpand={setExpanded}
        activePage={activePage}
        setActivePage={setActivePage}
        reviewCount={reviewCount}
        processingCount={processingCount}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      <main
        className="transition-all duration-300 min-h-screen bg-white pt-[53px] px-3 sm:px-6 md:px-8 lg:px-16"
        style={{
          marginLeft: windowWidth >= 1024 ? (expanded ? 224 : 64) : 0,
        }}
      >
        <div className="max-w-full lg:max-w-[1500px] mx-auto">{renderPage()}</div>
      </main>
    </div>
  );
}

export default App;
