import logo from '../../logo.svg';
import './home.css'

import React  from 'react';
import { WechatOutlined,DashOutlined }from '@ant-design/icons';
import { Button,Space} from 'antd';

function Home() {
 
  return (
    
    <div className="Home">
      <header className="Home-header">
        <h1>
      <WechatOutlined />
      </h1>
      </header>
      <div className="Body">
        <h1>CHAT APP</h1>
        <p>Bring the world closed together</p>
        
        </div>
        <img src={logo} className="Home-logo" alt="logo" />
        <div>
        <Space>
    <DashOutlined style={{color:"#41AAC4" }}/>
    <DashOutlined style={{color:"#41AAC4" }}/>
   <DashOutlined style={{color:"#41AAC4" }}/>
   
  </Space>
  </div>
        <p > Start with Sign in or Sign up</p>
      <div className='Button'>
      <Space direction="vertical">
      <Button shape="round"  size={'large'} className="button" href='/signin'> Sign in</Button>
      <Button shape="round"  size={'large'} className="button" href='/signup'>Sign up</Button>
      </Space>
      </div>
      
     
      
      
    </div>
  );
}

export default Home;


