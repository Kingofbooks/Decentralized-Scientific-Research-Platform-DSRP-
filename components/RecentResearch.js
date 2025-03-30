"use client"

function RecentResearch({ research, navigateTo }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Published":
        return "bg-success"
      case "Under Review":
        return "bg-warning text-dark"
      case "Draft":
        return "bg-secondary"
      default:
        return "bg-primary"
    }
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>Citations</th>
          </tr>
        </thead>
        <tbody>
          {research.map((item) => (
            <tr key={item.id} style={{ cursor: "pointer" }} onClick={() => navigateTo("research-lifecycle")}>
              <td>{item.title}</td>
              <td>{item.date}</td>
              <td>
                <span className={`badge ${getStatusBadge(item.status)}`}>{item.status}</span>
              </td>
              <td>{item.citations}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecentResearch

