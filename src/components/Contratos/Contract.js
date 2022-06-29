import React from 'react'
import "./contract.css"
import {useState,useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { getContracts, isProfessional } from "../../redux/action";
import { useAuth0 } from "@auth0/auth0-react";
import Contratos from './Contratos';
import jwt from "jsonwebtoken";
import Paginado from './Paginado';

export default function Contract() {

const dispatch = useDispatch()
useEffect(()=>{
    dispatch(getContracts());
},[dispatch])
const user = jwt.decode(localStorage?.getItem("session"));
const id = user?.id;
console.log(id)
const contratos = useSelector((state) => state.contracts);
const isProf = useSelector((state) => state.isProfessional);

const contratosFiltrados = contratos.filter(e => e.auction.post.user.id === id)
const contratosFilterActivo = contratosFiltrados.filter(e => e.status ==="activo" )
const contratosFilterTerminado = contratosFiltrados.filter(e => e.status ==="terminado" )

const contratosFiltradosProf = contratos.filter(e => e.auction.professional.user.id === id)
const contratosFilterActivoProf = contratosFiltradosProf.filter(e => e.status ==="activo" )
const contratosFilterTerminadoProf = contratosFiltradosProf.filter(e => e.status ==="terminado" )
useEffect(()=>{
  dispatch(isProfessional(id));
},[dispatch])

console.log(isProf)
const [currentPage, setCurrentPage] = useState(1)
const [ContractPage, setContractPage]= useState(1)
const indexLastContract = currentPage * ContractPage
const indexFirstContract= indexLastContract - ContractPage
const currentContractActive= (isProf?contratosFilterActivoProf:contratosFilterActivo ).slice(indexFirstContract,indexLastContract)


const [currentPage2, setCurrentPage2] = useState(1)
const [ContractPage2, setContractPage2]= useState(1)
const indexLastContract2 = currentPage2 * ContractPage2
const indexFirstContract2= indexLastContract2 - ContractPage2
const currentContractFinish2 = (isProf?contratosFilterTerminado :contratosFilterTerminadoProf ).slice(indexFirstContract2,indexLastContract2)
console.log("filter terminado",currentPage2 )

const paginado = (pageNumber) => {
  setCurrentPage(pageNumber);
};

const paginado2 = (pageNumber2) => {
  setCurrentPage2(pageNumber2);
};

function handlepage(e,number2){
  e.preventDefault();
  setCurrentPage2(currentPage2 + number2)
 }


  return (
    <div className='contractContainerGral'>
        <div className='contratosActivos'>
         
        <h1 className='contratosTitulos'> Contratos activos</h1> 
        <div className='paginadoContainer'>
        <Paginado
             ContractPage={ContractPage}
             totalContracts={isProf?contratosFilterActivoProf.length:contratosFilterActivo.length}
             paginado={paginado}
             currentPage={currentPage}/>
        </div>
        {
        currentContractActive.map((e) =>( <Contratos
        key={e.id}
        id={e.id}
        price={e.price}
        auctionComment={e.auction.comment}
        date= {e.date}
        hour={e.hour}
        date_post= {e.auction.post.date_post}
        date_ini= {e.auction.post.date_ini}
        date_fin= {e.auction.post.date_fin}
        needs= {e.auction.post.needs}
        namePatient = {e.auction.post.namePatient}
        userPost= {e.auction.post.user.name}
        userPostSurname= {e.auction.post.user.surname}
        userPostemail={e.auction.post.user.email}
        userPostphoto= {e.auction.post.user.photo}
        userPhone={e.auction.post.contact_phone}
        cityPost = {e.auction.post.city.name}
        profesionalName = {e.auction.professional.user.name}
        profesionalSurname = {e.auction.professional.user.surname}
        profesionalPhone = {e.auction.professional.user.phone}
        profesionalemail={e.auction.professional.user.email}
        profesionalPhoto= {e.auction.professional.user.photo}
        />
       ))}
        </div> 

        <div className='contratosFinalizados'>
        <h1 className='contratosTitulos'> Contratos Finalizados</h1> 
        <Paginado
             ContractPage={ContractPage2}
             totalContracts={isProf?contratosFilterTerminado.length :contratosFilterTerminadoProf.length}
             paginado={paginado2}
             currentPage={currentPage2}/>
        {
        currentContractFinish2.map((e) =>( <Contratos
        key={e.id}
        id={e.id}
        price={e.price}
        auctionComment={e.auction.comment}
        date= {e.date}
        hour={e.hour}
        date_post= {e.auction.post.date_post}
        date_ini= {e.auction.post.date_ini}
        date_fin= {e.auction.post.date_fin}
        needs= {e.auction.post.needs}
        namePatient = {e.auction.post.namePatient}
        userPost= {e.auction.post.user.name}
        userPostSurname= {e.auction.post.user.surname}
        userPostemail={e.auction.post.user.email}
        userPostphoto= {e.auction.post.user.photo}
        userPhone={e.auction.post.contact_phone}
        cityPost = {e.auction.post.city.name}
        profesionalName = {e.auction.professional.user.name}
        profesionalSurname = {e.auction.professional.user.surname}
        profesionalPhone = {e.auction.professional.user.phone}
        profesionalemail={e.auction.professional.user.email}
        profesionalPhoto= {e.auction.professional.user.photo}
        />
      ))}
        </div>    
    </div>
  )
}
