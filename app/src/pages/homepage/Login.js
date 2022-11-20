import React from 'react'
import {
  HomeOutlined,WechatOutlined ,DashOutlined
} from '@ant-design/icons';
import {Button} from 'antd'

const Login = () => {
  return (
    <>
    <div className='homepage'>
     <div className='header'>
     <h2><HomeOutlined style={{color: 'white'}} href='/login'/></h2>
     </div>
     
     <div className='body'>
      <h1>CHAT APP</h1>
      <p>Bring the world closed together</p>
   <div className='logo'><WechatOutlined /></div>
   <p>Start with Sign in or Sign up</p>
   <div className='button'>
   <div className='button2'><Button shape="round" className='button1' href='/signin'>
            SIGN IN 
          </Button></div>
          <div className='button2'><Button shape="round" className='button1' href='/signup'>
            SIGN UP
          </Button></div>
          </div>
       <p className='end'><DashOutlined /> <DashOutlined /> <DashOutlined /></p>  
     </div>
     </div>
    </>
  )
}

export default Login
