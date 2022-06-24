import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPostDetail, getUserDetail } from '../../redux/action.js';
import imgProfile from "./imgprofile/imgProfile.png"
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
//import Verificadoimg from "./imgprofile/Verificadoimg.png"
import "./Profile.css"
import CardUseData from './CardUseData/CardUseData.js';
import CardPostUser from './CardPostUser/CardPostUser.js';
import CardRegProf from './CardRegProf/CardRegProf.js';





export default function Profile(props) {

    const dispatch = useDispatch();
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getUserDetail(id))
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getUserPostDetail(id))
    }, [dispatch, id]);

    const detailPostUser = useSelector(state => state.userPostDetail);
    const detailUser = useSelector(state => state.userDetail);
    
    const [userOptionState, setuserOptionState] = useState(1);
    
    const toggleTab = (index) => {
      setuserOptionState(index);
    };
    
    const idValidate =  detailUser[0]?.professionals[0]?.id
    
    let verific = 0
    if (idValidate !== undefined){
      verific =+ 1
    }
    
    
  return (
    <div className='containerProfile' key={id}>
      <div className='ProfileId'>
        <div className='ProfileIdLeft'>
          <img className='imgProfile' src={imgProfile} alt="imgProfile"/><br/>
          <h2 className='textUserId'> {detailUser[0]?.name.toUpperCase()} {detailUser[0]?.surname.toUpperCase()}  </h2>
          {/* {(detailUser[0].active===1)? "ok" : "no"} */}
          {verific === 1 ? <p className='textUserId titleUserProf'>{detailUser[0]?.professionals[0]?.tuition}</p>:null}
          <h3 className='textUserId cityUser'>{detailUser[0]?.city.name}</h3>
          <p className='subTextUser'>{detailUser[0]?.country.name}</p>
          <p className='subTextUser'>{detailUser[0]?.email}</p>
          <i className='iconoScore'><AiTwotoneStar/><AiTwotoneStar/><AiTwotoneStar/><AiTwotoneStar/><AiOutlineStar/></i>
        </div>
        <div className='ProfileIdCenter'>
          <div className='barraMenuUser'>
            <button  id="userbutton" className={userOptionState===1?"tabs set-tabs": "tabs"} onClick={() => toggleTab(1)}>Informacion</button>
            <button id="userbutton" className={userOptionState === 3 ? "tabs set-tabs" : "tabs"} onClick={() => toggleTab(3)}>Publicaciones</button>
            {verific === 0?
            <button id="userbutton" className={userOptionState === 2 ? "tabs set-tabs" : "tabs"} onClick={() => toggleTab(2)}>Registrate como Profesional</button>
            :<button id="userbutton" className={userOptionState === 4 ? "tabs set-tabs" : "tabs"} onClick={() => toggleTab(4)}>Postulaciones</button>}
            {verific === 0? <button id='userbuttonRegister'>Realiza un Post</button>:<button id='userbuttonRegister'>Busca una Ofertas</button> }
          
          </div>
          <div className='containerDataUser'>
            <div className={userOptionState === 1 ? "content  active-content" : "content"}>
               {detailUser.map(e => <CardUseData
               key={e.id}
               name={e.name}
               lastName={e.surname} 
               document={e.document}
               birthday={e.age}
               email={e.email}
               city={e.city.name}
               state={e.state.name}
               country={e.country.name}
               phone={e.phone}
               phone2={e.phone2}
               address={e.address}
               
               idProf={e.professionals[0]?.id}
               title={e.professionals[0]?.titulo}
               speciality={e.professionals[0]?.nivelDeEstudio}
               institution={e.professionals[0]?.institucion}
               studyStart={e.professionals[0]?.date_inicioEstudio}
               studyEnd={e.professionals[0]?.date_finicioEstudio}
               cvu={e.professionals[0]?.cvu}
               />)}
            </div>
            <div className={userOptionState === 2 ? "content  active-content" : "content"}>
              {detailUser.map(s =><CardRegProf
                key={s.id}
                idUs={s.id}
              />)}
            </div>
            <div className={userOptionState === 3 ? "content  active-content" : "content"}>
              <CardPostUser/>
            </div>
            <div className={userOptionState === 4 ? "content  active-content" : "content"}>
              Postulaciones historial
            </div>
          </div>
        </div>
        <div className='ProfileIdRight'>
          
          
          
        </div>
      </div>
    </div>
  )
}
