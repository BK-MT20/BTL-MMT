import React, { useContext }from 'react'
import axios from '../../api'
import { message } from 'antd'

const login = async (username, password) => {
  try {
    const response = await axios.post('/auth/signin', 
      JSON.stringify({
        username,
        password
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )          
    return response
  }  catch(err) {
    console.log(err)
    if(err.response.status === 500) {
      message.error('Internal Server Error')
    }
    if (err.response.status === 401) {
      message.error('Password is wrong')
    }
    if (err.response.status === 404) {
      message.error('User not found')

    }
  }
  
  // .then(res => {
  //   console.log(res)
  //   if(res.data.accessToken) {
  //     localStorage.setItem('admin', JSON.stringify(res.data))
  //   }
  // }) 

}

const logout = () => {
  localStorage.removeItem('admin')
}

const register = (values) => {
  return axios.post('/auth/signup', {
    username: values.username,
    email : values.email,
    password: values.password,
  })
}
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('admin'))
}

const authService = { 
  login,
  logout,
  getCurrentUser

}

export default authService  