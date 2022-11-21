import React, { useState } from 'react'
import { Typography, Button, Form, Input, Card, message } from 'antd'
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import AuthSlider from '../../components/AuthSlider'
import authService from './Auth'

const { Title } = Typography

const Register = () => {
  const [form] = Form.useForm()
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setcConfirmPassword] = useState('')
  const navigate = useNavigate()
  const onFinish = (values) => {
    try {
      authService.register(values).then(
        (res) => {
          console.log(res)
          if (res.status === 200) {
            navigate('/login')
            window.location.reload()
          }
        },
        (err) => {
          if (err.response.status === 500) {
            message.error('Internal Server Error')
          }
          if (err.response.status === 400) {
            message.error('User already existed.')
          }
        },
      )
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="login-container">
      <AuthSlider />
      <div className="right-container">
        <Card style={{ margin: '100px' }}>
          <Title style={{ textAlign: 'center' }} level={3}>
            Welcome
          </Title>
          <Form
            form={form}
            name="normal_register"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                minLength={6}
                maxLength={20}
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
                value={username}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your Name!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                maxLength={20}
                value={name}
                placeholder="Enter name"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                minLength={6}
                value={password}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!',
                      ),
                    )
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                onChange={(e) => {
                  setcConfirmPassword(e.target.value)
                }}
                value={confirmPassword}
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                style={{
                  width: '100%',
                  backgroundColor: '#7DA863',
                  borderRadius: '10px',
                  border: '1px solid #7DA863',
                  // color: 'white'
                }}
                type=""
                htmlType="submit"
                className="login-form-button"
              >
                Sign Up
              </Button>
            </Form.Item>
            Already have an account?
            <a
              style={{ paddingLeft: '8px', color: 'grey' }}
              className="login-form-forgot"
              href="/login"
            >
              Sign In
            </a>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Register
