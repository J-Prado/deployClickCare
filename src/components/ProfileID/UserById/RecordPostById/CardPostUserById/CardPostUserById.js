import React from 'react'
import "./CardPostUserById.css"

function CardPostUserById({id, datPost, whenIn, whenOut, needs, startTime, endTime, agePatient, namePatient, locationReference, contact_phone, addressPatient, specialty, city, state, country}) {

let dateOne = new Date(datPost);
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
//Cuando Hora
let startHour = startTime+":00"
let endHour = endTime+":00"
let hourService = ""
if(startHour === endHour ){
    hourService += startHour
}else{
    hourService +=  startHour+" - "+endHour
}

  return (
    <div className='containerCardPostUserById'>
        <div className='containerCardPostUserByIdLeftOne'>
            <div className='containerCardPostUserByIdLeft'>
                <h3 className='subTitleCardPostUserByIdr'>Datos del Paciente</h3>
                <h3 className='textCardPostUserById '>Nombre: </h3>
                <h2 className='titleOneCardPostUserById'>{namePatient}</h2>
                <h3 className='textCardPostUserById '>Edad: </h3>
                <h3 className='titleOneCardPostUserById'>{agePatient}</h3>
                <h3 className='textCardPostUserById '>Telefono: </h3>
                <h3 className='titleOneCardPostUserById'>{contact_phone}</h3>
            </div>
            <div>
                <button className='buttonOne buttonOneCardPostUserById'>Eliminar Post</button>
            </div>
        </div>
        <div className='containerCardPostUserByIdRight'>
            <div className='dateContCardPostUserById'>
                <h3 className='dateCardPostByUser'>Publicado:<span className='dayCardPostByUser'> {postedAgo}</span></h3>
            </div>
            <div className='containerSubCardPostUserByIdRight'>
                <p className='needCardPostUserById'>{}<span>{needs}...</span></p>
            </div>
            <div className='CardPostUserByIdRightOne'>
                <div className='containerSubDataByUser'>
                    <h3 className='dateCardPostByUser '>Especialidad: </h3>
                    <h3 className='dayCardPostByUser'> {specialty}</h3>
                </div>
            </div>
            <div className='CardPostUserByIdRightOne'>
                <div className='containerSubDataByUser'>
                    <h3 className='dateCardPostByUser'>Cuando: </h3>
                    <h3 className='dayCardPostByUser'>{dateService}</h3>
                </div>
                <div className='containerSubDataByUser'>
                    <h3 className='dateCardPostByUser'>Hora:</h3>
                    <h3 className='dayCardPostByUser'>{hourService}</h3>
                </div>
            </div>
            <div className='CardPostUserByIdRightOne'>
                <div className='containerSubDataByUser'>
                    <h3 className='dateCardPostByUser '>Direccion:</h3>
                    <h3 className='dayCardPostByUser'>{addressPatient}</h3>
                </div>
                <div className='containerSubDataByUser'>
                    <h3 className='dateCardPostByUser'>Referecia: </h3>
                    <h3 className='dayCardPostByUser'>{locationReference}</h3>
                </div>
            </div>
            <div className='CardPostUserByIdRightOne CardPostUserByIdRightTwo'>
                <div className='containerSubDataByUser'>
                    <h3 className='dateCardPostByUser '>Ciudad: </h3>
                    <h3 className='dayCardPostByUser'>{city}</h3>
                </div>
                <div className='containerSubDataByUser'>
                    <h3 className='dateCardPostByUser '>Estado / Provincia: </h3>
                    <h3 className='dayCardPostByUser'>{state}</h3>
                </div>
                <div className='containerSubDataByUser'>
                    <h3 className='dateCardPostByUser '>Pais: </h3>
                    <h3 className='dayCardPostByUser'>{country}</h3>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardPostUserById
