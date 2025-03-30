"use client"

import { useState } from "react"
import ContributionCard from "../components/ContributionCard"

function ReputationDashboard({ user }) {
  const [contributions, setContributions] = useState([
    {
      id: 1,
      type: "research",
      title: "Gene Expression Analysis in Cancer Cells",
      date: "2025-02-15",
      tokens: 45,
      impact: "high",
      citations: 12,
    },
    {
      id: 2,
      type: "review",
      title: "Peer Review: Advances in CRISPR Technology",
      date: "2025-01-20",
      tokens: 15,
      impact: "medium",
      quality: 92,
    },
    {
      id: 3,
      type: "data",
      title: "Genomic Variants in Rare Diseases Dataset",
      date: "2024-11-20",
      tokens: 30,
      impact: "medium",
      downloads: 29,
    },
    {
      id: 4,
      type: "methodology",
      title: "Novel Protein Folding Algorithm",
      date: "2024-10-05",
      tokens: 25,
      impact: "high",
      adoptions: 8,
    },
  ])

  const [activeTab, setActiveTab] = useState("overview")

  // Calculate reputation metrics
  const totalTokens = contributions.reduce((sum, item) => sum + item.tokens, 0)
  const researchContributions = contributions.filter((c) => c.type === "research").length
  const reviewContributions = contributions.filter((c) => c.type === "review").length
  const dataContributions = contributions.filter((c) => c.type === "data").length
  const methodologyContributions = contributions.filter((c) => c.type === "methodology").length

  // Top researchers data (mock)
  const topResearchers = [
    { id: 1, name: "Dr. Sarah Williams", reputation: 95, tokens: 320, institution: "Stanford University" },
    { id: 2, name: "Dr. Jane Smith", reputation: 85, tokens: 250, institution: "University of Science" },
    { id: 3, name: "Dr. Michael Johnson", reputation: 82, tokens: 235, institution: "MIT" },
    { id: 4, name: "Dr. David Chen", reputation: 78, tokens: 210, institution: "Harvard University" },
    { id: 5, name: "Dr. Emily Brown", reputation: 75, tokens: 195, institution: "Oxford University" },
  ]

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <h1>Reputation Dashboard</h1>
          <p className="lead">Track your contributions and reputation in the scientific community</p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3 mb-3 mb-md-0">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <div className="display-4 fw-bold text-primary">{user.reputation}</div>
              <p className="text-muted mb-0">Reputation Score</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3 mb-md-0">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <div className="display-4 fw-bold text-warning">{totalTokens}</div>
              <p className="text-muted mb-0">Total Tokens</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Contribution Breakdown</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Research Papers</span>
                <span className="badge bg-primary">{researchContributions}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Peer Reviews</span>
                <span className="badge bg-info">{reviewContributions}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Datasets</span>
                <span className="badge bg-success">{dataContributions}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Methodologies</span>
                <span className="badge bg-secondary">{methodologyContributions}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "contributions" ? "active" : ""}`}
            onClick={() => setActiveTab("contributions")}
          >
            My Contributions
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "leaderboard" ? "active" : ""}`}
            onClick={() => setActiveTab("leaderboard")}
          >
            Leaderboard
          </button>
        </li>
      </ul>

      {activeTab === "overview" && (
        <div className="row">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <div className="card shadow-sm">
              <div className="card-header">
                <h5 className="mb-0">Reputation Growth</h5>
              </div>
              <div className="card-body">
                <div className="text-center py-5">
                  <p className="text-muted">Reputation growth chart will be displayed here</p>
                  <div className="bg-light p-3 rounded">
                    <i className="bi bi-graph-up fs-1 text-primary"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header">
                <h5 className="mb-0">Token Distribution</h5>
              </div>
              <div className="card-body">
                <div className="text-center py-5">
                  <p className="text-muted">Token distribution chart will be displayed here</p>
                  <div className="bg-light p-3 rounded">
                    <i className="bi bi-pie-chart fs-1 text-warning"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "contributions" && (
        <div className="row g-4">
          {contributions.map((contribution) => (
            <div className="col-md-6" key={contribution.id}>
              <ContributionCard contribution={contribution} />
            </div>
          ))}
        </div>
      )}

      {activeTab === "leaderboard" && (
        <div className="card shadow-sm">
          <div className="card-header">
            <h5 className="mb-0">Top Researchers</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Researcher</th>
                    <th>Institution</th>
                    <th>Reputation</th>
                    <th>Tokens</th>
                  </tr>
                </thead>
                <tbody>
                  {topResearchers.map((researcher, index) => (
                    <tr key={researcher.id}>
                      <td>{index + 1}</td>
                      <td>{researcher.name}</td>
                      <td>{researcher.institution}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="progress flex-grow-1 me-2" style={{ height: "8px" }}>
                            <div
                              className="progress-bar bg-primary"
                              style={{ width: `${researcher.reputation}%` }}
                            ></div>
                          </div>
                          <span>{researcher.reputation}</span>
                        </div>
                      </td>
                      <td>{researcher.tokens}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReputationDashboard

