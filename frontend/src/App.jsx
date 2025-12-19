import React from 'react'
import Home from './component/Home'
import Login from './component/Login'
import Signup from './component/Signup'
import { Navigate, Route, Routes } from 'react-router-dom'
import PageNotFound from './component/PageNotFound'
import { Toaster } from 'react-hot-toast';
import About from './component/About'
function App() {
  const token= localStorage.getItem("jwt");
  return (
    <div>
      <Routes>
        <Route path="/" element={token?<Home/>:<Navigate to={"/login"}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={ <Signup/> }/>
        <Route path="/about" element={ <About/> }/>
        <Route path="*" element={ <PageNotFound/> }/>
      </Routes>
      <Toaster/>
    </div> 
  )
}

export default App
