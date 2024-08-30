// // SignupPage.js
// import { useCallback, useEffect, useState } from "react";
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import "./auth.css";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { registerAPI } from "../../utils/ApiRequest";
// import axios from "axios";

// const Register = () => {

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if(localStorage.getItem('user')){
//       navigate('/');
//     }
//   }, [navigate]);

//   const particlesInit = useCallback(async (engine) => {
//     // console.log(engine);
//     await loadFull(engine);
//   }, []);

//   const particlesLoaded = useCallback(async (container) => {
//     // await console.log(container);
//   }, []);

//   const [values, setValues] = useState({
//     name : "",
//     email : "",
//     password : "",

//   });

//   const toastOptions = {
//     position: "bottom-right",
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: false,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//   }

//   const handleChange = (e) => {
//     setValues({...values , [e.target.name]: e.target.value});
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//       const {name, email, password} = values;

//       setLoading(false);
     
//       const {data} = await axios.post(registerAPI, {
//         name,
//         email,
//         password
//       });

//       if(data.success === true){
//         delete data.user.password;
//         localStorage.setItem("user", JSON.stringify(data.user));
//         toast.success(data.message, toastOptions);
//         setLoading(true);
//         navigate("/");
//       }
//       else{
//         toast.error(data.message, toastOptions);
//         setLoading(false);
//       }
//     };

//   return (
//     <>
//     <div style={{ position: 'relative', overflow: 'hidden' }}>
//       {/* <Particles
//         id="tsparticles"
//         init={particlesInit}
//         loaded={particlesLoaded}
//         options={{
//           background: {
//             color: {
//               value: '#000',
//             },
//           },
//           fpsLimit: 60,
//           particles: {
//             number: {
//               value: 200,
//               density: {
//                 enable: true,
//                 value_area: 800,
//               },
//             },
//             color: {
//               value: '#ffcc00',
//             },
//             shape: {
//               type: 'circle',
//             },
//             opacity: {
//               value: 0.5,
//               random: true,
//             },
//             size: {
//               value: 3,
//               random: { enable: true, minimumValue: 1 },
//             },
//             links: {
//               enable: false,
//             },
//             move: {
//               enable: true,
//               speed: 2,
//             },
//             life: {
//               duration: {
//                 sync: false,
//                 value: 3,
//               },
//               count: 0,
//               delay: {
//                 random: {
//                   enable: true,
//                   minimumValue: 0.5,
//                 },
//                 value: 1,
//               },
//             },
//           },
//           detectRetina: true,
//         }}
//         style={{
//           position: 'absolute',
//           zIndex: -1,
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//         }}
//       /> */}
//       <Particles
//   id="tsparticles"
//   init={particlesInit}
//   loaded={particlesLoaded}
//   options={{
//     background: {
//       color: {
//         value: "#000",
//       },
//     },
//     fpsLimit: 60,
//     particles: {
//       number: {
//         value: 200,
//         density: {
//           enable: true,
//           value_area: 800,
//         },
//       },
//       color: {
//         value: "#ffcc00",
//       },
//       shape: {
//         type: "square",
//       },
//       opacity: {
//         value: 0.5,
//         random: true,
//       },
//       size: {
//         value: 3,
//         random: { enable: true, minimumValue: 1 },
//       },
//       links: {
//         enable: true,  // Enable links between particles
//         color: "#ffffff",  // Set the color of the links
//         distance: 150,  // Maximum distance to connect particles
//         opacity: 0.5,  // Opacity of the links
//         width: 1,  // Width of the links
//       },
//       move: {
//         enable: true,
//         speed: 2,
//       },
//       life: {
//         duration: {
//           sync: false,
//           value: 3,
//         },
//         count: 0,
//         delay: {
//           random: {
//             enable: true,
//             minimumValue: 0.5,
//           },
//           value: 1,
//         },
//       },
//     },
//     detectRetina: true,
//   }}
//   style={{
//     position: "absolute",
//     zIndex: -1,
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   }}
// />


//       <Container className="mt-5" style={{position: 'relative', zIndex: "2 !important", color:"white !important"}}>
//       <Row>
//         <h1 className="text-center">
//           <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white"}}  className="text-center" />
//         </h1>
//         <h1 className="text-center text-white">Welcome to Expense Tracker</h1>
//         <Col md={{ span: 6, offset: 3 }}>
//           <h2 className="text-white text-center mt-5" >Registration</h2>
//           <Form>
//             <Form.Group controlId="formBasicName" className="mt-3" >
//               <Form.Label className="text-white">Name</Form.Label>
//               <Form.Control type="text"  name="name" placeholder="Full name" value={values.name} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group controlId="formBasicEmail" className="mt-3">
//               <Form.Label className="text-white">Email address</Form.Label>
//               <Form.Control type="email"  name="email" placeholder="Enter email" value={values.email} onChange={handleChange}/>
//             </Form.Group>

//             <Form.Group controlId="formBasicPassword" className="mt-3">
//               <Form.Label className="text-white">Password</Form.Label>
//               <Form.Control type="password"  name="password" placeholder="Password" value={values.password} onChange={handleChange} />
//             </Form.Group>
//             <div style={{width: "100%", display: "flex" , alignItems:"center", justifyContent:"center", flexDirection: "column"}} className="mt-4">
//               {/* <Link to="/forgotPassword" className="text-white lnk" >Forgot Password?</Link> */}

//               <Button
//                   type="submit"
//                   className=" text-center mt-3 btnStyle"
//                   onClick={!loading ? handleSubmit : null}
//                   disabled={loading}
//                 >
//                   {loading ? "Registering..." : "Signup"}
//                 </Button>

//               <p className="mt-3" style={{color: "#9d9494"}}>Already have an account? <Link to="/login" className="text-white lnk" >Login</Link></p>
//             </div>
//           </Form>
//         </Col>
//       </Row>
//     <ToastContainer />
//     </Container>
//     </div>
//     </>
//   )
// }

// export default Register



import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerAPI } from "../../utils/ApiRequest";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = values;

    setLoading(false);

    try {
      const { data } = await axios.post(registerAPI, {
        name,
        email,
        password,
      });

      if (data.success === true) {
        delete data.user.password;
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        setLoading(true);
        navigate("/");
      } else {
        toast.error(data.message, toastOptions);
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", toastOptions);
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#000",
            },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 200,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#ffcc00",
            },
            shape: {
              type: "square",
            },
            opacity: {
              value: 0.5,
              random: true,
            },
            size: {
              value: 3,
              random: { enable: true, minimumValue: 1 },
            },
            links: {
              enable: true,
              color: "#ffffff",
              distance: 150,
              opacity: 0.5,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
            },
            life: {
              duration: {
                sync: false,
                value: 3,
              },
              count: 0,
              delay: {
                random: {
                  enable: true,
                  minimumValue: 0.5,
                },
                value: 1,
              },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <Container
        className="mt-5"
        style={{ position: "relative", zIndex: 2, color: "white" }}
      >
        <Row>
          <h1 className="text-center">
            <AccountBalanceWalletIcon
              sx={{ fontSize: 40, color: "white" }}
              className="text-center"
            />
          </h1>
          <h1 className="text-center text-white">
            Welcome to Expense Tracker
          </h1>
          <Col
            md={{ span: 6, offset: 3 }}
            style={{
              backgroundColor: "#333",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h2 className="text-white text-center mt-5">Registration</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName" className="mt-3">
                <Form.Label className="text-white">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={values.name}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "#555",
                    border: "none",
                    borderRadius: "5px",
                    color: "white",
                    padding: "10px",
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "#555",
                    border: "none",
                    borderRadius: "5px",
                    color: "white",
                    padding: "10px",
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "#555",
                    border: "none",
                    borderRadius: "5px",
                    color: "white",
                    padding: "10px",
                  }}
                />
              </Form.Group>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                className="mt-4"
              >
                <Button
                  type="submit"
                  className="text-center mt-3"
                  style={{
                    backgroundColor: "#ffcc00",
                    border: "none",
                    borderRadius: "5px",
                    color: "#333",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    width: "100%",
                    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                  }}
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Signup"}
                </Button>

                <p className="mt-3" style={{ color: "#9d9494" }}>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-white lnk"
                    style={{ textDecoration: "underline" }}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Register;
