// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const Login = () => {

//     const [email,setEmail]=useState()
//     const [password,setPassword]=useState()
//     const navigate=useNavigate()

//     axios.defaults.withCredentials=true;
//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         //console.log(email,password);
//         axios.post('http://localhost:3001/login',{email,password})
//         .then(res=>{
//             console.log(res)
//             if(res.data.Login)
//                 navigate('/dashboard')
//             else
//             navigate('/login')
//         })
//         .catch(err=>{console.log(err);}
//       )
//     }
//   return (
//     // <div>
//     //   Login
//     //   <span>Don't have Account</span><Link to={'/sign-up'} >Register/SignUp</Link>
//     // </div>
//     <div className="bg-light p-3 p-md-4 p-xl-5">
//   <div className="container">
//     <div className="row justify-content-center">
//       <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
//         <div className="card border-0 shadow-lg rounded-4">
//           <div className="card-body p-3 p-md-4 p-xl-5">
//             <div className="row">
//               <div className="col-12">
//                 <div className="mb-5">
//                   <h3>Log in</h3>
//                 </div>
//               </div>
//             </div>
//             <form onSubmit={handleSubmit}>
//               <div className="row gy-3 overflow-hidden">
//                 <div className="col-12">
//                   <div className="form-floating mb-3">
//                     <input type="text" className="form-control" name="email" id="email" placeholder="name@example.com"  onChange={(e)=>setEmail(e.target.value)} />
//                     <label htmlFor="email" className="form-label">Email</label>
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <div className="form-floating mb-3">
//                     <input type="password" className="form-control" name="password" id="password"  placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} />
//                     <label htmlFor="password" className="form-label">Password</label>
//                   </div>
//                 </div>
//                 {/* <div className="col-12">
//                   <div className="form-check">
//                     <input className="form-check-input" type="checkbox" value="" name="remember_me" id="remember_me" />
//                     <label className="form-check-label text-secondary" htmlFor="remember_me">
//                       Keep me logged in
//                     </label>
//                   </div>
//                 </div> */}
//                 <div className="col-12">
//                   <div className="d-grid">
//                     <button className="btn bsb-btn-2xl btn-primary" type="submit">Login</button>
//                   </div>
//                 </div>
//               </div>
//             </form>
//             <div className="row">
//               <div className="col-12">
//                 <hr className="mt-5 mb-4 border-secondary-subtle" />
//                 <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
//                     <p>Create new account<Link className="ink-secondary text-decoration-none" to={'/register'}> Register  </Link></p>
                  
//                   {/* <Link href="#!" className="link-secondary text-decoration-none">Forgot password</Link> */}
//                 </div>
//               </div>
//             </div>
            
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//   )
// }

// export default Login



import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const navigate=useNavigate()

    axios.defaults.withCredentials=true;

    const validate = () => {
      const errors = {};
      if (!email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email address is invalid';
      }
      if (!password) {
        errors.password = 'Password is required';
      }
      return errors;
    };

    // const handleSubmit=(e)=>{
    //     e.preventDefault();
    //     axios.post('http://localhost:3001/login',{email,password})
    //     .then(res=>{
    //         console.log(res)
    //         if(res.data.Login)
    //             navigate('/dashboard')
    //         else
    //         {
    //         navigate('/login')
    //         }
    //     })
    //     .catch(err=>{console.log(err);}
    //   )
    // }

    const handleSubmit = (e) => {
      e.preventDefault();
      const errors = validate();
      if (Object.keys(errors).length === 0) {
        axios.post('http://localhost:3001/login', { email, password })
          .then(res => {
            console.log(res);
            if (res.data.Login) {
              navigate('/dashboard');
            } else {
              setServerError(res.data.message);
              //navigate('/');
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        setErrors(errors);
      }
    };

  return (

    <div className="bg-light p-3 p-md-4 p-xl-5">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
        <div className="card border-0 shadow-lg rounded-4">
          <div className="card-body p-3 p-md-4 p-xl-5">
            <div className="row">
              <div className="col-12">
                <div className="mb-5">
                  <h3>Log in</h3>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row gy-3 overflow-hidden">
              {serverError && (
                      <div className="col-12">
                        <div className="alert alert-danger">
                          {serverError}
                        </div>
                      </div>
                    )}
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" id="email" placeholder="name@example.com"  onChange={(e)=>setEmail(e.target.value)} />
                    <label htmlFor="email" className="form-label">Email</label>
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input type="password"   className={`form-control ${errors.password ? 'is-invalid' : ''}`} name="password" id="password"  placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} />
                    <label htmlFor="password" className="form-label">Password</label>
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <button className="btn bsb-btn-2xl btn-primary" type="submit">Login</button>
                  </div>
                </div>
              </div>
            </form>
            <div className="row">
              <div className="col-12">
                <hr className="mt-5 mb-4 border-secondary-subtle" />
                <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                    <p>Create new account<Link className="ink-secondary text-decoration-none" to={'/register'}> Register  </Link></p>
                  
                  {/* <Link href="#!" className="link-secondary text-decoration-none">Forgot password</Link> */}
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

export default Login