import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0            
    }
    return cart
}

const ShopContextProvider = (props)=>{
    
    const [all_product,setAll_Product] = useState([])

    const [cartItems,setCartItems] = useState(getDefaultCart)

    
    useEffect(()=>{
        fetch("https://ecommerce-backend-ccoa.onrender.com/allproducts")
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            setAll_Product(data)
        })

        if(localStorage.getItem("auth-token")){
            fetch('https://ecommerce-backend-ccoa.onrender.com/getcart',{
                method:"POST",
                headers:{
                    Accept:"application/form-data",
                    'auth-token':`${localStorage.getItem("auth-token")}`,
                    'Content-Type':"application/json"
                },
                body:"",
            }).then((res)=>res.json())
            .then((data)=>setCartItems(data))
        }
    },[])
   
    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem("auth-token")){
            fetch("https://ecommerce-backend-ccoa.onrender.com/addtocart",{
                method:"POST",
                headers:{
                    Accept:"application/form-data",
                    'auth-token':`${localStorage.getItem("auth-token")}`,
                    'Content-Type':"application/json"
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response=>response.json()))
            .then((data)=>console.log(data))
        }

    }
    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem("auth-token")){
            fetch("https://ecommerce-backend-ccoa.onrender.com/removefromcart",{
                method:"POST",
                headers:{
                    Accept:"application/form-data",
                    'auth-token':`${localStorage.getItem("auth-token")}`,
                    'Content-Type':"application/json"
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response=>response.json()))
            .then((data)=>console.log(data))
        }

    }

    
    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((totalAmount, itemId) => {
            if (cartItems[itemId] > 0) {
                const itemInfo = all_product.find(product => product.id === Number(itemId));
                totalAmount += itemInfo.new_price * cartItems[itemId];
            }
            return totalAmount;
        }, 0);
    };
    
    

    
    const getTotalCartItems = ()=>{
        let totalItem = 0
        for(let item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item]
            }
        }
        return totalItem
    }

    const contextValue = {getTotalCartAmount,getTotalCartItems,all_product,cartItems,addToCart,removeFromCart};
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider