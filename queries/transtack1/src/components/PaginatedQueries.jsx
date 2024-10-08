import React, { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css' // Ensure Bootstrap is imported

const fetchFruits = (pageId) => {
  return axios.get(`http://localhost:4000/fruits/?_limit=4&_page=${pageId}`);
}

const PaginatedQueries = () => {
  const [page, setPage] = useState(1);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['fruits',page], // Include page in query key for caching
    queryFn: () => fetchFruits(page),
    //to keep the previous values on screen until the next page data are fetched
    placeholderData:keepPreviousData
  })

  if (isLoading) return <div className="text-center py-5">Loading...</div>
  if (isError) return <div className="text-danger py-5">{error.message}</div>

  return (
    <div className="container mt-4">
      <div className="row g-4"> {/* Added g-4 for better card spacing */}
        {data?.data.map((item) => ( 
          <div key={item.id} className="col-md-3"> {/* Adjusted to 3 for better layout */}
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title fw-bold text-primary">{item.name}</h5>
                <p className="card-text text-muted">
                  {item.name} is a popular fruit known for its rich flavor and numerous health benefits.
                </p>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                <small className="text-muted">Fruit ID: {item.id}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <button 
          onClick={() => setPage(prev=>prev - 1)} 
          className="btn btn-primary" 
          disabled={page === 0?true : false}
        >
          Previous Page
        </button>
        <button 
          onClick={() => setPage(prev => prev + 1)}
          className="btn btn-primary" 
          disabled={page=== 5?true:false} // Disable if fewer than 4 items fetched
        >
          Next Page
        </button>
      </div>
    </div>
  )
}

export default PaginatedQueries
