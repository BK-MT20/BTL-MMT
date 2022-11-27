import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter, Routes, Outlet } from 'react-router-dom'
import { Messenger, Home } from './pages/messenger'
import { Login, Register, RequiredAuth } from './pages/auth'
import io from 'socket.io-client'
import SocketContext from './contexts/socket'
function App() {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const connectSocket = async () => {
      const newSocket = io('http://localhost:8080')
      setSocket(newSocket)
    }

    connectSocket()
    return () => {
      socket?.close()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>
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
    </SocketContext.Provider>
  )
}

export default App
