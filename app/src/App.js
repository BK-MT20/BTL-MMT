import React from 'react'
import { Route, BrowserRouter, Routes, Outlet } from 'react-router-dom'
import { Messenger, Home } from './pages/messenger'
import { Login, Register, RequiredAuth } from './pages/auth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<RequiredAuth />}>
          <Route element={<Outlet />}>
            <Route index element={<Home />} />
            <Route path="messenger" element={<Messenger />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
