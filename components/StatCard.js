function StatCard({ title, value, icon, color }) {
  return (
    <div className={`card border-${color} shadow-sm h-100`}>
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className={`bg-${color} bg-opacity-10 p-3 rounded me-3`}>
            <i className={`bi bi-${icon} text-${color} fs-4`}></i>
          </div>
          <div>
            <h6 className="card-title text-muted mb-0">{title}</h6>
            <h2 className="mb-0">{value}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatCard

