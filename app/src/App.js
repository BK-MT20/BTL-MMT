import React from 'react'
import { Route, BrowserRouter, Routes, Outlet } from 'react-router-dom'
import { Messenger, Home } from './pages/messenger'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path="messenger" element={<Messenger />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
