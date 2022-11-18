
import './App.css';
import SignIn from './page/sign-in/Sign-in'
import SignUp from './page/sign-up/Sign-up'
import Home from './page/home/home'
import './App.css';
import React  from 'react';
import {
  BrowserRouter as Router, Routes,Route
} from 'react-router-dom'

function App() {
  
  return (
   
    <Router>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
  </Router>
   
    
  //   <div className="App">
  //     <header className="App-header">
  //       <h1>
  //     <WechatOutlined />
  //     </h1>
  //     </header>
  //     <div className="Body">
  //       <h1>CHAT APP</h1>
  //       <p>Bring the world closed together</p>
        
  //       </div>
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <div>
  //       <Space>
  //   <SmileTwoTone twoToneColor="#41AAC4" />
  //   <SmileTwoTone twoToneColor="#41AAC4" />
  //  <SmileTwoTone twoToneColor="#41AAC4" />
   
  // </Space>
  // </div>
  //       <p > Start with Sign in or Sign up</p>
  //     <div className='Button'>
  //     <Space direction="vertical">
  //     <Button shape="round"  size={'large'} className="button" onClick={()=>SignIn}> Sign in</Button>
  //     <Button shape="round"  size={'large'} className="button">Sign up</Button>
  //     </Space>
  //     </div>
      
     
      
  //   </div>
  
  
  );
}

export default App;


