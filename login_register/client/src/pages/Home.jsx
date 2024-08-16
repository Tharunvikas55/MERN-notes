import React, { useEffect } from 'react'
import {  Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../components/NavBar'

const Home = () => {
    // const navigate=useNavigate()
    // axios.defaults.withCredentials=true;
    // useEffect(()=>{
    //     axios.get('http://localhost:3001/home')
    //     .then(res=>{
    //         if (res.data !== 'Success') {
    //             navigate('/login');
    //           } else {
    //             navigate('/');
    //           }
    //     })
    //     .catch(err=>console.log(err))
    // }, [navigate])
  return (
    <div>
        <NavBar/>
      <center><h1>Login Success</h1></center>
    </div>
  )
}

export default Home
