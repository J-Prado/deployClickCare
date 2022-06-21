import React from 'react'
import phone from "./Img/62.png"
import "./Phone.css"
function Phone() {
  return (
    <div className='phoneContainer'>
    <div className='Colum1'></div>
    <div className='phoneCall'>
          <img className='phoneImg' src={phone} alt=""/>
    </div>
    <div className='phoneTexto'>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente voluptatum qui adipisci.</p>
      <button className='buttonOne'>Descargar</button>
    </div>
   
    <div className='Colum1'></div>
    </div>
  )
}
export default Phone