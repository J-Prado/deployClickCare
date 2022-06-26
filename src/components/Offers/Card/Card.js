import React from "react";
import "./Card.css";
import imguser1 from "../../Landingpage/Post/imgPost/imguser1.jpg";
import { GoCalendar } from "react-icons/go";
import { Link } from "react-router-dom";

const Card = ({
  id,
  datPost,
  hourPost,
  whenIn,
  whenOut,
  startTime,
  endTime,
  city,
  state,
  needs,
  specialty,
  name,
}) => {
  //Fecha Posteo
  //let datePos = datPost +" "+ hourPost
  let dateOne = new Date(datPost);
  let dateNow = new Date();
  let difference = Math.abs(dateNow - dateOne);
  let postedAgo = difference / (1000 * 3600 * 24);
  if (postedAgo >= 2.5) {
    postedAgo = "hace " + Math.round(postedAgo) + " dias";
  } else if (postedAgo > 1.5) {
    postedAgo = "hace " + Math.floor(postedAgo) + " dia";
  } else {
    postedAgo = "Hoy";
  }
  //Cuando Dia
  const startDate = (whenIn) =>
    ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"][
      new Date(whenIn).getDay()
    ];
  let dayNumIn = new Date(whenIn).getDate();
  const textMonthin = (whenIn) =>
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
    ][new Date(whenIn).getMonth()];
  let startDateCard =
    startDate(whenIn) + " " + dayNumIn + "-" + textMonthin(whenIn);

  const endDate = (whenOut) =>
    ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"][
      new Date(whenOut).getDay()
    ];
  let dayNumOut = new Date(whenOut).getDate();
  const textMonthout = (whenOut) =>
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
    ][new Date(whenOut).getMonth()];
  let endDateCard =
    endDate(whenOut) + " " + dayNumOut + "-" + textMonthout(whenOut);

  let dateService = "";
  if (startDateCard === endDateCard) {
    dateService += startDateCard;
  } else {
    dateService += startDateCard + " - " + endDateCard;
  }
  //Cuando Hora
  let startHour = startTime + ":00";
  let endHour = endTime + ":00";
  let hourService = "";
  if (startHour === endHour) {
    hourService += startHour;
  } else {
    hourService += startHour + " - " + endHour;
  }

  //Parrafo
  // let parrafo = needs;
  // let descrpcion = parrafo.slice(0, parrafo.length * 0.2);

  return (
    <div className="cardContainer">
      <div className="cardContainerRight">
        <div className="containerDataRight">
          <h3 className="dateCard">
            Publicado:<span className="dayCard"> {postedAgo}</span>
          </h3>
          <h1 className="nameCard">{name}</h1>
          <p className="despcriptioCard">
            {}
            <span>{needs}...</span>
          </p>
          <h2 className="dateCard serviceOffer">
            Servicio:
            <br />
            <span className="dayCard">{specialty}</span>
          </h2>
          <Link to={`/OfferCardDetailed/${id}`}>
            {/* {idprof.id ? ( */}
            <button className="buttonOne posBotton">Aplicar</button>
            {/* ) : null} */}
          </Link>
          <div className="containerDataBotton">
            <i className="calenderIcon">
              <GoCalendar />
            </i>
            <h2 className="dateCard whenOffer">
              Cuando: <span className="dayCard"> {dateService}</span> Hora:{" "}
              <span className="dayCard">{hourService} </span>
            </h2>
          </div>
        </div>
        <div className="containerDataLeft">
          <div className="containerCity">
            <h3 className="municipioText ">{state}</h3>
            <h2 className="capitalText">{city}</h2>
          </div>
        </div>
      </div>
      <div className="cardContainerLeft">
        <img className="imguserOffers" src={imguser1} alt="" />
      </div>
    </div>
  );
};

export default Card;
