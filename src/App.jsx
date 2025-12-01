import React, { useState, useEffect } from "react";
import Header from "./pages/Header";
import Sidebar from "./pages/Sidebar";
import UploadPage from "./pages/UploadPage";
import ReviewPage from "./pages/ReviewPage";
import ProcessingPage from "./pages/ProcessingPage";
import DashboardPage from "./pages/DashboardPage";
import ConfigurationPage from "./components/Configuration";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // login | signup

  const reviewCount = invoices.filter((inv) => inv.status === "Needs Review").length;
  const processingCount = invoices.filter((inv) => inv.status === "Processing").length;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 1024) setExpanded(false);
    else setExpanded(true);
  }, [windowWidth]);

  const renderPage = () => {
    switch (activePage) {
      case "Upload":
        return (
          <UploadPage
            setActivePage={setActivePage}
            uploads={uploads}
            setUploads={setUploads}
            setSelectedInvoice={setSelectedInvoice}
          />
        );
      case "Review":
        return (
          <ReviewPage
            setActivePage={setActivePage}
            uploads={uploads}
            invoiceNumber={selectedInvoice}
          />
        );
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

  // Authentication section
  if (!isAuthenticated) {
    return authMode === "login" ? (
      <LoginPage onLogin={(success, mode) => {
        if (mode === "signup") setAuthMode("signup");
        else if (success) setIsAuthenticated(true);
      }} />
    ) : (
      <SignupPage onSignup={(success, mode) => {
        if (mode === "login") setAuthMode("login");
        else if (success) setIsAuthenticated(true);
      }} />
    );
  }

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
        className="fixed top-[53px] bottom-0 left-0 right-0 bg-white overflow-auto transition-all duration-300"
        style={{
          left: windowWidth >= 1024 ? (expanded ? "224px" : "64px") : "0",
        }}
      >
        <div className="h-full px-3 sm:px-6 md:px-8 lg:px-16">
          <div className="max-w-full lg:max-w-[1500px] mx-auto py-4 sm:py-6">
            {renderPage()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
