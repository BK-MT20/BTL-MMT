import React from 'react'
import { Route, BrowserRouter, Routes, Outlet } from 'react-router-dom'
import { Messenger, Home} from './pages/messenger'
import {Login,Signin, Signup} from './pages/homepage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      
    
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path="messenger" element={<Messenger />} />
          
          <Route path="messenger" element={<Messenger />} />
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
