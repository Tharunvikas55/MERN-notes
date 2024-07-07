import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import DashBoard from './DashBoard'

function App() {


  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>} />
          <Route path='/register'element={<Signup/>} />
          <Route path='/login'element={<Login/>} />
          <Route path='/dashboard' element={<DashBoard/>} />
        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
