import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import google_logo from "../Components/Assets/google-logo.png"


export default function LoginSignup() {

//   const loginwithgoogle = ()=>{
// <<<<<<< HEAD
//     // window.open("http://localhost:4000/auth/google/callback","_self")
// =======
//     window.open("http://ecommerce-backend-ccoa.onrender.com/auth/google/callback","_self")
// >>>>>>> ce05c0e3cbd5a32a7d89a7e080d235aed3f54c04
//   }
  

  
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
        {/* <button onClick={loginwithgoogle} className='googleButton'><span><img className='google-logo' src={google_logo} alt="" /></span>  Sign in With Google</button> */}
      </div>
      
    </div>
  )
}
