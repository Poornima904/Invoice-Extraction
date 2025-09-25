import React, { useState } from "react";
import Header from "./pages/Header";
import Sidebar from "./pages/Sidebar";

// Pages
import UploadPage from "./pages/UploadPage";
import ReviewPage from "./pages/ReviewPage";
import ProcessingPage from "./pages/ProcessingPage";
import DashboardPage from "./pages/DashboardPage";
import ConfigurationPage from "./components/Configuration";

function App() {
  const [activePage, setActivePage] = useState("Upload");

  const renderPage = () => {
    switch (activePage) {
      case "Upload":
        return <UploadPage setActivePage={setActivePage} />;
      case "Review":
        return <ReviewPage />;
      case "Processing":
        return <ProcessingPage />;
      case "Dashboard":
        return <DashboardPage setActivePage={setActivePage} />;
      case "Configuration":
        return <ConfigurationPage />;
      default:
        return <UploadPage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header className="sticky top-0 z-50" />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden md:block md:w-1/5">
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
        </div>

        {/* Mobile Sidebar */}
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 bg-white min-h-[calc(100vh-53px)] mt-[53px] transition-all duration-300">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
