import React from 'react';
import { Route, BrowserRouter, Routes, Outlet } from 'react-router-dom';
function App() {
  return (
    // <div className="App">
    //   <div className="header">
    //     <div className=""></div>
    //   </div>
    // </div>
    <BrowserRouter>
      <Routes>
        {/* <Route index path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/> */}
        {/* <Route path='/' element={<RequiredAuth />}>

        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
