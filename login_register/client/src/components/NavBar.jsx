import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = ({userName}) => {
    const navigate=useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:3001/logout');
          if (res.data.success) {
            navigate('/');
          } else {
            console.log("Logout failed:", res.data.message);
          }
        } catch (err) {
          console.log("Error during logout:", err);
        }
      };

  return (
    <div className="container-fluid">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Features</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Pricing</a>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">{userName}</a>
      </li><div className="float-end">
      <li className='d-flex btn btn-outline-danger ' type="button" onClick={handleLogout}>Logout</li></div>
    </ul>

</div>
</nav>
  </div>
  )
}

export default NavBar