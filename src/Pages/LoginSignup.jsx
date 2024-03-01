import React, { useState } from 'react'
import './CSS/LoginSignup.css'


export default function LoginSignup() {

  

  
  const [state,setState] = useState("Login")
  const [formData,setFormData] = useState({
    name:"",
    password:"",
    email:""
  })

  const changeHandler = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})

  }

  const login = async(e)=>{
    console.log('login',formData)
    let responseData;
    await fetch("https://ecommerce-backend-ccoa.onrender.com/login",{
      method:"POST",
      headers:{
        Accept:"application/form-data",
        'Content-Type':"application/json"
      },
      body:JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      window.location.pathname="/"
    }
    else{
      alert(responseData.errors)
    }
  

  }
  const signup = async(e)=>{
    console.log('signup',formData)
    let responseData;
    await fetch("https://ecommerce-backend-ccoa.onrender.com/signup",{
      method:"POST",
      headers:{
        Accept:"application/form-data",
        'Content-Type':"application/json"
      },
      body:JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      window.location.pathname="/"
    }
    else{
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
         {state === "Sign Up" ? <input type="text" name='name' value={formData.name} onChange={changeHandler} placeholder='Your Name'  />:<></>}
          <input type="email" name='email' value={formData.email} onChange={changeHandler} placeholder='Email Address' />
          <input type="password" name='password' value={formData.password} onChange={changeHandler} placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up" ?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>
        :<p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
        
      
      </div>
      
    </div>
  )
}
