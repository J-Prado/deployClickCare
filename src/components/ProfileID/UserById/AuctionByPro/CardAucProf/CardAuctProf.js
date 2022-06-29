import React from 'react'
import "./CardAuctProf.css"

function CardAuctProf({date,offer,comment,approved,date_post,date_ini,date_fin,needs,namePatient,agePatient,city}) {
    
  console.log(approved)
    const whenIn = date_ini
    const whenOut = date_fin

    let dateOne = new Date(date);
    let dateNow = new Date()
    let difference= Math.abs(dateNow-dateOne);
    let postedAgo = difference/(1000 * 3600 * 24)
    if (postedAgo >= 2.5){
        postedAgo = "hace " + Math.round(postedAgo) + " dias"
    }else if (postedAgo >1.5 ){
        postedAgo = "hace "+Math.floor(postedAgo)+" dia"
    }else{
        postedAgo = "Hoy"
    }
    let dateOne1 = new Date(date_post);
    let dateNow1 = new Date()
    let difference1= Math.abs(dateNow1-dateOne1);
    let postedAgo1 = difference1/(1000 * 3600 * 24)
    if (postedAgo1 >= 2.5){
        postedAgo1 = "hace " + Math.round(postedAgo1) + " dias"
    }else if (postedAgo1 >1.5 ){
        postedAgo1 = "hace "+Math.floor(postedAgo1)+" dia"
    }else{
        postedAgo1 = "Hoy"
    }

    const startDate = whenIn => [
      'Lun','Mar','Mie','Jue','Vie','Sab','Dom',
  ][new Date(whenIn).getDay()];
  let dayNumIn = new Date(whenIn).getDate()
  const textMonthin = whenIn => [
      'Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'
  ][new Date(whenIn).getMonth()];
  let startDateCard = startDate(whenIn) + " " + dayNumIn + "-" + textMonthin(whenIn)

  const endDate = whenOut => [
      'Lun','Mar','Mie','Jue','Vie','Sab','Dom',
  ][new Date(whenOut).getDay()];
  let dayNumOut = new Date(whenOut).getDate()
  const textMonthout = whenOut => [
      'Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'
  ][new Date(whenOut).getMonth()];
  let endDateCard = endDate(whenOut)+" "+ dayNumOut+"-"+textMonthout(whenOut)

  let dateService = ""
  if(startDateCard === endDateCard ){
      dateService += startDateCard
  }else{
      dateService +=  startDateCard+" - "+endDateCard
  }

  return (
    <div className='containerCardAuctProf'>
      <div className='containerCardAuctProfLeft'>
        <h3 className='datetitleApli'>Aplicaste hace: </h3>
        <h3 className='dataAuctiExtra'>{postedAgo}</h3>
        <h2 className='datetitleApli'>Oferta: </h2>
        <h2 className='dataAuctiExtra'>$ {offer}</h2>
        <h2 className='datetitleApli'>Comentario: </h2>
        <h2 className='dataAuctiExtra'>{comment}</h2>
        <button className='buttonOne buttonOneCardPostUserById'>Eliminar</button>
      </div>
      <div className='containerCardAuctProfRight'>
        <h2 className='titlePosAuc'>Oferta: </h2>
        <h2 className='datetitlePosAuc'>Oferta desde: <span className='datetitlePosAucOne '>{postedAgo1}</span></h2>
        <h2 className='subTitleActuc'>Oferta desde:</h2>
        <h2 className='textoAuctTwo'>{dateService}</h2>
        <h2 className='subTitleActuc'>Comentario: </h2>
        <h2 className='textoAuctTwo'>{needs}</h2>
        <h2 className='datetitlePosAuc twoAucti2'>Paciente: <span className='datetitlePosAucOne '> {namePatient}</span> </h2>
        
        <h2 className='datetitlePosAuc twoAucti2'>Edad: <span className='datetitlePosAucOne '> {agePatient}</span> </h2>
        
      </div>
    </div>
  )
}

export default CardAuctProf
