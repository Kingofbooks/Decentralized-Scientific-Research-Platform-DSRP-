"use client"

import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

// Components
import Navbar from "./components/Navbar"
import Dashboard from "./screens/Dashboard"
import DataRepository from "./screens/DataRepository"
import ReputationDashboard from "./screens/ReputationDashboard"
import FundingDashboard from "./screens/FundingDashboard"
import PeerReview from "./screens/PeerReview"
import IPManagement from "./screens/IPManagement"
import ResearchLifecycle from "./screens/ResearchLifecycle"
import UserProfile from "./screens/UserProfile"
import Collaboration from "./screens/Collaboration"
import Search from "./screens/Search"
import DataUploadModal from "./components/DataUploadModal" // Import the DataUploadModal component

function App() {
  const [currentScreen, setCurrentScreen] = useState("dashboard")
  const [user, setUser] = useState({
    id: "1",
    name: "Dr. Jane Smith",
    institution: "University of Science",
    role: "Researcher",
    reputation: 85,
    tokens: 250,
    researchInterests: ["Molecular Biology", "Genetics", "Bioinformatics"],
  })

  const [showUploadModal, setShowUploadModal] = useState(false) // State for modal visibility

  // Navigation handler
  const navigateTo = (screen) => {
    setCurrentScreen(screen)
    window.scrollTo(0, 0)
  }

  // Handle the file upload
  const handleFileUpload = (formData) => {
    console.log("File upload data:", formData)
    // Add your file upload logic here (e.g., API call to upload the data)
    setShowUploadModal(false) // Close modal after uploading
  }

  // Render the current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <Dashboard user={user} navigateTo={navigateTo} />
      case "data-repository":
        return <DataRepository user={user} navigateTo={navigateTo} />
      case "reputation":
        return <ReputationDashboard user={user} navigateTo={navigateTo} />
      case "funding":
        return <FundingDashboard user={user} navigateTo={navigateTo} />
      case "peer-review":
        return <PeerReview user={user} navigateTo={navigateTo} />
      case "ip-management":
        return <IPManagement user={user} navigateTo={navigateTo} />
      case "research-lifecycle":
        return <ResearchLifecycle user={user} navigateTo={navigateTo} />
      case "profile":
        return <UserProfile user={user} setUser={setUser} navigateTo={navigateTo} />
      case "collaboration":
        return <Collaboration user={user} navigateTo={navigateTo} />
      case "search":
        return <Search user={user} navigateTo={navigateTo} />
      default:
        return <Dashboard user={user} navigateTo={navigateTo} />
    }
  }

  return (
    <div className="app-container">
      <Navbar currentScreen={currentScreen} navigateTo={navigateTo} user={user} />
      <main className="main-content">
        {renderScreen()}
        
        {/* Add button to open the modal */}
        <button className="btn btn-primary" onClick={() => setShowUploadModal(true)}>
          Upload Dataset
        </button>
        
        {/* Integrate DataUploadModal */}
        <DataUploadModal
          show={showUploadModal}
          onHide={() => setShowUploadModal(false)} // Close modal
          onUpload={handleFileUpload} // Handle file upload
        />
      </main>
      <footer className="footer bg-dark text-light py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Decentralized Scientific Research Platform</h5>
              <p>Revolutionizing scientific research through blockchain technology</p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <button className="btn btn-link text-light p-0" onClick={() => navigateTo("dashboard")}>
                    Dashboard
                  </button>
                </li>
                <li>
                  <button className="btn btn-link text-light p-0" onClick={() => navigateTo("data-repository")}>
                    Data Repository
                  </button>
                </li>
                <li>
                  <button className="btn btn-link text-light p-0" onClick={() => navigateTo("reputation")}>
                    Reputation System
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Contact</h5>
              <p>support@dsrp.io</p>
              <p>© 2025 DSRP. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
