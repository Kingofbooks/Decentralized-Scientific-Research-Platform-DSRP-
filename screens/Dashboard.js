"use client"
import StatCard from "../components/StatCard"
import ActivityFeed from "../components/ActivityFeed"
import RecentResearch from "../components/RecentResearch"

function Dashboard({ user, navigateTo }) {
  const stats = [
    { title: "Reputation Score", value: user.reputation, icon: "award", color: "primary" },
    { title: "Tokens", value: user.tokens, icon: "coin", color: "warning" },
    { title: "Research Projects", value: 8, icon: "journal-text", color: "success" },
    { title: "Peer Reviews", value: 12, icon: "check-circle", color: "info" },
  ]

  const activities = [
    { id: 1, type: "review", title: "Your manuscript was reviewed", time: "2 hours ago" },
    { id: 2, type: "token", title: "You received 15 tokens for your review", time: "1 day ago" },
    { id: 3, type: "publication", title: "Your research was published", time: "3 days ago" },
    { id: 4, type: "collaboration", title: "New collaboration request", time: "1 week ago" },
  ]

  const recentResearch = [
    {
      id: 1,
      title: "Gene Expression Analysis in Cancer Cells",
      author: "Dr. Jane Smith",
      date: "2025-02-15",
      status: "Published",
      citations: 12,
    },
    {
      id: 2,
      title: "Novel Approach to Protein Folding",
      author: "Dr. Jane Smith",
      date: "2025-01-20",
      status: "Under Review",
      citations: 0,
    },
    {
      id: 3,
      title: "Machine Learning in Drug Discovery",
      author: "Dr. Jane Smith",
      date: "2024-11-05",
      status: "Published",
      citations: 8,
    },
  ]

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <h1>Welcome, {user.name}</h1>
          <p className="lead">Your research dashboard at a glance</p>
        </div>
      </div>

      <div className="row mb-4">
        {stats.map((stat, index) => (
          <div className="col-md-3 mb-3 mb-md-0" key={index}>
            <StatCard title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-lg-8 mb-4 mb-lg-0">
          <div className="card shadow-sm h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Research</h5>
              <button className="btn btn-sm btn-outline-primary" onClick={() => navigateTo("data-repository")}>
                View All
              </button>
            </div>
            <div className="card-body">
              <RecentResearch research={recentResearch} navigateTo={navigateTo} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <h5 className="mb-0">Activity Feed</h5>
            </div>
            <div className="card-body">
              <ActivityFeed activities={activities} />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Pending Reviews</h5>
              <button className="btn btn-sm btn-outline-primary" onClick={() => navigateTo("peer-review")}>
                View All
              </button>
            </div>
            <div className="card-body">
              <div className="list-group">
                <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Advances in CRISPR Technology</h6>
                    <small className="text-muted">Due in 5 days</small>
                  </div>
                  <span className="badge bg-warning text-dark">Pending</span>
                </button>
                <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Neural Networks for Protein Structure Prediction</h6>
                    <small className="text-muted">Due in 10 days</small>
                  </div>
                  <span className="badge bg-warning text-dark">Pending</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Funding Opportunities</h5>
              <button className="btn btn-sm btn-outline-primary" onClick={() => navigateTo("funding")}>
                View All
              </button>
            </div>
            <div className="card-body">
              <div className="list-group">
                <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Genomics Research Grant</h6>
                    <small className="text-muted">Deadline: April 15, 2025</small>
                  </div>
                  <span className="badge bg-success">$50,000</span>
                </button>
                <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">AI in Healthcare Innovation Fund</h6>
                    <small className="text-muted">Deadline: May 30, 2025</small>
                  </div>
                  <span className="badge bg-success">$75,000</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

