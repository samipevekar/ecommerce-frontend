import React, { useContext, useRef, useState } from 'react'
import "./Navbar.css"
import {Link} from "react-router-dom"

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/down.png'

export default function Navbar() {


    const [menu,setMenu]=useState("shop")  //to set underline to the li in ul
    const {getTotalCartItems} = useContext(ShopContext)
    const menuRef = useRef()

    const dropdown_toggle = (e)=>{
      menuRef.current.classList.toggle('nav-menu-visible')
      e.target.classList.toggle('open')

    }


  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <img src={nav_dropdown} alt='' onClick={dropdown_toggle} className='nav-dropdown' id='nav-dropdown'></img>
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:"none"}} to='/'>Shop</Link> {menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:"none"}}  to='/mens'>Men</Link>  {menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:"none"}}  to='/womens'>Women</Link>  {menu==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:"none"}}  to='/kids'>Kids</Link>  {menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
        {localStorage.getItem("auth-token")?<button onClick={()=>{localStorage.removeItem("auth-token");window.location.pathname="/"}}>Logout</button>:<Link to='/login'><button>Login</button></Link>
        }
           <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      
    </div>
  )
}
