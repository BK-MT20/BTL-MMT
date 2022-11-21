import axios from '../api'
import UseAuth from './UseAuth'

const UseLogout = () => {
  const { setAuth } = UseAuth()
  const logout = async () => {
    setAuth({})
    try {
      const response = await axios('auth/signout', {
        withCredentials: true,
      })
    } catch (err) {
      console.log(err)
    }
  }
  return logout
}

export default UseLogout
