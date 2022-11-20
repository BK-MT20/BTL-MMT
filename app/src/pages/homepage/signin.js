import React ,{useState} from 'react'
import {
  HomeOutlined,WechatOutlined ,DashOutlined
} from '@ant-design/icons';

import { Typography, Button, Form, Input} from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
// import axios from '../../api'

import { useNavigate } from 'react-router-dom'

const { Title } = Typography

const Signin = () => {
  const [ form ] = Form.useForm()
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()
  const onFinish = async (values) => {
    // try{
    //   await authService.login(values)
    //     .then(() => {
    //       if(authService.getCurrentUser()) {
    //         navigate('/') 
    //         window.location.reload()
    //       }
    //     }, err => {
    //       console.log(err)
    //     })
    // } catch (err) {
    //   console.log(err)
    // }
  }
  return (
    <>
    <div className='homepage'>
     <div className='header'>
     <h2 ><HomeOutlined href='login' style={{color: 'white'}} /></h2>
     </div>
     
     <div className='body'>
      <h1>SIGN IN</h1>
      <p>Welcome to Chatapp</p>
   <div className='logo'><WechatOutlined /></div>
   <p>Enter your UserName and Password to Sign in</p>
  <div className='signin-form'>
  <Form
            form={form} 
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[ { required: true, message: 'Please input your Username!' } ]}
            >
              <Input  
                value = {username}
                minLength={6}
                maxLength={30}
                onChange = {e => {
                  setUsername(e.target.value)
                }}
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[ { required: true, message: 'Please input your Password!' } ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                minLength={8}
                value = {password}
                onChange = {e => {
                  setPassword(e.target.value)
                }}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item >
              <Button shape="round" type="" 
              htmlType="submit" 
              className="login-form-button"
              >
                Sign In
              </Button>
            </Form.Item>
    
          </Form>
  </div>
  <div><p>Don't have an account ? <a href='/signup'>Sign up here.</a></p> </div>
     </div>
    
     </div>
    </>
  )
}

export default Signin
