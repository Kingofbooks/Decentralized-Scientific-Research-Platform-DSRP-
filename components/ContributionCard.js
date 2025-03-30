function ContributionCard({ contribution }) {
  const getTypeIcon = (type) => {
    switch (type) {
      case "research":
        return "bi-journal-text"
      case "review":
        return "bi-check-circle"
      case "data":
        return "bi-database"
      case "methodology":
        return "bi-gear"
      default:
        return "bi-file-earmark"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "research":
        return "primary"
      case "review":
        return "info"
      case "data":
        return "success"
      case "methodology":
        return "secondary"
      default:
        return "dark"
    }
  }

  const getImpactBadge = (impact) => {
    switch (impact) {
      case "high":
        return "bg-success"
      case "medium":
        return "bg-warning text-dark"
      case "low":
        return "bg-secondary"
      default:
        return "bg-light text-dark"
    }
  }

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <div className={`bg-${getTypeColor(contribution.type)} bg-opacity-10 p-2 rounded me-3`}>
            <i className={`bi ${getTypeIcon(contribution.type)} text-${getTypeColor(contribution.type)} fs-4`}></i>
          </div>
          <div>
            <h5 className="card-title mb-0">{contribution.title}</h5>
            <small className="text-muted">{contribution.date}</small>
          </div>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <div>
            <small className="text-muted d-block">Type</small>
            <span className="text-capitalize">{contribution.type}</span>
          </div>
          <div>
            <small className="text-muted d-block">Tokens Earned</small>
            <span className="badge bg-warning text-dark fs-6">{contribution.tokens}</span>
          </div>
          <div>
            <small className="text-muted d-block">Impact</small>
            <span className={`badge ${getImpactBadge(contribution.impact)}`}>{contribution.impact}</span>
          </div>
        </div>

        {contribution.citations && (
          <div className="d-flex align-items-center">
            <i className="bi bi-quote me-2"></i>
            <span>{contribution.citations} citations</span>
          </div>
        )}

        {contribution.quality && (
          <div className="d-flex align-items-center">
            <i className="bi bi-star me-2"></i>
            <span>Quality score: {contribution.quality}%</span>
          </div>
        )}

        {contribution.downloads && (
          <div className="d-flex align-items-center">
            <i className="bi bi-download me-2"></i>
            <span>{contribution.downloads} downloads</span>
          </div>
        )}

        {contribution.adoptions && (
          <div className="d-flex align-items-center">
            <i className="bi bi-arrow-repeat me-2"></i>
            <span>{contribution.adoptions} adoptions</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContributionCard

