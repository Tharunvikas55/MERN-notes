// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
// import DashBoard from './pages/DashBoard'

function App() {


  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
        <Route path='/home' element={<Home/>} />
          <Route path='/register'element={<Register/>} />
          <Route path='/'element={<Login/>} />
          {/* <Route path='/dashboard' element={<DashBoard/>} /> */}
        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
