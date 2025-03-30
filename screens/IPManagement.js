"use client"

import { useState } from "react"
import IPCard from "../components/IPCard"
import IPRegistrationModal from "../components/IPRegistrationModal"

function IPManagement({ user }) {
  const [intellectualProperty, setIntellectualProperty] = useState([
    {
      id: 1,
      title: "Novel Gene Therapy Method",
      type: "method",
      owner: "Dr. Jane Smith",
      institution: "University of Science",
      registrationDate: "2025-01-15",
      status: "registered",
      description: "A novel method for delivering gene therapy using modified viral vectors with enhanced specificity.",
      licenses: [
        { id: 1, licensee: "BioTech Inc.", type: "commercial", fee: 5000, date: "2025-02-10" },
        { id: 2, licensee: "Stanford University", type: "academic", fee: 0, date: "2025-02-15" },
      ],
    },
    {
      id: 2,
      title: "Protein Structure Prediction Algorithm",
      type: "software",
      owner: "Dr. Jane Smith",
      institution: "University of Science",
      registrationDate: "2024-11-20",
      status: "registered",
      description: "An algorithm for predicting protein structures using deep learning techniques.",
      licenses: [{ id: 1, licensee: "AI Research Lab", type: "academic", fee: 0, date: "2024-12-05" }],
    },
    {
      id: 3,
      title: "Genomic Variants Database",
      type: "data",
      owner: "Dr. Michael Johnson",
      institution: "MIT",
      registrationDate: "2024-10-10",
      status: "pending",
      description: "A comprehensive database of genomic variants associated with rare diseases.",
      licenses: [],
    },
  ])

  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const handleRegisterIP = (newIP) => {
    setIntellectualProperty([
      ...intellectualProperty,
      {
        id: intellectualProperty.length + 1,
        ...newIP,
        owner: user.name,
        institution: user.institution,
        registrationDate: new Date().toISOString().split("T")[0],
        status: "pending",
        licenses: [],
      },
    ])
    setShowRegistrationModal(false)
  }

  const filteredIP = intellectualProperty.filter((ip) => {
    if (activeTab === "all") return true
    if (activeTab === "my-ip") return ip.owner === user.name
    if (activeTab === "registered") return ip.status === "registered"
    if (activeTab === "pending") return ip.status === "pending"
    return true
  })

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>IP Rights Management</h1>
          <p className="lead">Register and manage intellectual property rights</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowRegistrationModal(true)}>
          <i className="bi bi-shield-lock me-2"></i>
          Register IP
        </button>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
            All IP
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "my-ip" ? "active" : ""}`} onClick={() => setActiveTab("my-ip")}>
            My IP
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "registered" ? "active" : ""}`}
            onClick={() => setActiveTab("registered")}
          >
            Registered
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
        </li>
      </ul>

      <div className="row g-4">
        {filteredIP.map((ip) => (
          <div className="col-md-6" key={ip.id}>
            <IPCard ip={ip} />
          </div>
        ))}
      </div>

      {filteredIP.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-shield-x fs-1 text-muted"></i>
          <p className="mt-3">No intellectual property found matching your criteria.</p>
        </div>
      )}

      <IPRegistrationModal
        show={showRegistrationModal}
        onHide={() => setShowRegistrationModal(false)}
        onRegister={handleRegisterIP}
      />
    </div>
  )
}

export default IPManagement

