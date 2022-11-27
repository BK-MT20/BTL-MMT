import { useLocation, Navigate, Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/UseAuth'
import { Container } from '../messenger'
import { message } from 'antd'
import axios from '../../api'
import { useEffect } from 'react'
import UseRefreshToken from '../../hooks/UseRefreshToken'

const RequiredAuth = () => {
  const { auth } = useAuth()
  const location = useLocation()
  const refresh = UseRefreshToken()
  const navigate = useNavigate()
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          navigate('/login')
        }
        return Promise.reject(error)
      },
    )
  }, [])
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default RequiredAuth
