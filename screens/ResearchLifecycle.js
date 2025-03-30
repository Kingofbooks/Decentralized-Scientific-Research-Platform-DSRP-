"use client"

import { useState } from "react"
import ResearchProjectCard from "../components/ResearchProjectCard"

function ResearchLifecycle({ user }) {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Gene Expression Analysis in Cancer Cells",
      researcher: "Dr. Jane Smith",
      institution: "University of Science",
      stage: "published",
      startDate: "2024-09-15",
      endDate: "2025-02-15",
      abstract:
        "This study analyzes gene expression patterns in various cancer cell lines to identify potential therapeutic targets and biomarkers.",
      keywords: ["gene expression", "cancer", "biomarkers"],
      validationStatus: {
        preprint: { status: "passed", date: "2024-11-10" },
        peerReview: { status: "passed", date: "2025-01-20" },
        publication: { status: "passed", date: "2025-02-15" },
      },
      citations: 12,
      collaborators: ["Dr. Michael Johnson", "Dr. Sarah Williams"],
    },
    {
      id: 2,
      title: "Novel Approach to Protein Folding",
      researcher: "Dr. Jane Smith",
      institution: "University of Science",
      stage: "peer-review",
      startDate: "2024-11-01",
      abstract:
        "This research presents a novel computational approach to predicting protein folding using deep learning techniques.",
      keywords: ["protein folding", "deep learning", "computational biology"],
      validationStatus: {
        preprint: { status: "passed", date: "2025-01-15" },
        peerReview: { status: "in-progress", date: "" },
        publication: { status: "pending", date: "" },
      },
      collaborators: ["Dr. David Chen"],
    },
    {
      id: 3,
      title: "Machine Learning in Drug Discovery",
      researcher: "Dr. Jane Smith",
      institution: "University of Science",
      stage: "published",
      startDate: "2024-07-10",
      endDate: "2024-11-05",
      abstract:
        "This research explores the application of machine learning algorithms in drug discovery, focusing on target identification and lead optimization.",
      keywords: ["machine learning", "drug discovery", "pharmaceutical research"],
      validationStatus: {
        preprint: { status: "passed", date: "2024-09-20" },
        peerReview: { status: "passed", date: "2024-10-25" },
        publication: { status: "passed", date: "2024-11-05" },
      },
      citations: 8,
      collaborators: ["Dr. Emily Brown", "Dr. Michael Johnson"],
    },
  ])

  const [activeTab, setActiveTab] = useState("all")

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "all") return true
    if (activeTab === "my-projects") return project.researcher === user.name
    if (activeTab === "pre-print") return project.stage === "pre-print"
    if (activeTab === "peer-review") return project.stage === "peer-review"
    if (activeTab === "published") return project.stage === "published"
    return true
  })

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <h1>Research Lifecycle</h1>
          <p className="lead">Track your research from pre-print to publication</p>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
            All Projects
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "my-projects" ? "active" : ""}`}
            onClick={() => setActiveTab("my-projects")}
          >
            My Projects
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "pre-print" ? "active" : ""}`}
            onClick={() => setActiveTab("pre-print")}
          >
            Pre-Print
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "peer-review" ? "active" : ""}`}
            onClick={() => setActiveTab("peer-review")}
          >
            Peer Review
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "published" ? "active" : ""}`}
            onClick={() => setActiveTab("published")}
          >
            Published
          </button>
        </li>
      </ul>

      <div className="row g-4">
        {filteredProjects.map((project) => (
          <div className="col-md-6" key={project.id}>
            <ResearchProjectCard project={project} />
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-journal-x fs-1 text-muted"></i>
          <p className="mt-3">No research projects found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default ResearchLifecycle

