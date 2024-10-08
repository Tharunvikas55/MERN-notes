import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import PostTrad from './components/PostTrad'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import PostQuery from './components/PostQuery'
import PostQueryDetail from './components/PostQueryDetail'
import PaginatedQueries from './components/PaginatedQueries'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import InfinateQueries from './components/InfinateQueries'

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Bootstrap Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              {/* Add logo or brand name */}
              <img src={viteLogo} alt="Vite Logo" width="30" height="30" />
              ViteApp
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/posts">
                    Traditional
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/rq">
                    React Query
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/paginated-fruits">
                    Paginated Fruits
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to='/infinate-scroll' >Scroll</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          {/* Routes */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/posts" element={<PostTrad />} />
            <Route exact path="/rq" element={<PostQuery />} />
            <Route exact path="/rq/:postId" element={<PostQueryDetail />} />
            <Route exact path="/paginated-fruits" element={<PaginatedQueries />} />
            <Route exact path="/infinate-scroll" element={< InfinateQueries/> } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
