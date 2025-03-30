"use client"

import { useState } from "react"

function ResearchProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false)

  const getStageBadge = (stage) => {
    switch (stage) {
      case "pre-print":
        return "bg-info"
      case "peer-review":
        return "bg-warning text-dark"
      case "published":
        return "bg-success"
      default:
        return "bg-secondary"
    }
  }

  const getValidationStatusBadge = (status) => {
    switch (status) {
      case "passed":
        return "bg-success"
      case "failed":
        return "bg-danger"
      case "in-progress":
        return "bg-warning text-dark"
      case "pending":
        return "bg-secondary"
      default:
        return "bg-light text-dark"
    }
  }

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title">{project.title}</h5>
          <span className={`badge ${getStageBadge(project.stage)}`}>
            {project.stage.replace("-", " ").charAt(0).toUpperCase() + project.stage.replace("-", " ").slice(1)}
          </span>
        </div>

        <div className="d-flex mb-3">
          <div className="me-3">
            <small className="text-muted d-block">Researcher</small>
            <span>{project.researcher}</span>
          </div>
          <div className="me-3">
            <small className="text-muted d-block">Institution</small>
            <span>{project.institution}</span>
          </div>
          <div>
            <small className="text-muted d-block">Start Date</small>
            <span>{project.startDate}</span>
          </div>
        </div>

        <div className="mb-3">
          <small className="text-muted d-block">Abstract</small>
          <p className="card-text">{project.abstract}</p>
        </div>

        <div className="mb-3">
          <small className="text-muted d-block">Keywords</small>
          <div>
            {project.keywords.map((keyword, index) => (
              <span className="badge bg-light text-dark me-2 mb-1" key={index}>
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">Validation Status</h6>
          <button className="btn btn-sm btn-link p-0" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Hide Details" : "Show Details"}
          </button>
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between mb-2">
            <span>Pre-print</span>
            <span className={`badge ${getValidationStatusBadge(project.validationStatus.preprint.status)}`}>
              {project.validationStatus.preprint.status}
            </span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Peer Review</span>
            <span className={`badge ${getValidationStatusBadge(project.validationStatus.peerReview.status)}`}>
              {project.validationStatus.peerReview.status}
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Publication</span>
            <span className={`badge ${getValidationStatusBadge(project.validationStatus.publication.status)}`}>
              {project.validationStatus.publication.status}
            </span>
          </div>
        </div>

        {expanded && (
          <div className="mb-3">
            <h6>Validation Details</h6>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Stage</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Pre-print</td>
                    <td>
                      <span className={`badge ${getValidationStatusBadge(project.validationStatus.preprint.status)}`}>
                        {project.validationStatus.preprint.status}
                      </span>
                    </td>
                    <td>{project.validationStatus.preprint.date || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Peer Review</td>
                    <td>
                      <span className={`badge ${getValidationStatusBadge(project.validationStatus.peerReview.status)}`}>
                        {project.validationStatus.peerReview.status}
                      </span>
                    </td>
                    <td>{project.validationStatus.peerReview.date || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Publication</td>
                    <td>
                      <span
                        className={`badge ${getValidationStatusBadge(project.validationStatus.publication.status)}`}
                      >
                        {project.validationStatus.publication.status}
                      </span>
                    </td>
                    <td>{project.validationStatus.publication.date || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h6 className="mt-3">Collaborators</h6>
            <ul className="list-group list-group-flush">
              {project.collaborators.map((collaborator, index) => (
                <li className="list-group-item px-0 py-1" key={index}>
                  {collaborator}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center">
          <div>
            {project.citations && (
              <span className="badge bg-info me-2">
                <i className="bi bi-quote me-1"></i> {project.citations} citations
              </span>
            )}
          </div>

          <button className="btn btn-sm btn-primary">
            <i className="bi bi-file-earmark-text me-1"></i>
            View Project
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResearchProjectCard

