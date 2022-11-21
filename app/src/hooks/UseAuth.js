import { useContext } from 'react'
import AuthContext from '../pages/auth/context/AuthProvider'

const UseAuth = () => {
  return useContext(AuthContext)
}

export default UseAuth
