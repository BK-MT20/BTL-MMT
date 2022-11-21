import axios from '../../api'
import { message } from 'antd'

const login = async (username, password) => {
  try {
    const response = await axios.post(
      'auth/signin',
      JSON.stringify({
        username,
        password,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      },
    )
    return response
  } catch (err) {
    console.log(err)
    if (err.response.status === 500) {
      message.error('Internal Server Error')
    }
    if (err.response.status === 401) {
      message.error('Password is wrong')
    }
    if (err.response.status === 404) {
      message.error('User not found')
    }
  }
}

const register = async (values) => {
  return await axios.post('auth/signup', {
    username: values.username,
    name: values.name,
    password: values.password,
  })
}
const logout = () => {}
const authService = {
  login,
  register,
}

export default authService
