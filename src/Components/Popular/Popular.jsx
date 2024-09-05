import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Items/Item'

export default function Popular() {
  const [data_product,setData_Product] = useState([])
  let [isPending,setIsPending] = useState(false)
  useEffect(()=>{
    setIsPending(true)
    fetch("https://ecommerce-backend-ccoa.onrender.com/popularinwomen")
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      setData_Product(data)
      setIsPending(false)
    })

  },[])
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {isPending && <div className='loader'></div>}
        {data_product.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />

        })}
      </div>
    </div>
  )
}
