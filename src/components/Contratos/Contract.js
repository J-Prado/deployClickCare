import React from "react";
import "./contract.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContracts } from "../../redux/action";
import { useAuth0 } from "@auth0/auth0-react";
import Contratos from "./Contratos.js";

export default function Contract() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContracts());
  }, [dispatch]);

  const contratos = useSelector((state) => state.contracts);
  const contratosFilterActivo = contratos.filter((e) => e.status === "activo");
  const contratosFilterTerminado = contratos.filter(
    (e) => e.status === "terminado"
  );

  console.log(contratos);
  return (
    <div className="contractContainerGral">
      <div className="contratosActivos">
        <h1 className="contratosTitulos"> Contratos activos</h1>
        {contratosFilterActivo.map((e) => (
          <Contratos
            key={e.id}
            id={e.id}
            price={e.price}
            auctionComment={e.auction.comment}
            date={e.date}
            hour={e.hour}
            date_post={e.auction.post.date_post}
            date_ini={e.auction.post.date_ini}
            date_fin={e.auction.post.date_fin}
            needs={e.auction.post.needs}
            namePatient={e.auction.post.namePatient}
            userPost={e.auction.post.user.name}
            userPostSurname={e.auction.post.user.surname}
            userPostemail={e.auction.post.user.email}
            userPostphoto={e.auction.post.user.photo}
            userPhone={e.auction.post.contact_phone}
            cityPost={e.auction.post.city.name}
            profesionalName={e.auction.professional.user.name}
            profesionalSurname={e.auction.professional.user.surname}
            profesionalPhone={e.auction.professional.user.phone}
            profesionalemail={e.auction.professional.user.email}
            profesionalPhoto={e.auction.professional.user.photo}
          />
        ))}
      </div>

      <div className="contratosFinalizados">
        <h1 className="contratosTitulos"> Contratos Finalizados</h1>
        {contratosFilterTerminado.map((e) => (
          <Contratos
            key={e.id}
            id={e.id}
            price={e.price}
            auctionComment={e.auction.comment}
            date={e.date}
            hour={e.hour}
            date_post={e.auction.post.date_post}
            date_ini={e.auction.post.date_ini}
            date_fin={e.auction.post.date_fin}
            needs={e.auction.post.needs}
            namePatient={e.auction.post.namePatient}
            userPost={e.auction.post.user.name}
            userPostSurname={e.auction.post.user.surname}
            userPostemail={e.auction.post.user.email}
            userPostphoto={e.auction.post.user.photo}
            userPhone={e.auction.post.contact_phone}
            cityPost={e.auction.post.city.name}
            profesionalName={e.auction.professional.user.name}
            profesionalSurname={e.auction.professional.user.surname}
            profesionalPhone={e.auction.professional.user.phone}
            profesionalemail={e.auction.professional.user.email}
            profesionalPhoto={e.auction.professional.user.photo}
          />
        ))}
      </div>
    </div>
  );
}
