"use client"

import { useState } from "react"
import ManuscriptCard from "../components/ManuscriptCard"
import ReviewModal from "../components/ReviewModal"

function PeerReview({ user }) {
  const [manuscripts, setManuscripts] = useState([
    {
      id: 1,
      title: "Advances in CRISPR Technology for Genetic Disease Treatment",
      author: "Dr. Michael Johnson",
      institution: "MIT",
      date: "2025-03-01",
      status: "pending-review",
      abstract:
        "This paper presents novel CRISPR-based approaches for treating genetic disorders, with a focus on improving specificity and reducing off-target effects.",
      keywords: ["CRISPR", "genetic disease", "gene therapy"],
      reviewDueDate: "2025-03-15",
    },
    {
      id: 2,
      title: "Neural Networks for Protein Structure Prediction",
      author: "Dr. Sarah Williams",
      institution: "Stanford University",
      date: "2025-02-20",
      status: "pending-review",
      abstract:
        "We present a deep learning approach for predicting protein structures with higher accuracy than existing methods, validated on a diverse set of proteins.",
      keywords: ["neural networks", "protein structure", "deep learning"],
      reviewDueDate: "2025-03-20",
    },
    {
      id: 3,
      title: "Gene Expression Analysis in Cancer Cells",
      author: "Dr. Jane Smith",
      institution: "University of Science",
      date: "2025-02-15",
      status: "reviewed",
      abstract:
        "This study analyzes gene expression patterns in various cancer cell lines to identify potential therapeutic targets and biomarkers.",
      keywords: ["gene expression", "cancer", "biomarkers"],
      reviewDate: "2025-02-28",
      reviewScore: 85,
    },
  ])

  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedManuscript, setSelectedManuscript] = useState(null)
  const [activeTab, setActiveTab] = useState("to-review")

  const handleReviewClick = (manuscript) => {
    setSelectedManuscript(manuscript)
    setShowReviewModal(true)
  }

  const handleSubmitReview = (review) => {
    const updatedManuscripts = manuscripts.map((m) =>
      m.id === selectedManuscript.id
        ? {
            ...m,
            status: "reviewed",
            reviewDate: new Date().toISOString().split("T")[0],
            reviewScore: review.overallScore,
          }
        : m,
    )
    setManuscripts(updatedManuscripts)
    setShowReviewModal(false)
  }

  const filteredManuscripts = manuscripts.filter((manuscript) => {
    if (activeTab === "to-review") return manuscript.status === "pending-review"
    if (activeTab === "reviewed") return manuscript.status === "reviewed"
    if (activeTab === "my-submissions") return manuscript.author === user.name
    return true
  })

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <h1>Peer Review</h1>
          <p className="lead">Decentralized and anonymous peer review process</p>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "to-review" ? "active" : ""}`}
            onClick={() => setActiveTab("to-review")}
          >
            To Review
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "reviewed" ? "active" : ""}`}
            onClick={() => setActiveTab("reviewed")}
          >
            Reviewed
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "my-submissions" ? "active" : ""}`}
            onClick={() => setActiveTab("my-submissions")}
          >
            My Submissions
          </button>
        </li>
      </ul>

      <div className="row g-4">
        {filteredManuscripts.map((manuscript) => (
          <div className="col-md-6" key={manuscript.id}>
            <ManuscriptCard
              manuscript={manuscript}
              onReviewClick={handleReviewClick}
              isReviewer={activeTab !== "my-submissions"}
            />
          </div>
        ))}
      </div>

      {filteredManuscripts.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-journal-x fs-1 text-muted"></i>
          <p className="mt-3">No manuscripts found in this category.</p>
        </div>
      )}

      {selectedManuscript && (
        <ReviewModal
          show={showReviewModal}
          onHide={() => setShowReviewModal(false)}
          manuscript={selectedManuscript}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  )
}

export default PeerReview

