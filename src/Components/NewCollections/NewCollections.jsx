import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Items/Item'

export default function NewCollections() {
  const [new_collection,setNew_Collection] = useState([])
  let [isPending,setIsPending] = useState(false)
  useEffect(()=>{
    setIsPending(true)
    fetch("https://ecommerce-backend-ccoa.onrender.com/newcollections")
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      setNew_Collection(data)
      setIsPending(false)
    })
  },[])
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
      {isPending && <div className='loader'></div>}
        {new_collection.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}
