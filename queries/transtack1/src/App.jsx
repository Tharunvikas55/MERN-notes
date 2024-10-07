import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import PostTrad from './components/PostTrad'
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import PostQuery from './components/PostQuery'
import PostQueryDetail from './components/PostQueryDetail'

function App() {
 

  return (
   <BrowserRouter>
   <div>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/posts'>Traditional</Link></li>
        <li> <Link to='/rq'>React Query</Link> </li>
      </ul>
    </nav>
    <Routes>
      <Route exact path='/' element={ <Home/> }/>
      <Route exact path='/posts' element={ <PostTrad/> }/>
      <Route exact path='/rq' element={ <PostQuery/> }/>
      <Route exact path='/rq/:postId' element={ <PostQueryDetail/> } />
    </Routes>
   </div>
   </BrowserRouter>
  )
}

export default App
