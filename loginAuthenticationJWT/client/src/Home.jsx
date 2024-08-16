import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const navigate=useNavigate()
    axios.defaults.withCredentials=true;
    useEffect(()=>{
        axios.get('http://localhost:3001/home')
        .then(res=>{
            if (res.data !== 'Success') {
                navigate('/login');
              } else {
                navigate('/home');
              }
        })
        .catch(err=>console.log(err))
    }, [navigate])
  return (
    <div>
      Home
    </div>
  )
}

export default Home
