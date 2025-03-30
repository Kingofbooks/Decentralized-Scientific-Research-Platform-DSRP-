"use client"

import { useState } from "react"
import DatasetCard from "../components/DatasetCard"
import DataUploadModal from "../components/DataUploadModal"

function DataRepository({ user }) {
  const [datasets, setDatasets] = useState([
    {
      id: 1,
      title: "Gene Expression Data for Breast Cancer Cells",
      description: "RNA-seq data from 50 breast cancer cell lines treated with various drugs",
      author: "Dr. Jane Smith",
      version: "1.2",
      date: "2025-02-10",
      size: "2.4 GB",
      format: "CSV, FASTQ",
      downloads: 45,
      citations: 8,
      fileUrl: "/path/to/file1.csv", // Add file URL here
    },
    {
      id: 2,
      title: "Protein Structure Dataset",
      description: "Collection of 3D protein structures with associated metadata",
      author: "Dr. Michael Johnson",
      version: "2.0",
      date: "2025-01-15",
      size: "5.1 GB",
      format: "PDB, JSON",
      downloads: 78,
      citations: 12,
      fileUrl: "/path/to/file2.pdb", // Add file URL here
    },
    {
      id: 3,
      title: "Clinical Trial Results: Alzheimer's Treatment",
      description: "Anonymized patient data from Phase III clinical trials",
      author: "Dr. Sarah Williams",
      version: "1.0",
      date: "2024-12-05",
      size: "1.8 GB",
      format: "CSV, XLSX",
      downloads: 32,
      citations: 5,
      fileUrl: "/path/to/file3.csv", // Add file URL here
    },
    {
      id: 4,
      title: "Genomic Variants in Rare Diseases",
      description: "Whole genome sequencing data from patients with rare genetic disorders",
      author: "Dr. Jane Smith",
      version: "1.1",
      date: "2024-11-20",
      size: "8.7 GB",
      format: "VCF, BAM",
      downloads: 29,
      citations: 3,
      fileUrl: "/path/to/file4.vcf", // Add file URL here
    },
  ])

  const [showUploadModal, setShowUploadModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const handleUpload = (newDataset) => {
    setDatasets([
      ...datasets,
      {
        id: datasets.length + 1,
        ...newDataset,
        author: user.name,
        date: new Date().toISOString().split("T")[0],
        downloads: 0,
        citations: 0,
      },
    ])
    setShowUploadModal(false)
  }

  const handleDownload = (fileUrl) => {
    if (fileUrl) {
      window.location.href = fileUrl; // Trigger the file download
    } else {
      alert("File not found!");
    }
  }

  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch =
      (dataset.title && dataset.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (dataset.description && dataset.description.toLowerCase().includes(searchTerm.toLowerCase()))

    let filtered = matchesSearch

    if (selectedFilter === "all") return filtered
    if (selectedFilter === "my-datasets") return filtered && dataset.author === user.name
    if (selectedFilter === "recent") return filtered && new Date(dataset.date) > new Date(new Date() - 30 * 24 * 60 * 60 * 1000) // last 30 days
    if (selectedFilter === "popular") return filtered && dataset.downloads >= 50 // example filter for popular datasets

    return filtered
  })

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Data Repository</h1>
          <p className="lead">Secure and decentralized storage for research data</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowUploadModal(true)}>
          <i className="bi bi-cloud-upload me-2"></i>
          Upload Dataset
        </button>
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
                  placeholder="Search datasets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Datasets</option>
                <option value="my-datasets">My Datasets</option>
                <option value="recent">Recently Added</option>
                <option value="popular">Most Downloaded</option>
              </select>
            </div>
            <div className="col-md-2">
              <button className="btn btn-outline-secondary w-100">Advanced Filters</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {filteredDatasets.map((dataset) => (
          <div className="col-md-6" key={dataset.id}>
            <DatasetCard dataset={dataset} onDownload={handleDownload} />
          </div>
        ))}
      </div>

      {filteredDatasets.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-database-x fs-1 text-muted"></i>
          <p className="mt-3">No datasets found matching your criteria.</p>
        </div>
      )}

      <DataUploadModal show={showUploadModal} onHide={() => setShowUploadModal(false)} onUpload={handleUpload} />
    </div>
  )
}

export default DataRepository
