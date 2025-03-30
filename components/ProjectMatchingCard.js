function ProjectMatchingCard({ project }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title">{project.title}</h5>
          <span className="badge bg-primary">{project.matchScore}% Match</span>
        </div>

        <div className="mb-3">
          <p className="card-text">{project.description}</p>
        </div>

        <div className="mb-3">
          <small className="text-muted d-block mb-2">Required Skills</small>
          <div>
            {project.skills.map((skill, index) => (
              <span className="badge bg-light text-dark me-2 mb-1" key={index}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="d-flex mb-3">
          <div className="me-3">
            <small className="text-muted d-block">Researcher</small>
            <span>{project.researcher}</span>
          </div>
          <div>
            <small className="text-muted d-block">Institution</small>
            <span>{project.institution}</span>
          </div>
        </div>

        <div className="d-grid">
          <button className="btn btn-primary">
            <i className="bi bi-send me-2"></i>
            Express Interest
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectMatchingCard

