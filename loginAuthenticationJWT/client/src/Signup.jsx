import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Signup = () => {
    const [name,setName]=useState()
    const [mobile,setMobile]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/register',{name,mobile,email,password})
        .then(res=>{console.log(res),navigate('/login')})
        .catch(error=>console.log(error))
    }

  return (
<div className="bg-light p-3 p-md-4 p-xl-5 ">
  <div className="container mt-3 ">
    <div className="row justify-content-center">
      <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
        <div className="card border-0 shadow-lg rounded-4">
          <div className="card-body p-3 p-md-4 p-xl-5">
          <div className="row">
            <div className="col-12">
              <div className="mb-3">
                <h2 className="h3">Registration</h2>
                <h3 className="fs-6 fw-normal text-secondary m-0">Enter your details to register</h3>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row gy-3 gy-4 overflow-hidden">
              <div className="col-12">
                <div className='form-floating mb-2'>          
                <input type="text" className="form-control" name='name' autoComplete='off' placeholder=" " onChange={(e)=>setName(e.target.value)} />
                <label  className="form-label"> Name </label>
                </div>
              </div>
              <div className="col-12">
                <div className='form-floating mb-2'>          
                <input type="text" className="form-control" name='mobile' autoComplete='off' placeholder=" " onChange={(e)=>setMobile(e.target.value)} />
                <label  className="form-label">Mobile  </label>
                </div>
              </div>
              <div className="col-12">
                <div className='form-floating mb-2'>          
                <input type="text" className="form-control" name='email' autoComplete='off' placeholder=" " onChange={(e)=>setEmail(e.target.value)} />
                <label  className="form-label">Email </label>
                </div>
              </div>
              <div className="col-12">
                <div className='form-floating mb-2'>          
                <input type="password" className="form-control" name='password' autoComplete='off' placeholder=" " onChange={(e)=>setPassword(e.target.value)} />
                <label  className="form-label">Password </label>
                </div>
              </div>
             
              {/* <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" name="iAgree" id="iAgree"  />
                  <label className="form-check-label text-secondary" htmlFor="iAgree">
                    I agree to the <a href="#!" className="link-primary text-decoration-none">terms and conditions</a>
                  </label>
                </div>
              </div> */}
              <div className="col-12">
                <div className="d-grid">
                  <button className="btn bsb-btn-xl btn-primary" type="submit">Register</button>
                </div>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-12">
              <hr className="mt-5 mb-4 border-secondary-subtle" />
              <div className='d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end'>
                <p>Already have an account? <Link  className="ink-secondary text-decoration-none" to={'/login'} >Sign in</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
  )
}

export default Signup
