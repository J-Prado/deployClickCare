import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail } from '../../../../redux/action.js';
import logonavbar from "../../../../images/logonavbar.png"

import "./InfoById.css"

function InfoById({idUs}) {
      
    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(getUserDetail(idUs))
    }, [dispatch, idUs]);
    
    const detailUser = useSelector(state => state.userDetail);  
    const idValidate =  detailUser[0]?.professionals[0]?.id
  
    let verific = 0
      if (idValidate !== undefined){
        verific =+ 1
      }

    const birthday = detailUser[0]?.age 
    const dayB =  new Date(birthday).getDate()
    const monthb = new Date(birthday).getMonth()+1
    const yearB =  new Date(birthday).getFullYear();
    const birthdayDate = dayB+"/"+monthb+"/"+yearB
    const dateOne = new Date().getFullYear()
    const age = dateOne - yearB

    const studyStart = detailUser[0]?.professionals[0]?.date_inicioEstudio
    const studyEnd = detailUser[0]?.professionals[0]?.date_finicioEstudio

    const startDate = studyStart => [
        'Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'
    ][new Date(studyStart).getMonth()];
    let studyintial = startDate(studyStart)+"-"+ new Date(studyStart).getFullYear();
    const endDate = studyEnd => [
        'Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'
    ][new Date(studyEnd).getMonth()];
    let studyedn = endDate(studyEnd)+"-"+ new Date(studyEnd).getFullYear();
    
    //console.log(detailUser[0]?.professionals[0]?.address)

    return (
        <div className='containerInfoById'>
            <div className='containerButtonInfoById'>
                <img className='logonavbarInfoById' src={logonavbar} alt="logoClickCare"/>
            </div>
            <div className='containerTextDataUser' >
                <h3 className='TitleDataUser'>Nombres</h3>
                <h3 className='TitleDataUser'>Apellidos</h3>
                <h3 className='TitleDataUser'>Documento de Identidad</h3>
            </div>
            <div className='containerTextDataUser' >
                <h3 className='infoDataUser'>{detailUser[0]?.name.toUpperCase()}</h3>
                <h3 className='infoDataUser'>{detailUser[0]?.surname.toUpperCase()}</h3>
                <h3 className='infoDataUser'>{detailUser[0]?.document}</h3>
            </div>
            <div className='containerTextDataUser' >
                <h3 className='TitleDataUser '>Fecha naciemiento</h3>
                <h3 className='TitleDataUser oneTitleUser'>Edad</h3>
                <h3 className='TitleDataUser twoTitleUser'>Correo Electronico</h3>
            </div>
            <div className='containerTextDataUser' >
                <h3 className='infoDataUser'>{birthdayDate}</h3>
                <h3 className='infoDataUser oneTitleUser'>{age}</h3>
                <h3 className='infoDataUser twoTitleUser'>{detailUser[0]?.email}</h3>
            </div>
            {verific === 1?
            <div>
                <div className='containerTextDataUser' >
                    <h3 className='TitleDataUser'>Nivel Educativo</h3>
                    <h3 className='TitleDataUser'>Institucion Educativa</h3>
                    <h3 className='TitleDataUser'>Titulo</h3>
                </div>
                <div className='containerTextDataUser' >
                    <h3 className='infoDataUser'>{detailUser[0]?.professionals[0]?.nivelDeEstudio}</h3>
                    <h3 className='infoDataUser'>{detailUser[0]?.professionals[0]?.institucion}</h3>
                    <h3 className='infoDataUser'>{detailUser[0]?.professionals[0]?.titulo}</h3>
                </div>
                <div className='containerTextDataUser' >
                    <h3 className='TitleDataUser'>Fecha de Inicio</h3>
                    <h3 className='TitleDataUser'>Fecha de Finalizacion</h3>
                    <h3 className='TitleDataUser'>Tarjeta profesional</h3>
                </div>
                <div className='containerTextDataUser' >
                    <h3 className='infoDataUser'>{studyStart?studyintial:null}</h3>
                    <h3 className='infoDataUser'>{studyEnd?studyedn:null}</h3>
                    <h3 className='infoDataUser'>{detailUser[0]?.professionals[0]?.cvu}</h3>
                </div>
            </div>
            :null}
            <div className='containerTextDataUser' >
                <h3 className='TitleDataUser threeTitleUser'>Telefono</h3>
                <h3 className='TitleDataUser threeTitleUser'>Movil</h3>
                <h3 className='TitleDataUser forTitleUser'>Direccion</h3>
            </div>
            <div className='containerTextDataUser' >
                <h3 className='infoDataUser threeTitleUser'>{detailUser[0]?.phone2}</h3>
                <h3 className='infoDataUser threeTitleUser'>{detailUser[0]?.phone}</h3>
                <h3 className='infoDataUser forTitleUser'>{detailUser[0]?.address}</h3>
            </div>
            <div className='containerTextDataUser' >
                <h3 className='TitleDataUser'>Ciudad</h3>
                <h3 className='TitleDataUser'>Estado / Provincia</h3>
                <h3 className='TitleDataUser'>Pais</h3>
            </div>
            <div className='containerTextDataUser' >
                <h3 className='infoDataUser'>{detailUser[0]?.city.name}</h3>
                <h3 className='infoDataUser'>{detailUser[0]?.state.name}</h3>
                <h3 className='infoDataUser'>{detailUser[0]?.country.name}</h3>
            </div>
            <div className='containerButtonInfoById'>
                <button className='buttonOne buttonInfoById'>Actualiza o Cambia Tu Info</button>
                <button className='buttonOne buttonInfoById'>Paga Tu Menbresia</button>
            </div>
        </div>
    )
}

export default InfoById
