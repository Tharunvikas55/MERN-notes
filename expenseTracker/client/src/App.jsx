import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import DashBoard from './pages/DashBoard'
import Footer from './components/Footer';


function App() {


  return (
    <>
      <div>
       
        <BrowserRouter>
        <ToastContainer />
        <Routes>
        {/* <Route path='/' element={<Home/>} /> */}
          <Route path='/register'element={<Register/>} />
          <Route path='/'element={<Login/>} />
          <Route path='/dashboard' element={<DashBoard/>} />
        </Routes>
        
        </BrowserRouter>
        
        <Footer/>
      </div>
    </>
  )
}

export default App
