"use client"

import { useState } from "react"

function Navbar({ currentScreen, navigateTo, user }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded)
  }

  const handleNavigation = (screen) => {
    navigateTo(screen)
    setIsExpanded(false)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        <button className="navbar-brand btn btn-link text-white p-0" onClick={() => handleNavigation("dashboard")}>
          DSRP
        </button>
        <button className="navbar-toggler" type="button" onClick={toggleNavbar} aria-expanded={isExpanded}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isExpanded ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${currentScreen === "dashboard" ? "active" : ""}`}
                onClick={() => handleNavigation("dashboard")}
              >
                Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${currentScreen === "data-repository" ? "active" : ""}`}
                onClick={() => handleNavigation("data-repository")}
              >
                Data Repository
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${currentScreen === "reputation" ? "active" : ""}`}
                onClick={() => handleNavigation("reputation")}
              >
                Reputation
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${currentScreen === "funding" ? "active" : ""}`}
                onClick={() => handleNavigation("funding")}
              >
                Funding
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${currentScreen === "peer-review" ? "active" : ""}`}
                onClick={() => handleNavigation("peer-review")}
              >
                Peer Review
              </button>
            </li>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </button>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <button className="dropdown-item" onClick={() => handleNavigation("ip-management")}>
                    IP Management
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleNavigation("research-lifecycle")}>
                    Research Lifecycle
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleNavigation("collaboration")}>
                    Collaboration
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleNavigation("search")}>
                    Advanced Search
                  </button>
                </li>
              </ul>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <span className="badge bg-success me-2">
              <i className="bi bi-award-fill"></i> {user.reputation}
            </span>
            <span className="badge bg-warning text-dark me-3">
              <i className="bi bi-coin"></i> {user.tokens}
            </span>
            <button className="btn btn-outline-light" onClick={() => handleNavigation("profile")}>
              {user.name}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

