"use client"

import { useState } from "react"
import ResearcherCard from "../components/ResearcherCard"
import ProjectMatchingCard from "../components/ProjectMatchingCard"

function Collaboration() {
  const [researchers, setResearchers] = useState([
    {
      id: 1,
      name: "Dr. Sarah Williams",
      institution: "Stanford University",
      reputation: 95,
      researchInterests: ["Genomics", "Bioinformatics", "Cancer Research"],
      publications: 45,
      collaborations: 12,
    },
    {
      id: 2,
      name: "Dr. Michael Johnson",
      institution: "MIT",
      reputation: 82,
      researchInterests: ["Machine Learning", "Drug Discovery", "Computational Biology"],
      publications: 38,
      collaborations: 15,
    },
    {
      id: 3,
      name: "Dr. David Chen",
      institution: "Harvard University",
      reputation: 78,
      researchInterests: ["Protein Structure", "Molecular Dynamics", "Biochemistry"],
      publications: 32,
      collaborations: 8,
    },
    {
      id: 4,
      name: "Dr. Emily Brown",
      institution: "Oxford University",
      reputation: 75,
      researchInterests: ["Neuroscience", "Brain Imaging", "Cognitive Science"],
      publications: 28,
      collaborations: 10,
    },
  ])

  const [projectMatches, setProjectMatches] = useState([
    {
      id: 1,
      title: "AI-Driven Drug Discovery for Rare Diseases",
      description:
        "Seeking collaborators with expertise in machine learning and rare disease genetics for a project on using AI to identify potential drug candidates for rare genetic disorders.",
      skills: ["Machine Learning", "Genetics", "Drug Discovery"],
      researcher: "Dr. Michael Johnson",
      institution: "MIT",
      matchScore: 92,
    },
    {
      id: 2,
      title: "Genomic Analysis of Cancer Progression",
      description:
        "Looking for collaborators with expertise in cancer genomics and bioinformatics for a project on identifying genetic markers of cancer progression and metastasis.",
      skills: ["Cancer Research", "Genomics", "Bioinformatics"],
      researcher: "Dr. Sarah Williams",
      institution: "Stanford University",
      matchScore: 88,
    },
    {
      id: 3,
      title: "Neural Correlates of Decision Making",
      description:
        "Seeking collaborators with expertise in neuroscience and cognitive psychology for a project on the neural basis of decision making under uncertainty.",
      skills: ["Neuroscience", "Cognitive Science", "Brain Imaging"],
      researcher: "Dr. Emily Brown",
      institution: "Oxford University",
      matchScore: 75,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInterests, setSelectedInterests] = useState([])
  const [activeTab, setActiveTab] = useState("researchers")

  const allInterests = [...new Set(researchers.flatMap((r) => r.researchInterests))].sort()

  const handleInterestToggle = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest))
    } else {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  const filteredResearchers = researchers.filter((researcher) => {
    const matchesSearch =
      researcher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      researcher.institution.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesInterests =
      selectedInterests.length === 0 ||
      selectedInterests.some((interest) => researcher.researchInterests.includes(interest))

    return matchesSearch && matchesInterests
  })

  const filteredProjects = projectMatches.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesInterests =
      selectedInterests.length === 0 || selectedInterests.some((interest) => project.skills.includes(interest))

    return matchesSearch && matchesInterests
  })

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <h1>Collaboration</h1>
          <p className="lead">Connect with researchers and find collaboration opportunities</p>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search researchers or projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-wrap gap-2">
                {allInterests.slice(0, 5).map((interest, index) => (
                  <button
                    key={index}
                    className={`btn btn-sm ${selectedInterests.includes(interest) ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                  </button>
                ))}
                <button className="btn btn-sm btn-outline-secondary">More...</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "researchers" ? "active" : ""}`}
            onClick={() => setActiveTab("researchers")}
          >
            Researchers
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "project-matching" ? "active" : ""}`}
            onClick={() => setActiveTab("project-matching")}
          >
            Project Matching
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "my-collaborations" ? "active" : ""}`}
            onClick={() => setActiveTab("my-collaborations")}
          >
            My Collaborations
          </button>
        </li>
      </ul>

      {activeTab === "researchers" && (
        <div className="row g-4">
          {filteredResearchers.map((researcher) => (
            <div className="col-md-6 col-lg-4" key={researcher.id}>
              <ResearcherCard researcher={researcher} />
            </div>
          ))}
        </div>
      )}

      {activeTab === "project-matching" && (
        <div className="row g-4">
          {filteredProjects.map((project) => (
            <div className="col-md-6" key={project.id}>
              <ProjectMatchingCard project={project} />
            </div>
          ))}
        </div>
      )}

      {activeTab === "my-collaborations" && (
        <div className="text-center py-5">
          <i className="bi bi-people fs-1 text-muted"></i>
          <p className="mt-3">You don't have any active collaborations yet.</p>
          <button className="btn btn-primary">Start a New Collaboration</button>
        </div>
      )}
    </div>
  )
}

export default Collaboration

