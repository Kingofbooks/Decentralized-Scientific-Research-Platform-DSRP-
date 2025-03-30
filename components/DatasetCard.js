"use client"

import { useState } from "react"
import DataVersionModal from "./DataVersionModal"

function DatasetCard({ dataset, onDownload }) {
  const [showVersions, setShowVersions] = useState(false)

  return (
    <>
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title">{dataset.title}</h5>
          <p className="card-text text-muted">{dataset.description}</p>

          <div className="d-flex mb-3">
            <div className="me-3">
              <small className="text-muted d-block">Author</small>
              <span>{dataset.author}</span>
            </div>
            <div className="me-3">
              <small className="text-muted d-block">Version</small>
              <span>{dataset.version}</span>
            </div>
            <div>
              <small className="text-muted d-block">Date</small>
              <span>{dataset.date}</span>
            </div>
          </div>

          <div className="d-flex mb-3">
            <div className="me-3">
              <small className="text-muted d-block">Size</small>
              <span>{dataset.size}</span>
            </div>
            <div className="me-3">
              <small className="text-muted d-block">Format</small>
              <span>{dataset.format}</span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <span className="badge bg-primary me-2">
                <i className="bi bi-download me-1"></i> {dataset.downloads}
              </span>
              <span className="badge bg-info">
                <i className="bi bi-quote me-1"></i> {dataset.citations}
              </span>
            </div>
            <div>
              <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => setShowVersions(true)}>
                <i className="bi bi-clock-history me-1"></i>
                Versions
              </button>
              <button className="btn btn-sm btn-primary" onClick={() => onDownload(dataset.fileUrl)}>
                <i className="bi bi-download me-1"></i>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      <DataVersionModal show={showVersions} onHide={() => setShowVersions(false)} dataset={dataset} />
    </>
  )
}

export default DatasetCard
