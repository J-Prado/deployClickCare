import { React, useEffect } from "react";
import "./mercadopago.css";
import { useDispatch, useSelector } from "react-redux";
import * as df from "../../../Offers/datefunctions.js";
import { getUserDetail, mercadoPagoPayment } from "../../../../redux/action.js";
import swal from "sweetalert";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";

export default function Mercadopago() {
  const id = jwt.decode(localStorage.getItem("session"))?.id;
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userDetail);

  // SE SUPONE QUE SI ESTA ACA ES PROFESIONAL. ***************************************************************************
  let fechaPago;
  if (userData[0]?.professionals[0]) {
    fechaPago = String(userData[0]?.professionals[0].fecha_nacimiento)
      ? String(userData[0]?.professionals[0].fecha_nacimiento).substring(0, 10)
      : null;
  }

  console.log("FECHA PAGO!", fechaPago);
  // Fecha de Pago para poder sumar un mes = fecha limite.

  let limitDate;
  let daysBetween;
  if (fechaPago) {
    let obj = {
      year: fechaPago.substring(0, 4),
      month: fechaPago.substring(5, 7),
      day: fechaPago.substring(8, 10),
    };
    const fechaPagoyyyyMMdd = df.dateToStringyyyyMMdd(
      obj.day,
      obj.month,
      obj.year
    );

    //Calculo fecha limite
    limitDate = df.addOneMonthToGivenyyyyMMdd(fechaPagoyyyyMMdd);
    console.log("FECHA VENCIMIENTO!", limitDate);
    let currentDate = df.giveMeCurrentDateAsOBJECT();
    const currentDateyyyyMMdd = df.dateToStringyyyyMMdd(
      currentDate.day,
      currentDate.month,
      currentDate.year
    );
    console.log("FECHA ACTUAL!", currentDateyyyyMMdd);
    daysBetween = df.daysBetweenTwoStringDates(currentDateyyyyMMdd, limitDate);
    console.log("Dias vencidos!", daysBetween);
  }
  useEffect(() => {
    const Prof = jwt.decode(localStorage.getItem("session"));
    if (Prof) {
      dispatch(getUserDetail(String(Prof.id)));
    }
  }, [dispatch]);

  // //Alerts to know if successful post
  // const onClick = () => {
  //   if (Object.keys(postInfo).length !== 0) {
  //     swal({
  //       title: postInfo,
  //       text: "Continue usando ClickCare.",
  //     });
  //   }
  // };
  // onClick();

  function executePayment(e) {
    const obj = {
      professionalId: Number(userData[0].professionals[0].id),
    };
    let redirectTo = "";
    dispatch(mercadoPagoPayment(obj)).then((resp) => {
      if (
        resp.payload.redirectTo === "Existing Auction " &&
        resp.type === "MERCADOPAGO_PAYMENT"
      )
        console.log(resp);
      redirectTo = resp.payload.redirectTo;
      // window.location = resp.payload.redirectTo;
      swal({
        title: "Confirmaci??n de Pago",
        text: "Usted ser?? redirigida/o a MercadoPago!",
        buttons: {
          cancel: true,
          confirm: true,
        },
      }).then((resp) => {
        // console.log("SWAL", resp);
        if (resp) {
          console.log("yendo a MERCADOPAGO");
          window.location = redirectTo;
        } else {
          console.log("CANCELADO");
        }
      });
    });
  }
  // daysBetween = null;
  return (
    <div className="containerPostForm">
      <div className="PostForm">
        <div className="contenPostForm">
          <h1 className="titleDescription">Membres??a ClickCare</h1>
          <h2 className="titleDescription">
            Sea miembro de nuestra reconocida red de profesionales
          </h2>
          <br></br>
          <h3 className="titleDescription">Membres??a Mensual</h3>
          <br></br>
          <h4 className="titleDescription">Ventajas de ser miembro</h4>
          <ol>
            <li>
              Aumentar visibilidad: Las redes sociales permiten llegar a una
              mayor cantidad de usuarios en un per??odo corto de tiempo. Tal que
              as?? es una manera m??s r??pida de llegar a tu contenido y productos.
            </li>
            <li>
              Facilitar la comunicaci??n: Al mostrar una imagen m??s cercana
              frente a nuestros Pacientes, podemos interactuar con ellos. Con
              esto, aumentaremos la fidelidad y confianza.
            </li>
            <li>
              Analizar la situaci??n del mercado: Otra ventaja de analizar la
              situaci??n del mercado es ver las demandas de nuestro p??blico y
              analizar nuestra mejor opci??n profesional.
            </li>
            <li>
              Oportunidad de trabajo: Sin dudas, ClickCare acerca las
              oportunidades de obtener ingresos.
            </li>
            <li>
              Demostrar la calidad de su servicio: En nuestra red Usted ser??
              capaz de demostrar su calidad de trabajo.
            </li>
          </ol>
          <br></br>
          {!daysBetween ? (
            <div>
              <h2 className="titleDescription">
                Abone su membres??a mediante MercadoPago.
              </h2>
              <h3 className="titleDescription">
                Presione el siguiente bot??n y comience de inmediato!
              </h3>
              <button
                className="buttonOne principalButton"
                type="submit"
                onClick={executePayment}
              >
                Quiero abonar mi membres??a mensual
              </button>
              <div>
                <Link to={`/user/${id}`}>
                  <button className="buttonOne volverMercado">Volver</button>
                </Link>
              </div>
            </div>
          ) : null}
          {daysBetween < 0 ? (
            <div>
              <h2 className="titleDescription">
                {`Su membres??a ha vencido hace ${-Number(daysBetween)} d??as`}
              </h2>
              <h3 className="titleDescription">Renueve su membres??a!</h3>
              <button
                className="buttonOne principalButton"
                type="submit"
                onClick={executePayment}
              >
                Quiero abonar mi membres??a mensual
              </button>
            </div>
          ) : null}
          {daysBetween > 0 ? (
            <div>
              <h2 className="titleDescription">
                {`Su membres??a a??n tiene ${Number(
                  daysBetween
                )} d??as de vigencia`}
              </h2>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
