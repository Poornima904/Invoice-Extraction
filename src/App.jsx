import React, { useState } from "react";
import "./App.css";
import Header from "./pages/Header";
import Sidebar from "./pages/Sidebar";

// Import your actual pages
import UploadPage from "./pages/UploadPage";
import ReviewPage from "./pages/ReviewPage";
import ProcessingPage from "./pages/ProcessingPage";
import DashboardPage from "./pages/DashboardPage";
import ConfigurationPage from "./pages/ConfigurationPage";

function App() {
  const [activePage, setActivePage] = useState("Upload"); // default page

  const renderPage = () => {
    switch (activePage) {
      case "Upload":
        return <UploadPage setActivePage={setActivePage}/>;
      case "Review":
        return <ReviewPage />;
      case "Processing":
        return <ProcessingPage />;
      case "Dashboard":
        return <DashboardPage setActivePage={setActivePage} />;
      case "Configuration":
        return <ConfigurationPage />;
      default:
        return <UploadPage setActivePage={setActivePage}/>;
    }
  };

  return (
    
    
    <div className="app-container">
      <Header />
      <div className="content-wrapper">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="main-content">{renderPage()}</main>
      </div>
    </div>
    
  );
}

export default App;
