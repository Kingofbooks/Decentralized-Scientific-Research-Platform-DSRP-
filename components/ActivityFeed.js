function ActivityFeed({ activities }) {
  const getIcon = (type) => {
    switch (type) {
      case "review":
        return "bi-file-earmark-text"
      case "token":
        return "bi-coin"
      case "publication":
        return "bi-journal-check"
      case "collaboration":
        return "bi-people"
      default:
        return "bi-bell"
    }
  }

  return (
    <div className="activity-feed">
      {activities.map((activity) => (
        <div className="d-flex mb-3" key={activity.id}>
          <div className="me-3">
            <div className="bg-light p-2 rounded">
              <i className={`bi ${getIcon(activity.type)}`}></i>
            </div>
          </div>
          <div>
            <p className="mb-0">{activity.title}</p>
            <small className="text-muted">{activity.time}</small>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ActivityFeed

