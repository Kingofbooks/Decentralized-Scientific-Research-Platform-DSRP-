"use client"

import { useState } from "react"

function FundingProposalCard({ proposal }) {
  const [expanded, setExpanded] = useState(false)

  const getStatusBadge = (status) => {
    switch (status) {
      case "voting":
        return "bg-warning text-dark"
      case "active":
        return "bg-success"
      case "completed":
        return "bg-secondary"
      default:
        return "bg-primary"
    }
  }

  const getMilestoneStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return "bg-success"
      case "in-progress":
        return "bg-primary"
      case "pending":
        return "bg-secondary"
      default:
        return "bg-light text-dark"
    }
  }

  const completedMilestones = proposal.milestones.filter((m) => m.status === "completed").length
  const totalMilestones = proposal.milestones.length
  const progress = (completedMilestones / totalMilestones) * 100

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title">{proposal.title}</h5>
          <span className={`badge ${getStatusBadge(proposal.status)}`}>
            {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
          </span>
        </div>

        <div className="d-flex mb-3">
          <div className="me-3">
            <small className="text-muted d-block">Researcher</small>
            <span>{proposal.researcher}</span>
          </div>
          <div className="me-3">
            <small className="text-muted d-block">Institution</small>
            <span>{proposal.institution}</span>
          </div>
        </div>

        <div className="d-flex mb-3">
          <div className="me-3">
            <small className="text-muted d-block">Amount</small>
            <span>${proposal.amount.toLocaleString()}</span>
          </div>
          <div className="me-3">
            <small className="text-muted d-block">Duration</small>
            <span>{proposal.duration}</span>
          </div>
          <div>
            <small className="text-muted d-block">Votes</small>
            <span>{proposal.votes}</span>
          </div>
        </div>

        <div className="mb-3">
          <small className="text-muted d-block">Progress</small>
          <div className="progress" style={{ height: "8px" }}>
            <div className="progress-bar bg-success" style={{ width: `${progress}%` }}></div>
          </div>
          <small className="text-muted">
            {completedMilestones} of {totalMilestones} milestones completed
          </small>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-sm btn-link p-0" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Hide Milestones" : "Show Milestones"}
          </button>

          {proposal.status === "voting" && (
            <button className="btn btn-sm btn-primary">
              <i className="bi bi-check-circle me-1"></i>
              Vote
            </button>
          )}
        </div>

        {expanded && (
          <div className="mt-3">
            <h6>Milestones</h6>
            <div className="list-group">
              {proposal.milestones.map((milestone) => (
                <div className="list-group-item" key={milestone.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">{milestone.title}</h6>
                      <small>${milestone.funds.toLocaleString()}</small>
                    </div>
                    <span className={`badge ${getMilestoneStatusBadge(milestone.status)}`}>{milestone.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FundingProposalCard

