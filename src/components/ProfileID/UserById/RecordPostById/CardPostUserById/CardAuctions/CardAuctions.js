import React from 'react'
import "./CardAuctions.css"


const CardAuctions = ({id, date, offer, comment, name, surname}) => {
  
  
        
  const startDate = date => [
      'Lun','Mar','Mie','Jue','Vie','Sab','Dom',
  ][new Date(date).getDay()];
  let dayNumIn = new Date(date).getDate()
  const textMonthin = date => [
      'Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'
  ][new Date(date).getMonth()];
  let startDateCard = startDate(date) + " -" + dayNumIn + " " + textMonthin(date)+" "+new Date(date).getFullYear()

  

  return (
    <div className='containerCardAuctions'>
      <div className='containerCardAuctionsleft'>
        <div>
          <h3 className='dayCardPostByUser comenctActuinCardOne'>Fecha de Aplicacion:<span className='dateCardPostByUser comenctActuinCardOne'> {startDateCard}</span></h3>
          <h3 className='dateCardPostByUser comenctActuinCard'>Comentario:</h3>
          <span className='dayCardPostByUser comenctActuinCard'> {comment}</span>
          <h3 className='dateCardPostByUser comenctActuinCard'>Tarifa: <span className='dayCardPostByUser comenctActuinCard'>$ {offer}</span></h3>
        </div>
      </div>
      <div className='containerCardAuctionsRight'>
        <h3 className='dateCardPostByUser comenctActuinCard'>Nombre:</h3>
        <span className='dayCardPostByUser comenctActuinCard'> {name+" "+surname}</span>
        
        <button className='buttonOne cardAucButton'>Aceptar Propuesta</button>
        
      </div>
  </div>
  )
}

export default CardAuctions
