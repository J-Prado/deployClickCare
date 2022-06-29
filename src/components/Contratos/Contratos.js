import React from 'react'
import "./contratos.css"
export default function Contratos({ 
    id,
    price,
    auctionComment,
    date,
    hour,
    date_post,
    date_ini,
    date_fin,
    needs,
    namePatient,
    userPost,
    userPostSurname,
    userPostemail,
    userPostphoto,
    userPhone,
    cityPost,
    profesionalName,
    profesionalSurname ,
    profesionalPhone,
    profesionalemail,
    profesionalPhoto}) 
    {
    let fecha = date.split("T")
    let fecha2 = fecha[0].split("-")
    console.log(fecha2)
    let fechaini = date_ini.split("T")
    let fecha2ini = fechaini[0].split("-")
    let fechaFin = date_fin.split("T")
    let fecha2Fin= fechaFin[0].split("-")
  
  return (
    <div className='ContractContainerGeneral'>
    <div className='contractContainer'>
        <h1 className='contractTextTitle'> Numero de contrato "{id}"</h1>
        <h1 className='contractText'>Fecha den que se creo el contrato {fecha2[2]}/{fecha2[1]}/{fecha2[0]} a las {hour}</h1>
        <h1 className='contractText'>Se realizara en la ciudad: {cityPost}, durante las fechas: inicio {fecha2ini[2]}/{fecha2ini[1]}/{fecha2ini[0]} y finalizacion {fecha2Fin[2]}/{fecha2Fin[1]}/{fecha2Fin[0]}, entre las personas {profesionalName}, {profesionalSurname} quien brindara un servicio a {userPost}, {userPostSurname}, quien pagara la suma de pesos ${price} en concepto de atender a {namePatient} quien necesita de las siguientes actividades: {needs}</h1>
        <h1 className='contractText'>Comentario del profesional {auctionComment} </h1>
        </div>
    <div className='professionalInfo'>
      <div className='professionalInfoText' >
        <h1 className='contractTextTitle'>Datos del profesional</h1>
        <h1 className='contractText'> Nombre: {profesionalName},{profesionalSurname}</h1>
        <h1 className='contractText'> Email: {profesionalemail}</h1>
        <h1 className='contractText'> Numero telefonico: {profesionalPhone}</h1>
      </div>
        <div className='containerImgContract'>
        <img className='imagenContract' src={profesionalPhoto?profesionalPhoto:"https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6"} alt=""/>
        </div>
     </div>
    <div className='professionalInfo'>
      <div className='professionalInfoText' >
        <h1 className='contractTextTitle'> Datos del usuario</h1>
        <h1 className='contractText'> Nombre : {userPost},{userPostSurname}</h1>
        <h1 className='contractText'> Email: {userPostemail}</h1>
        <h1 className='contractText'> Numero telefonico: {userPhone}</h1>
      </div>
        <div className='containerImgContract'>
        <img className='imagenContract' src={userPostphoto?userPostphoto:"https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6"} alt=""/>
        </div>
    </div>
</div>
  )
}
