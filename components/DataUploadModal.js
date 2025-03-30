"use client"

import { useState } from "react"

function DataUploadModal({ show, onHide, onUpload }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    version: "1.0",
    size: "",
    format: "",
    accessControl: "public",
    file: null,
  })

  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
      size: e.target.files[0] ? `${(e.target.files[0].size / (1024 * 1024)).toFixed(2)} MB` : "",
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    setUploadStatus(null)

    const form = new FormData()
    form.append("title", formData.title)
    form.append("description", formData.description)
    form.append("version", formData.version)
    form.append("size", formData.size)
    form.append("format", formData.format)
    form.append("accessControl", formData.accessControl)
    form.append("file", formData.file)

    try {
      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: form,
      })

      const result = await response.json()

      if (response.ok) {
        setUploadStatus({ success: true, message: `File uploaded: ${result.filename}` })
        onUpload(result)
      } else {
        setUploadStatus({ success: false, message: result.error || "Upload failed" })
      }
    } catch (error) {
      setUploadStatus({ success: false, message: "Error uploading file" })
    } finally {
      setUploading(false)
    }
  }

  if (!show) return null

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Upload Dataset</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="version" className="form-label">
                    Version
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="version"
                    name="version"
                    value={formData.version}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="format" className="form-label">
                    Format
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="format"
                    name="format"
                    placeholder="CSV, JSON, etc."
                    value={formData.format}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="accessControl" className="form-label">
                  Access Control
                </label>
                <select
                  className="form-select"
                  id="accessControl"
                  name="accessControl"
                  value={formData.accessControl}
                  onChange={handleChange}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="restricted">Restricted</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="file" className="form-label">
                  Dataset File
                </label>
                <input type="file" className="form-control" id="file" onChange={handleFileChange} required />
                <div className="form-text">Maximum file size: 100MB. For larger datasets, please contact support.</div>
              </div>

              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={onHide}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={uploading}>
                  {uploading ? "Uploading..." : "Upload Dataset"}
                </button>
              </div>
            </form>

            {uploadStatus && (
              <div className={`alert ${uploadStatus.success ? "alert-success" : "alert-danger"} mt-3`}>
                {uploadStatus.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataUploadModal
