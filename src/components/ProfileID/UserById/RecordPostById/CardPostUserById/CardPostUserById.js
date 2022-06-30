import React, { useState } from "react";
import "./CardPostUserById.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gePostDetailAuctions } from "../../../../../redux/action.js";
import CardAuctions from "./CardAuctions/CardAuctions";
import { cancelPost } from "../../../../../redux/action.js";
import swal from "sweetalert";

function CardPostUserById({
  id,
  datPost,
  whenIn,
  whenOut,
  needs,
  startTime,
  endTime,
  agePatient,
  namePatient,
  locationReference,
  contact_phone,
  addressPatient,
  specialty,
  city,
  state,
  country,
}) {
  const dispatch = useDispatch();
  console.log("ID CARTA", id);

  useEffect(() => {
    dispatch(gePostDetailAuctions(id));
  }, [dispatch, id]);

  //   const [auctState, setauctState] = useState("");
  //   const [existApproved, setexistApproved] = useState(0);
  const detailPostUser = useSelector((state) => state.postDetailAuctions);
  console.log("detailPostUser", detailPostUser);
  const auctions = detailPostUser.map((e) => e.auctions);
  console.log("auctions", auctions);
  const aprobados = auctions[0]?.filter((x) => x.approved === true).length;
  console.log("aprobados", aprobados);
  //   useEffect(() => {
  // auctions[0].filter((x) => x.approved === true);
  //   }, []);

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

//   function eliminarPost() {
//     console.log("id???", id);
//     swal({
//       title: "ELIMINAR POST",
//       text: `¿Desea eliminar su post?`,
//       buttons: {
//         cancel: true,
//         confirm: true,
//       },
//     }).then((resp) => {
//       // console.log("SWAL", resp);
//       if (resp) {
//         dispatch(cancelPost(Number(id))).then((resp) => {
//           console.log(resp);
//           if (resp.payload === "Post cancel") {
//             swal({
//               title: "ELIMINAR POST",
//               text: "Eliminación satisfactoria",
//             });

//           } else {
//             swal({
//               title: "ELIMINAR POST",
//               text: "Hubo un problema en la eliminación",
//             });
//           }
//         });
//       }
//     });
//   }

  return (
    <div className="containerCardPostUserById">
      <div className="containerCardPostUserByIdOne">
        <div className="containerCardPostUserByIdLeftOne">
          <div className="containerCardPostUserByIdLeft">
            <h3 className="subTitleCardPostUserByIdr">Datos del Paciente</h3>
            <h3 className="textCardPostUserById ">Nombre: </h3>
            <h2 className="titleOneCardPostUserById">{namePatient}</h2>
            <h3 className="textCardPostUserById ">Edad: </h3>
            <h3 className="titleOneCardPostUserById">{agePatient}</h3>
            <h3 className="textCardPostUserById ">Telefono: </h3>
            <h3 className="titleOneCardPostUserById">{contact_phone}</h3>
          </div>
          {/* <div>
            <button
              className="buttonOne buttonOneCardPostUserById"
              onClick={eliminarPost}
            >
              Eliminar Post
            </button>
          </div> */}
        </div>
        <div className="containerCardPostUserByIdRight">
          <div className="dateContCardPostUserById">
            <h3 className="dateCardPostByUser">
              Publicado:<span className="dayCardPostByUser"> {postedAgo}</span>
            </h3>
          </div>
          <div className="containerSubCardPostUserByIdRight">
            <p className="needCardPostUserById">
              {}
              <span>{needs}...</span>
            </p>
          </div>
          <div className="CardPostUserByIdRightOne">
            <div className="containerSubDataByUser">
              <h3 className="dateCardPostByUser ">Especialidad: </h3>
              <h3 className="dayCardPostByUser"> {specialty}</h3>
            </div>
          </div>
          <div className="CardPostUserByIdRightOne">
            <div className="containerSubDataByUser">
              <h3 className="dateCardPostByUser">Cuando: </h3>
              <h3 className="dayCardPostByUser">{dateService}</h3>
            </div>
            <div className="containerSubDataByUser">
              <h3 className="dateCardPostByUser">Hora:</h3>
              <h3 className="dayCardPostByUser">{hourService}</h3>
            </div>
          </div>
          <div className="CardPostUserByIdRightOne">
            <div className="containerSubDataByUser">
              <h3 className="dateCardPostByUser ">Direccion:</h3>
              <h3 className="dayCardPostByUser">{addressPatient}</h3>
            </div>
            <div className="containerSubDataByUser">
              <h3 className="dateCardPostByUser">Referecia: </h3>
              <h3 className="dayCardPostByUser">{locationReference}</h3>
            </div>
          </div>
          <div className="CardPostUserByIdRightOne CardPostUserByIdRightTwo">
            <div className="containerSubDataByUser">
              <h3 className="dateCardPostByUser ">Ciudad: </h3>
              <h3 className="dayCardPostByUser dateCardPostByUsertwo">
                {city}
              </h3>
            </div>
            <div className="containerSubDataByUser">
              <h3 className="dateCardPostByUser ">Estado / Provincia: </h3>
              <h3 className="dayCardPostByUser dateCardPostByUsertwo">
                {state}
              </h3>
            </div>
            <div className="containerSubDataByUser">
              <h3 className="dateCardPostByUser ">Pais: </h3>
              <h3 className="dayCardPostByUser dateCardPostByUsertwo">
                {country}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="containerCardPostUserByIdBotton">
        {/* {auctNotApproved?.map((d) => ( */}
        {/* {auctions[0]?.map((d) => ( */}
        {auctions[0]?.map((d) => (
          <CardAuctions
            id_post={id}
            key={d.id}
            id={d.id}
            date={d.date}
            offer={d.offer}
            comment={d.comment}
            name={d.professional.user.name}
            surname={d.professional.user.surname}
            approved={aprobados}
          />
        ))}
      </div>
    </div>
  );
}

export default CardPostUserById;
