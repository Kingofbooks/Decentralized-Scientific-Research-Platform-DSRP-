"use client"

import { useState } from "react"

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    contentType: 'all',
    dateRange: 'all',
    sortBy: 'relevance'
  });
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;
    
    // Mock search results
    const mockResults = [
      {
        id: 1,
        type: 'research',
        title: 'Gene Expression Analysis in Cancer Cells',
        author: 'Dr. Jane Smith',
        institution: 'University of Science',
        date: '2025-02-15',
        abstract: 'This study analyzes gene expression patterns in various cancer cell lines to identify potential therapeutic targets and biomarkers.',
        keywords: ['gene expression', 'cancer', 'biomarkers'],
        citations: 12
      },
      {
        id: 2,
        type: 'dataset',
        title: 'Genomic Variants in Rare Diseases',
        author: 'Dr. Jane Smith',
        institution: 'University of Science',
        date: '2024-11-20',
        description: 'Whole genome sequencing data from patients with rare genetic disorders',
        format: 'VCF, BAM',
        size: '8.7 GB',
        downloads: 29
      },
      {
        id: 3,
        type: 'researcher',
        name: 'Dr. Michael Johnson',
        institution: 'MIT',
        reputation: 82,
        researchInterests: ['Machine Learning', 'Drug Discovery', 'Computational Biology'],
        publications: 38,
        collaborations: 15
      },
      {
        id: 4,
        type: 'funding',
        title: 'AI-Driven Drug Discovery Platform',
        researcher: 'Dr. Michael Johnson',
        institution: 'MIT',
        amount: 120000,
        duration: '24 months',
        status: 'voting',
        votes: 45
      }
    ];
    
    setSearchResults(mockResults);
    setHasSearched(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters({
      ...selectedFilters,
      [name]: value
    });
  };

  const getResultIcon = (type) => {
    switch(type) {
      case 'research':
        return 'bi-journal-text';
      case 'dataset':
        return 'bi-database';
      case 'researcher':
        return 'bi-person';
      case 'funding':
        return 'bi-cash-coin';
      default:
        return 'bi-file-earmark';
    }
  };

  const getResultColor = (type) => {
    switch(type) {
      case 'research':
        return 'primary';
      case 'dataset':
        return 'success';
      case 'researcher':
        return 'info';
      case 'funding':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <h1>Advanced Search</h1>
          <p className="lead">Find research projects, datasets, researchers, and more</p>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <form onSubmit={handleSearch}>
            <div className="input-group mb-3">
              <input 
                type="text" 
                className="form-control form-control-lg" 
                placeholder="Search for research, datasets, researchers..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                required
              />
              <button className="btn btn-primary" type="submit">
                <i className="bi bi-search me-2"></i>
                Search
              </button>
            </div>
            
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="contentType" className="form-label">Content Type</label>
                <select 
                  className="form-select" 
                  id="contentType" 
                  name="contentType"
                  value={selectedFilters.contentType}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Types</option>
                  <option value="research">Research Papers</option>
                  <option value="dataset">Datasets</option>
                  <option value="researcher">Researchers</option>
                  <option value="funding">Funding Proposals</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="dateRange" className="form-label">Date Range</label>
                <select 
                  className="form-select" 
                  id="dateRange" 
                  name="dateRange"
                  value={selectedFilters.dateRange}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Time</option>
                  <option value="last-week">Last Week</option>
                  <option value="last-month">Last Month</option>
                  <option value="last-year">Last Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="sortBy" className="form-label">Sort By</label>
                <select 
                  className="form-select" 
                  id="sortBy" 
                  name="sortBy"
                  value={selectedFilters.sortBy}
                  onChange={handleFilterChange}
                >
                  <option value="relevance">Relevance</option>
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="citations">Most Cited</option>
                  <option value="downloads">Most Downloaded</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      {hasSearched && (
        <div className="mb-3">
          <h5>Search Results for "{searchTerm}"</h5>
          <p className="text-muted">Found {searchResults.length} results</p>
        </div>
      )}

      {searchResults.map(result => (
        <div className="card shadow-sm mb-3" key={result.id}>
          <div className="card-body">
            <div className="d-flex">
              <div className={`bg-${getResultColor(result.type)} bg-opacity-10 p-3 rounded me-3`}>
                <i className={`bi ${getResultIcon(result.type)} text-${getResultColor(result.type)} fs-4`}></i>
              </div>
              <div className="flex-grow-1">
                {result.type === 'researcher' ? (
                  <h5 className="card-title">{result.name}</h5>
                ) : (
                  <h5 className="card-title">{result.title}</h5>
                )}
                
                <div className="d-flex mb-2">
                  <span className={`badge bg-${getResultColor(result.type)} me-2`}>
                    {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                  </span>
                  
                  {result.type === 'researcher' ? (
                    <span className="text-muted">{result.institution}</span>
                  ) : (
                    <span className="text-muted">
                      {result.author || result.researcher} | {result.institution}
                    </span>
                  )}
                  
                  {result.date && (
                    <span className="text-muted ms-2">| {result.date}</span>
                  )}
                </div>
                
                {result.type === 'research' && (
                  <>
                    <p className="card-text">{result.abstract}</p>
                    <div className="d-flex align-items-center">
                      <span className="badge bg-info me-3">
                        <i className="bi bi-quote me-1"></i> {result.citations} citations
                      </span>
                      <div>
                        {result.keywords.map((keyword, index) => (
                          <span className="badge bg-light text-dark me-2" key={index}>
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {result.type === 'dataset' && (
                  <>
                    <p className="card-text">{result.description}</p>
                    <div className="d-flex align-items-center">
                      <span className="me-3">
                        <i className="bi bi-hdd me-1"></i> {result.size}
                      </span>
                      <span className="me-3">
                        <i className="bi bi-file-earmark me-1"></i> {result.format}
                      </span>
                      <span>
                        <i className="bi bi-download me-1"></i> {result.downloads} downloads
                      </span>
                    </div>
                  </>
                )}
                
                {result.type === 'researcher' && (
                  <>
                    <div className="mb-2">
                      {result.researchInterests.map((interest, index) => (
                        <span className="badge bg-light text-dark me-2" key={index}>
                          {interest}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
  export default Search;
