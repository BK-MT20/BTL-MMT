import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/UseAuth'
import { Container } from '../messenger'
import { message } from 'antd'

const RequiredAuth = () => {
  const { auth } = useAuth()
  const location = useLocation()
  return auth?.username ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequiredAuth
