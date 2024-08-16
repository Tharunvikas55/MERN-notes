// // import React from 'react';
// // import { useState } from 'react'; // If using state for collapse functionality
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // const Navbar = ({userName}) => {
// //     // State to manage collapse of submenus
// //     const [submenu1Open, setSubmenu1Open] = useState(true);
// //     const [submenu2Open, setSubmenu2Open] = useState(false);
// //     const [submenu3Open, setSubmenu3Open] = useState(false);
// //     const navigate=useNavigate();

// //     const handleLogout = async (e) => {
// //         e.preventDefault();
// //         try {
// //           const res = await axios.post('http://localhost:3001/logout');
// //           if (res.data.success) {
// //             navigate('/login');
// //           } else {
// //             console.log("Logout failed:", res.data.message);
// //           }
// //         } catch (err) {
// //           console.log("Error during logout:", err);
// //         }
// //       };
// //     // Function to toggle submenu state
// //     const toggleSubmenu = (submenu) => {
// //         switch (submenu) {
// //             case 'submenu1':
// //                 setSubmenu1Open(!submenu1Open);
// //                 setSubmenu2Open(false);
// //                 setSubmenu3Open(false);
// //                 break;
// //             case 'submenu2':
// //                 setSubmenu1Open(false);
// //                 setSubmenu2Open(!submenu2Open);
// //                 setSubmenu3Open(false);
// //                 break;
// //             case 'submenu3':
// //                 setSubmenu1Open(false);
// //                 setSubmenu2Open(false);
// //                 setSubmenu3Open(!submenu3Open);
// //                 break;
// //             default:
// //                 break;
// //         }
// //     };

// //     return (
// //         <div className="container">
// //             <div className='flex-nowrap'>
                
// //                     <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
// //                         <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
// //                             <li className="nav-item">
// //                                 <a href="#" className="nav-link align-middle px-0">
// //                                     <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
// //                                 </a>
// //                             </li>                  
// //                         </ul>
// //                         <hr />
// //                         <div className="dropdown pb-4">
// //                             <a href="#" className="d-flex align-items-center text-primary text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
// //                                 <img src="https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="hugenerd" width="30" height="30" className="rounded-circle" />
// //                                 <span className="d-none d-sm-inline mx-1">{userName}</span>
// //                             </a>
// //                             <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
// //                                 <li><a className="dropdown-item" href="#">Settings</a></li>
// //                                 <li><a className="dropdown-item" href="#">Profile</a></li>
// //                                 <li><hr className="dropdown-divider" /></li>
// //                                 <li><a className="dropdown-item" onClick={handleLogout} href="#">Sign out</a></li>
// //                             </ul>
// //                         </div>
// //                     </div>
                
// //                     </div>
// //             </div>
// //     );
// // };

// // export default Navbar;


// import React,{ useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { IoHome } from "react-icons/io5";

// const Navbar = ({ userName }) => {
//     const navigate = useNavigate();

//     const handleLogout = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:3001/logout');
//             if (res.data.success) {
//                 navigate('/login');
//             } else {
//                 console.log("Logout failed:", res.data.message);
//             }
//         } catch (err) {
//             console.log("Error during logout:", err);
//         }
//     };

//     return (
//             <div className="mt-3 bg-dark">
//                     {/* <div className="d-flex"> */}
//                         <div className="d-flex flex-column align-items-center align-items-sm-start px-2 pt-1 text-white min-vh-100">
//                             <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
//                                 <li className="nav-item">
//                                     <a href="#" className="nav-link align px-0">
//                                     <IoHome /> <span className="ms-1 d-none d-md-inline">Home</span>
//                                     </a>
//                                 </li>
//                             </ul>
//                             <hr />
//                             <div className="dropdown pb-4">
//                                 <a href="#" className="d-flex align-items-center text-primary text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
//                                     <img src="https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="hugenerd" width="30" height="30" className="rounded-circle" />
//                                     <span className="d-none d-sm-inline mx-1">{userName}</span>
//                                 </a>
//                                 <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
//                                     <li><a className="dropdown-item" href="#">Settings</a></li>
//                                     <li><a className="dropdown-item" href="#">Profile</a></li>
//                                     <li><hr className="dropdown-divider" /></li>
//                                     <li><a className="dropdown-item" onClick={handleLogout} href="#">Sign out</a></li>
//                                 </ul>
//                             </div>
//                         </div>
                   
//                 </div>
//     );
// };

// export default Navbar;
