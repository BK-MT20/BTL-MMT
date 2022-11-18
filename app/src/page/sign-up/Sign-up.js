import logo from '../../logo.svg';
import './Sign-up.css';
import React  from 'react';
import { WechatOutlined}from '@ant-design/icons';
import { Button,Space} from 'antd';
import { Input } from 'antd';
import { UserOutlined,HomeOutlined  } from '@ant-design/icons';
function Signup() {
 
  return (
    <div className="Signup">
    <header className="Signup-header">
   
     <div className='icon2'><WechatOutlined /></div> 
    </header>
    <div className="Body">
      <h1>SIGN UP</h1>
      <p>You and your friend always connected !</p>
      
      </div>
      <img src={logo} className="Signup-logo" alt="logo" />
    
    <div className='Enter'>
      
    <Input className='input' size="large" placeholder="Enter Your UserName" prefix={<UserOutlined />} />
    <Input className='input' size="large" placeholder="Enter Your PassWord" prefix={<UserOutlined />} />
    <Input className='input' size="large" placeholder="Confirm Your PassWord" prefix={<UserOutlined />} />
    
    </div>
    <Space direction="vertical">
      <Button shape="round"  size={'large'} className="button" href='/Signup'> Sign up</Button>
    
      </Space>
    <p>You already have an account.<a href='/signin'>Sign in now.</a></p> 
   
    
    
  </div>
  );
}

export default Signup;


