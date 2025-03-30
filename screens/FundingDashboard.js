"use client"

import { useState } from "react"
import FundingProposalCard from "../components/FundingProposalCard"
import FundingProposalModal from "../components/FundingProposalModal"

function FundingDashboard({ user }) {
  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: "Novel Gene Therapy for Rare Genetic Disorders",
      researcher: "Dr. Jane Smith",
      institution: "University of Science",
      amount: 75000,
      duration: "18 months",
      status: "active",
      votes: 28,
      milestones: [
        { id: 1, title: "Initial research setup", status: "completed", funds: 15000 },
        { id: 2, title: "Preliminary data collection", status: "in-progress", funds: 25000 },
        { id: 3, title: "Data analysis and validation", status: "pending", funds: 20000 },
        { id: 4, title: "Final report and publication", status: "pending", funds: 15000 },
      ],
    },
    {
      id: 2,
      title: "AI-Driven Drug Discovery Platform",
      researcher: "Dr. Michael Johnson",
      institution: "MIT",
      amount: 120000,
      duration: "24 months",
      status: "voting",
      votes: 45,
      milestones: [
        { id: 1, title: "Platform architecture design", status: "pending", funds: 30000 },
        { id: 2, title: "Algorithm development", status: "pending", funds: 40000 },
        { id: 3, title: "Training and validation", status: "pending", funds: 30000 },
        { id: 4, title: "Integration and testing", status: "pending", funds: 20000 },
      ],
    },
    {
      id: 3,
      title: "Genomic Analysis of Antibiotic Resistance",
      researcher: "Dr. Sarah Williams",
      institution: "Stanford University",
      amount: 95000,
      duration: "20 months",
      status: "completed",
      votes: 32,
      milestones: [
        { id: 1, title: "Sample collection", status: "completed", funds: 20000 },
        { id: 2, title: "Genomic sequencing", status: "completed", funds: 35000 },
        { id: 3, title: "Bioinformatic analysis", status: "completed", funds: 25000 },
        { id: 4, title: "Publication and data sharing", status: "completed", funds: 15000 },
      ],
    },
  ])

  const [showProposalModal, setShowProposalModal] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const handleCreateProposal = (newProposal) => {
    setProposals([
      ...proposals,
      {
        id: proposals.length + 1,
        ...newProposal,
        researcher: user.name,
        institution: user.institution,
        status: "voting",
        votes: 0,
      },
    ])
    setShowProposalModal(false)
  }

  const filteredProposals = proposals.filter((proposal) => {
    if (activeTab === "all") return true
    if (activeTab === "my-proposals") return proposal.researcher === user.name
    if (activeTab === "voting") return proposal.status === "voting"
    if (activeTab === "active") return proposal.status === "active"
    if (activeTab === "completed") return proposal.status === "completed"
    return true
  })

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Research Funding</h1>
          <p className="lead">Smart contract-based funding for transparent research support</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowProposalModal(true)}>
          <i className="bi bi-plus-circle me-2"></i>
          Create Proposal
        </button>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
            All Proposals
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "my-proposals" ? "active" : ""}`}
            onClick={() => setActiveTab("my-proposals")}
          >
            My Proposals
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "voting" ? "active" : ""}`}
            onClick={() => setActiveTab("voting")}
          >
            Voting
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "active" ? "active" : ""}`}
            onClick={() => setActiveTab("active")}
          >
            Active
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </li>
      </ul>

      <div className="row g-4">
        {filteredProposals.map((proposal) => (
          <div className="col-md-6" key={proposal.id}>
            <FundingProposalCard proposal={proposal} />
          </div>
        ))}
      </div>

      {filteredProposals.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-clipboard-x fs-1 text-muted"></i>
          <p className="mt-3">No proposals found matching your criteria.</p>
        </div>
      )}

      <FundingProposalModal
        show={showProposalModal}
        onHide={() => setShowProposalModal(false)}
        onCreate={handleCreateProposal}
      />
    </div>
  )
}

export default FundingDashboard

