import React from 'react'
import "./message.css"
import {format} from "timeago.js"

export default function message({message, own, img}) {

  return (
    <div className={own ? "message own" : "message"}>
      <div className='messageTop'>
        <img className='messageImage' src={img} alt='' />
        <p className='messageText'>
         {message.text} 
        </p>
        
      </div>
      <div className='messageBottom'>{format(message.createdAt) }</div>
    </div>
  )
}
