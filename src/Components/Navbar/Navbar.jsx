import React, { useContext, useEffect, useRef, useState } from 'react';
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/down.png';
import user1 from '../Assets/account.png';


export default function Navbar() {


    const [menu, setMenu] = useState("shop"); //to set underline to the li in ul
    const [showLoginSignup, setShowLoginSignup] = useState(false); // State to control visibility of login/signup section
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    };

    const user_toggle = () => {
        setShowLoginSignup((prev) => !prev ); // Toggle the state to show/hide login/signup section
    };

    const [userdata,setUserdata] = useState('')


    useEffect(()=>{
        fetchuser()
    },[])

    const fetchuser = async()=>{
        let response = await fetch("https://ecommerce-backend-ccoa.onrender.com/userdata",{
            method:"GET",
            headers:{
                'Content-Type':"application/json",
                'auth-token':`${localStorage.getItem("auth-token")}`
            }
            
        })
        let data = await response.json()
        setUserdata(data)
        
    }

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <img src={nav_dropdown} alt='' onClick={dropdown_toggle} className='nav-dropdown' id='nav-dropdown'></img>
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: "none" }} to='/'>Shop</Link> {menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: "none" }} to='/mens'>Men</Link>  {menu === "mens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: "none" }} to='/womens'>Women</Link>  {menu === "womens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: "none" }} to='/kids'>Kids</Link>  {menu === "kids" ? <hr /> : <></>}</li>
            </ul>

            <div className="nav-login-cart">
                <div className="userinformation">
                    <img src={user1} className='userInfo'  onClick={user_toggle} alt="" />
                    <div onClick={user_toggle}>{userdata.name}</div>
                </div>
                {showLoginSignup && ( // Conditionally render login/signup section based on state
                    <div className="loginandsignup" >

                        <div className="userdata">
                        <img src={user1} className='userInfo' alt="" />
                            <p style={{fontSize:"20px"}}><b>{userdata.name}</b></p>
                            <p>{userdata.email}</p>
                        </div>                      
                        {localStorage.getItem("auth-token") ?
                            <button onClick={() => { localStorage.removeItem("auth-token"); window.location.pathname = "/" }}>Logout</button> :
                            <Link to='/login'><button>Login</button></Link>
                        }
                        
                    </div>
                )}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}
