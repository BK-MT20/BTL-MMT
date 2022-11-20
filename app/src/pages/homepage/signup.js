import React ,{useState} from 'react'
import {
  HomeOutlined,WechatOutlined ,DashOutlined,MailOutlined
} from '@ant-design/icons';
import { message } from 'antd'
import { Typography, Button, Form, Input} from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
// import axios from '../../api'

import { useNavigate } from 'react-router-dom'
import authService from './Auth'
const { Title } = Typography

const Signup = () => {
  const [ form ] = Form.useForm()
  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setcConfirmPassword ] = useState('')
  const navigate = useNavigate()
  const onFinish =  (values) => {
    try{
      authService.register(values)
        .then((res) => {
          console.log(res)
          if(res.status === 200) {
            navigate('/login') 
            window.location.reload()
          }

        }, err => {
          if(err.response.status === 500) {
            message.error('Internal Server Error')

          }
          if (err.response.status === 400) {
            message.error('User already existed.')
          }
        })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
    <div className='homepage'>
     <div className='header'>
     <h2 ><HomeOutlined href='/login' style={{color: 'white'}} /></h2>
     </div>
     
     <div className='body'>
      <h1>SIGN UP</h1>
      <p>Welcome to Chatapp</p>
   <div className='logo-signup'><WechatOutlined /></div>
   
  <div className='signup-form'>
  <Form
            form={form}
            name="normal_register"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[ { required: true, message: 'Please input your Username!' } ]}
            >
              <Input  
                prefix={<UserOutlined className="site-form-item-icon" />} 
                minLength={6}
                maxLength={30}
                onChange={e => {
                  setUsername(e.target.value)
                }}
                value = {username}
                placeholder="Username" />
            </Form.Item>
            
            <Form.Item
              name="password"
              rules={[ { required: true, message: 'Please input your Password!' } ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                onChange={e => {
                  setPassword(e.target.value)
                }}
                minLength={8}
                value = {password}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={[ 'password' ]}
              hasFeedback
              rules={[ 
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'))
                  },
                })
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                onChange={e => {
                  setcConfirmPassword(e.target.value)
                }}
                value = {confirmPassword}
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item>
            <Button shape="round" type="" 
              htmlType="submit" 
              className="login-form-button"
              >
                Sign Up
              </Button>
            </Form.Item>
            Already have an account?
            <a 
              style={{  paddingLeft: '8px', color: 'grey' }} 
              className="login-form-forgot" 
              href="/signin"
            >
                Sign In
            </a>
           
          </Form>
  </div>
  
     </div>
    
     </div>
    </>
  )
}

export default Signup
