import React from "react";
import "./CardAuctions.css";
import * as df from "../../../../../Offers/datefunctions.js";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { userAcceptAuctionfromProf } from "../../../../../../redux/action";

//src\components\Offers\datefunctions.js

const CardAuctions = ({
  id,
  id_post,
  date,
  offer,
  comment,
  name,
  surname,
  approved,
}) => {
  // console.log(id, id_post, offer, comment);
  console.log("approved en CARD", approved);
  const dispatch = useDispatch();

  //date now
  //hour now
  // id_auction = 32
  // id_post
  // offer = 800
  //

  const startDate = (date) =>
    ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"][new Date(date).getDay()];
  let dayNumIn = new Date(date).getDate();
  const textMonthin = (date) =>
    [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ][new Date(date).getMonth()];
  let startDateCard =
    startDate(date) +
    " -" +
    dayNumIn +
    " " +
    textMonthin(date) +
    " " +
    new Date(date).getFullYear();

  function aceptAuction() {
    const obj = {
      date: df.giveMeCurrentDate(true),
      hour: df.giveMeCurrentHour(),
      auctionId: id,
      postId: id_post,
      offer: offer,
      // comment: comment,
    };

    swal({
      title: "ACEPTACIÓN DE APLICACIÓN",
      text: `¿Desea aceptar la propuesta del Profesional ${name} ${surname}?`,
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then((resp) => {
      // console.log("SWAL", resp);
      if (resp) {
        dispatch(userAcceptAuctionfromProf(obj)).then((resp) => {
          console.log(resp);
          if (resp.data === "Contract created") {
            swal({
              title: "ACEPTACIÓN DE APLICACIÓN",
              text: `Genial! Usted ha Creado un Contrato con ${name} ${surname}`,
            });
          } else {
            swal({
              title: "ACEPTACIÓN DE APLICACIÓN",
              text: `Hubo un problema creando un Contrato con ${name} ${surname}. Vuelva a intentar.`,
            });
          }
        });
      }
    });
  }

  return (
    <div className="containerCardAuctions">
      <div className="containerCardAuctionsleft">
        <div>
          <h3 className="dayCardPostByUser comenctActuinCardOne">
            Fecha de Aplicacion:
            <span className="dateCardPostByUser comenctActuinCardOne">
              {" "}
              {startDateCard}
            </span>
          </h3>
          <h3 className="dateCardPostByUser comenctActuinCard">Comentario:</h3>
          <span className="dayCardPostByUser comenctActuinCard">
            {" "}
            {comment}
          </span>
          <h3 className="dateCardPostByUser comenctActuinCard">
            Tarifa:{" "}
            <span className="dayCardPostByUser comenctActuinCard">
              $ {offer}
            </span>
          </h3>
        </div>
      </div>
      <div className="containerCardAuctionsRight">
        <h3 className="dateCardPostByUser comenctActuinCard">Nombre:</h3>
        <span className="dayCardPostByUser comenctActuinCard">
          {" "}
          {name + " " + surname}
        </span>
        {approved === 0 ? (
          <>
            <button className="buttonOne cardAucButton" onClick={aceptAuction}>
              Aceptar Propuesta
            </button>
          </>
        ) : (
          <h2>Ya ha aprobado una Oferta!</h2>
        )}
      </div>
    </div>
  );
};

export default CardAuctions;
