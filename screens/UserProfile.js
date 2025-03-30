"use client"

import { useState } from "react"

function UserProfile({ user, setUser }) {
  const [formData, setFormData] = useState({
    name: user.name,
    institution: user.institution,
    email: "jane.smith@university.edu",
    bio: "Professor of Molecular Biology with a focus on gene expression in cancer cells.",
    researchInterests: user.researchInterests.join(", "),
    orcid: "0000-0002-1234-5678",
    twitter: "@drjanesmith",
    github: "drjanesmith",
    website: "https://janesmith.academia.edu",
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Update user data
    setUser({
      ...user,
      name: formData.name,
      institution: formData.institution,
      researchInterests: formData.researchInterests.split(",").map((item) => item.trim()),
    })

    setIsEditing(false)
  }

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <h1>User Profile</h1>
          <p className="lead">Manage your personal information and research interests</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 mb-4 mb-lg-0">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <div className="mb-3">
                <div
                  className="bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center"
                  style={{ width: "120px", height: "120px" }}
                >
                  <i className="bi bi-person-fill fs-1 text-primary"></i>
                </div>
              </div>
              <h5 className="card-title">{user.name}</h5>
              <p className="text-muted">{user.institution}</p>
              <div className="d-flex justify-content-center mb-3">
                <span className="badge bg-success me-2">
                  <i className="bi bi-award-fill me-1"></i> {user.reputation}
                </span>
                <span className="badge bg-warning text-dark">
                  <i className="bi bi-coin me-1"></i> {user.tokens}
                </span>
              </div>
              <div className="d-grid">
                {!isEditing && (
                  <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                    <i className="bi bi-pencil-square me-2"></i>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="card shadow-sm mt-4">
            <div className="card-header">
              <h5 className="mb-0">Research Interests</h5>
            </div>
            <div className="card-body">
              {!isEditing ? (
                <div>
                  {user.researchInterests.map((interest, index) => (
                    <span className="badge bg-light text-dark me-2 mb-2" key={index}>
                      {interest}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id="researchInterests"
                    name="researchInterests"
                    value={formData.researchInterests}
                    onChange={handleChange}
                    style={{ height: "100px" }}
                  ></textarea>
                  <label htmlFor="researchInterests">Research Interests (comma separated)</label>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">Profile Information</h5>
            </div>
            <div className="card-body">
              {!isEditing ? (
                <div>
                  <div className="row mb-3">
                    <div className="col-md-3 text-muted">Name</div>
                    <div className="col-md-9">{formData.name}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-3 text-muted">Institution</div>
                    <div className="col-md-9">{formData.institution}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-3 text-muted">Email</div>
                    <div className="col-md-9">{formData.email}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-3 text-muted">Bio</div>
                    <div className="col-md-9">{formData.bio}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-3 text-muted">ORCID</div>
                    <div className="col-md-9">{formData.orcid}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-3 text-muted">Social Media</div>
                    <div className="col-md-9">
                      <div>Twitter: {formData.twitter}</div>
                      <div>GitHub: {formData.github}</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 text-muted">Website</div>
                    <div className="col-md-9">{formData.website}</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="institution" className="form-label">
                      Institution
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="institution"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="bio" className="form-label">
                      Bio
                    </label>
                    <textarea
                      className="form-control"
                      id="bio"
                      name="bio"
                      rows="3"
                      value={formData.bio}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="orcid" className="form-label">
                      ORCID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="orcid"
                      name="orcid"
                      value={formData.orcid}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="twitter" className="form-label">
                        Twitter
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="twitter"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="github" className="form-label">
                        GitHub
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="github"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="website" className="form-label">
                      Website
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="card shadow-sm mt-4">
            <div className="card-header">
              <h5 className="mb-0">Account Settings</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">
                  <i className="bi bi-key me-2"></i>
                  Change Password
                </button>
                <button className="btn btn-outline-primary">
                  <i className="bi bi-shield-lock me-2"></i>
                  Two-Factor Authentication
                </button>
                <button className="btn btn-outline-primary">
                  <i className="bi bi-bell me-2"></i>
                  Notification Settings
                </button>
                <button className="btn btn-outline-primary">
                  <i className="bi bi-wallet2 me-2"></i>
                  Wallet Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

