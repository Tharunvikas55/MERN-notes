import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'

function App() {


  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
          <Route path='/register'element={<Signup/>} />
          <Route path='/login'element={<Login/>} />
          <Route path='/' element={<Home/>} />
        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
