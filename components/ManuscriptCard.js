"use client"

function ManuscriptCard({ manuscript, onReviewClick, isReviewer }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending-review":
        return "bg-warning text-dark"
      case "reviewed":
        return "bg-success"
      case "published":
        return "bg-primary"
      default:
        return "bg-secondary"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "pending-review":
        return "Pending Review"
      case "reviewed":
        return "Reviewed"
      case "published":
        return "Published"
      default:
        return status
    }
  }

  const getDaysRemaining = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title">{manuscript.title}</h5>
          <span className={`badge ${getStatusBadge(manuscript.status)}`}>{getStatusText(manuscript.status)}</span>
        </div>

        <div className="d-flex mb-3">
          <div className="me-3">
            <small className="text-muted d-block">Author</small>
            <span>{manuscript.author}</span>
          </div>
          <div className="me-3">
            <small className="text-muted d-block">Institution</small>
            <span>{manuscript.institution}</span>
          </div>
          <div>
            <small className="text-muted d-block">Date</small>
            <span>{manuscript.date}</span>
          </div>
        </div>

        <div className="mb-3">
          <small className="text-muted d-block">Abstract</small>
          <p className="card-text">{manuscript.abstract}</p>
        </div>

        <div className="mb-3">
          <small className="text-muted d-block">Keywords</small>
          <div>
            {manuscript.keywords.map((keyword, index) => (
              <span className="badge bg-light text-dark me-2 mb-1" key={index}>
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {manuscript.status === "pending-review" && manuscript.reviewDueDate && (
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-clock me-2"></i>
            <span>
              Review due: {manuscript.reviewDueDate}
              <span className="ms-2 badge bg-info">{getDaysRemaining(manuscript.reviewDueDate)} days remaining</span>
            </span>
          </div>
        )}

        {manuscript.status === "reviewed" && manuscript.reviewScore && (
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-star-fill me-2 text-warning"></i>
            <span>Review score: {manuscript.reviewScore}/100</span>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-sm btn-outline-primary">View Full Manuscript</button>

          {isReviewer && manuscript.status === "pending-review" && (
            <button className="btn btn-sm btn-primary" onClick={() => onReviewClick(manuscript)}>
              <i className="bi bi-pencil-square me-1"></i>
              Review
            </button>
          )}

          {manuscript.status === "reviewed" && (
            <button className="btn btn-sm btn-outline-secondary">
              <i className="bi bi-eye me-1"></i>
              View Review
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManuscriptCard

