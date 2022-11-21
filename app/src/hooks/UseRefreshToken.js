import axios from '../api'
import useAuth from './UseAuth'
const UseRefreshToken = () => {
  const { setAuth } = useAuth()
  const refresh = async (req, res) => {
    const response = await axios.post('auth/refreshToken', {
      withCredentials: true,
    })
    setAuth((prev) => {
      // console.log(JSON.stringify(prev))
      // console.log(response.data.accessToken)
      return { ...prev, accessToken: response.data.accessToken }
    })
    return response.data.accessToken
  }
  return refresh
}

export default UseRefreshToken
