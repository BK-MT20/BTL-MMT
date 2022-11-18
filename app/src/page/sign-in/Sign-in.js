import logo from '../../logo.svg';
import './Sign-in.css';
import React  from 'react';
import { WechatOutlined}from '@ant-design/icons';
import { Button,Space} from 'antd';
import { Input } from 'antd';
import { UserOutlined,HomeOutlined } from '@ant-design/icons';
function SignIn() {
 
  return (
    <div className="Signin">
    <header className="Signin-header">
    
    
     <div className='icon1'><a href='/' className='icon1'><HomeOutlined   /></a></div> 
     <div className='icon2'><WechatOutlined /></div> 
   
    </header>
    <div className="Body">
      <h1>SIGN IN</h1>
      <p>Enter UserName and Password to Signin</p>
      
      </div>
      <img src={logo} className="Signin-logo" alt="logo" />
    
    <div className='Enter'>
      
    <Input className='input' size="large" placeholder="Enter Your UserName" prefix={<UserOutlined />} />
    <Input className='input' size="large" placeholder="Enter Your PassWord" prefix={<UserOutlined />} />
    
    </div>
    <Space direction="vertical">
      <Button shape="round"  size={'large'} className="button" href='/signin'> Sign in</Button>
    
      </Space>
    <p>Don't have an account ?<a href='/signup'>Sign up here.</a></p> 
   
    
    
  </div>
  );
}

export default SignIn;


