function ResearcherCard({ researcher }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <div
            className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{ width: "60px", height: "60px" }}
          >
            <i className="bi bi-person-fill fs-3 text-primary"></i>
          </div>
          <div>
            <h5 className="card-title mb-0">{researcher.name}</h5>
            <p className="text-muted mb-0">{researcher.institution}</p>
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between mb-2">
            <span>Reputation</span>
            <span className="badge bg-success">{researcher.reputation}</span>
          </div>
          <div className="progress" style={{ height: "8px" }}>
            <div className="progress-bar bg-success" style={{ width: `${researcher.reputation}%` }}></div>
          </div>
        </div>

        <div className="mb-3">
          <small className="text-muted d-block mb-2">Research Interests</small>
          <div>
            {researcher.researchInterests.map((interest, index) => (
              <span className="badge bg-light text-dark me-2 mb-1" key={index}>
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="d-flex mb-3">
          <div className="me-4">
            <small className="text-muted d-block">Publications</small>
            <span>{researcher.publications}</span>
          </div>
          <div>
            <small className="text-muted d-block">Collaborations</small>
            <span>{researcher.collaborations}</span>
          </div>
        </div>

        <div className="d-grid">
          <button className="btn btn-outline-primary">
            <i className="bi bi-person-plus me-2"></i>
            Connect
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResearcherCard

