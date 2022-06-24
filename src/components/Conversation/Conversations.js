import React from 'react'
import "./conversations.css"

export default function Conversations({name,img}) {
  
  return (
    <div className='conversations'>
     <img src={img} alt='' className='conversationsimage'/>
     <span className='conversationsName'> {name}</span>
    </div>
  )
}
