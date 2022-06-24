import React from 'react'
import "./CardUseData.css"

const CardUseData = ({name, lastName,document, birthday, email, city, state, country, phone, phone2, address, idProf, title, speciality, institution, studyStart, studyEnd, cvu}) => {

//console.log(trainings)    

const dayB =  new Date(birthday).getDate()
const monthb = new Date(birthday).getMonth()+1
const yearB =  new Date(birthday).getFullYear();
const birthdayDate = dayB+"/"+monthb+"/"+yearB
const dateOne = new Date().getFullYear()
const age = dateOne - yearB

const idVer =  idProf
//console.log(idVer)
let verificOne = 0
if (idVer !== undefined){
    verificOne =+ 1
}

const startDate = studyStart => [
    'Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'
][new Date(studyStart).getMonth()];
let studyintial = startDate(studyStart)+"-"+ new Date(studyStart).getFullYear();
const endDate = studyEnd => [
    'Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'
][new Date(studyEnd).getMonth()];
let studyedn = endDate(studyEnd)+"-"+ new Date(studyEnd).getFullYear();


  return (
    <div className='dataUserIdConteiner'>
        <div className='containerTextDataUser' >
            <h3 className='TitleDataUser'>Nombres</h3>
            <h3 className='TitleDataUser'>Apellidos</h3>
            <h3 className='TitleDataUser'>Documento de Identidad</h3>
        </div>
        <div className='containerTextDataUser' >
            <h3 className='infoDataUser'>{name.toUpperCase()}</h3>
            <h3 className='infoDataUser'>{lastName.toUpperCase()}</h3>
            <h3 className='infoDataUser'>{document}</h3>
        </div>
        <div className='containerTextDataUser' >
            <h3 className='TitleDataUser '>Fecha naciemiento</h3>
            <h3 className='TitleDataUser oneTitleUser'>Edad</h3>
            <h3 className='TitleDataUser twoTitleUser'>Correo Electronico</h3>
        </div>
        <div className='containerTextDataUser' >
            <h3 className='infoDataUser'>{birthdayDate}</h3>
            <h3 className='infoDataUser oneTitleUser'>{age}</h3>
            <h3 className='infoDataUser twoTitleUser'>{email}</h3>
        </div>

        {verificOne === 1?
        <div>
            <div className='containerTextDataUser' >
                <h3 className='TitleDataUser'>Nivel Educativo</h3>
                <h3 className='TitleDataUser'>Institucion Educativa</h3>
                <h3 className='TitleDataUser'>Titulo</h3>
            </div>
            <div className='containerTextDataUser' >
                <h3 className='infoDataUser'>{speciality}</h3>
                <h3 className='infoDataUser'>{institution}</h3>
                <h3 className='infoDataUser'>{title}</h3>
            </div>
            <div className='containerTextDataUser' >
                <h3 className='TitleDataUser'>Fecha de Inicio</h3>
                <h3 className='TitleDataUser'>Fecha de Finalizacion</h3>
                <h3 className='TitleDataUser'>Tarjeta profesional</h3>
            </div>
            <div className='containerTextDataUser' >
                <h3 className='infoDataUser'>{studyStart?studyintial:null}</h3>
                <h3 className='infoDataUser'>{studyEnd?studyedn:null}</h3>
                <h3 className='infoDataUser'>{cvu}</h3>
            </div>
        </div>
        :null}

        <div className='containerTextDataUser' >
            <h3 className='TitleDataUser threeTitleUser'>Telefono</h3>
            <h3 className='TitleDataUser threeTitleUser'>Movil</h3>
            <h3 className='TitleDataUser forTitleUser'>Direccion</h3>
        </div>
        <div className='containerTextDataUser' >
            <h3 className='infoDataUser threeTitleUser'>{phone2}</h3>
            <h3 className='infoDataUser threeTitleUser'>{phone}</h3>
            <h3 className='infoDataUser forTitleUser'>{address}</h3>
        </div>
        <div className='containerTextDataUser' >
            <h3 className='TitleDataUser'>Ciudad</h3>
            <h3 className='TitleDataUser'>Estado / Provincia</h3>
            <h3 className='TitleDataUser'>Pais</h3>
        </div>
        <div className='containerTextDataUser' >
            <h3 className='infoDataUser'>{city}</h3>
            <h3 className='infoDataUser'>{state}</h3>
            <h3 className='infoDataUser'>{country}</h3>
        </div>
    </div>
  )
}

export default CardUseData