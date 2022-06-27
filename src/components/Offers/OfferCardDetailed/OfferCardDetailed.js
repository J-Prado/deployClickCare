import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postAuction, getUserDetail } from "../../../redux/action.js";
import "./OfferCardDetailed.css";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import jwt from "jsonwebtoken";
import { WhenInWhenOut, startTimeEndTime } from "../datefunctions.js";

export default function OfferCardDetailed(props) {
  const InitialValues = {
    id: props.match.params?.id,
    post: {},
    aplica: false,
  };
  const initialValues = {
    offer: "",
    comment: "",
  };
  const dispatch = useDispatch();
  const [state, setState] = useState(InitialValues);
  const postArray = useSelector((state) => state.post);
  // const ProfesionalDetail = jwt.decode(localStorage.getItem("session"));
  // console.log("LOG:", ProfesionalDetail);
  const [idprof, setIdProf] = useState({});
  // useEffect(() => {
  //   dispatch(getUserDetail(String(ProfesionalDetail.id)));
  // }, [dispatch]);

  useEffect(() => {
    const Prof = jwt.decode(localStorage.getItem("session"));
    // console.log("dentro de useEffect:", Prof);
    if (Prof) {
      console.log("PROF en useEfect", Prof);
      setIdProf({
        isProfessional: Prof ? Prof.professionalId : false,
        idAsUser: Prof ? Prof.id : false,
      });
      dispatch(getUserDetail(Number(Prof.id)));
    }
  }, [dispatch]);

  const detailUser = useSelector((state) => state.userDetail);
  // console.log("detailUser", detailUser);

  useEffect(() => {
    setState({
      ...state,
      post: postArray.filter((x) => Number(x.id) === Number(state.id))[0],
    });
  }, []);

  const today = new Date();
  function returnDate(fecha) {
    let dayB = new Date(fecha).getDate();
    let monthB = new Date(fecha).getMonth() + 1;
    let yearB = new Date(fecha).getFullYear();
    let TextDay = "";
    let TextMonth = "";
    if (dayB < 10) {
      TextDay = "0" + String(dayB);
    } else {
      TextDay = String(dayB);
    }
    if (monthB < 10) {
      TextMonth = "0" + String(monthB);
    } else {
      TextMonth = String(monthB);
    }
    return TextDay + "/" + TextMonth + "/" + yearB;
  }
  function returnDatesql(fecha) {
    let dayB = new Date(fecha).getDate();
    let monthB = new Date(fecha).getMonth() + 1;
    let yearB = new Date(fecha).getFullYear();
    let TextDay = "";
    let TextMonth = "";

    if (dayB < 10) {
      TextDay = "0" + String(dayB);
    } else {
      TextDay = String(dayB);
    }

    if (monthB < 10) {
      TextMonth = "0" + String(monthB);
    } else {
      TextMonth = String(monthB);
    }
    return yearB + "-" + TextMonth + "-" + TextDay;
  }

  const validationSchema = Yup.object({
    comment: Yup.string().required("Es necesario llenar este campo"),
    offer: Yup.string().required("Es necesario llenar este campo."),
  });

  const onSubmit = (values, { resetForm }) => {
    const obj = {
      date: returnDatesql(today),
      offer: String(values.offer),
      comment: values.comment,
      postId: String(state.post.id),
      // professionalId: String(ProfesionalDetail.professionalId),
      // userId: String(ProfesionalDetail.id),
      professionalId: String(idprof.isProfessional),
      userId: String(idprof.idAsUser),
    };
    resetForm();
    // console.log("OBJ:", obj);
    let status = true;
    // console.log("detailUser[0].validated_email", detailUser[0].validated_email);
    // console.log(
    //   "detailUser[0].professionals[0].balance",
    //   detailUser[0].professionals[0].balance
    // );

    if (!detailUser[0].validated_email) {
      swal({
        title: "No puede aplicar!",
        text: "Valide su email!",
      });
      status = false;
    } else if (!detailUser[0].professionals[0].balance) {
      swal({
        title: "No puede aplicar!",
        text: "Usted no es miembro!",
      });
      status = false;
    }
    if (status) {
      dispatch(postAuction(obj))
        .then((resp) => {
          if (
            resp.payload === "Existing Auction " &&
            resp.type === "POST_AUCTION_FAILED"
          ) {
            swal({
              title: "Atención!",
              text: "Usted ya ha aplicado a esa solicitud",
            });
          } else if (
            resp.payload === "Auction created" &&
            resp.type === "POST_AUCTION"
          ) {
            swal({
              title: "Felicitaciones!",
              text: "Usted aplicó correctamente a la solicitud",
            });
          } else {
            swal({
              title: "ERROR!",
              text: "Por favor intente en otro momento",
            });
          }
          // console.log("Post dispatch ", resp);
        })
        .catch((err) => {
          swal({
            title: "Error de sistema!",
            text: err.message,
          });
        });
    }
  };

  return state.post.id ? (
    <div className="OfferconteinerSelectonBlok">
      <div className="OffercontainerDetailPosts">
        <div className="dataUserIdConteiner">
          <div>
            <Link to={`/Offers`}>
              <button className="buttonOne posBottonVolver">Volver</button>
            </Link>
          </div>
          <h1 className="detalledelapublicacion">
            Detalle de la Publicación {state.id}
          </h1>
          <div className="containerTextDataUser">
            <h3 className="TitleDataUser">País</h3>
            <h3 className="TitleDataUser">Estado</h3>
            <h3 className="TitleDataUser">Ciudad</h3>
          </div>
          <div className="containerTextDataUser">
            <h3 className="infoDataUser">
              {state.post.country.name.toUpperCase()}
            </h3>
            <h3 className="infoDataUser">
              {state.post.state.name.toUpperCase()}
            </h3>
            <h3 className="infoDataUser">{state.post.city.name}</h3>
          </div>
          <div className="containerTextDataUser">
            <h3 className="TitleDataUser ">Solicitante</h3>
            <h3 className="TitleDataUser oneTitleUser">Especialidad </h3>
          </div>
          <div className="containerTextDataUser">
            <h3 className="infoDataUser">
              {idprof.isProfessional
                ? state.post.user.name
                : "--DATO RESERVADO--"}
            </h3>
            <h3 className="infoDataUser ">{state.post.specialty.specialty}</h3>
          </div>
          <div className="containerTextDataUser">
            <h3 className="TitleDataUser ">Dirección</h3>
            <h3 className="TitleDataUser ">Horario Requerido</h3>
            <h3 className="TitleDataUser ">Fechas requeridas </h3>

            {/* <h3 className="TitleDataUser ">Hora Inicial Requerida</h3> */}
            {/* <h3 className="TitleDataUser ">Hora Final Requerida</h3> */}
          </div>
          <div className="containerTextDataUser">
            <h3 className="infoDataUser">
              {idprof.isProfessional
                ? state.post.addressPatient
                : "--DATO RESERVADO--"}
            </h3>
            {/* <h3 className="infoDataUser">{state.post.availableTime_0}</h3> */}
            {/* <h3 className="infoDataUser">{state.post.availableTime_1}</h3> */}
            <h3 className="infoDataUser">
              {startTimeEndTime(
                state.post.availableTime_0,
                state.post.availableTime_1
              )}
            </h3>
            <h3 className="infoDataUser">
              {WhenInWhenOut(state.post.date_ini, state.post.date_fin)}
            </h3>
          </div>
          <div className="containerTextDataUser">
            <h3 className="TitleDataUser ">Fecha</h3>
            <h3 className="TitleDataUser ">Hora Post</h3>
            {/* <h3 className="TitleDataUser ">Fechas requeridas </h3> */}
            {/* <h3 className="TitleDataUser ">Hasta </h3> */}
          </div>
          <div className="containerTextDataUser">
            <h3 className="infoDataUser ">
              {returnDate(state.post.date_post)}
            </h3>
            <h3 className="infoDataUser">{state.post.hour_post}</h3>
            {/* <h3 className="infoDataUser">{WhenInWhenOut(state.post.date_ini,state.post.date_fin)}</h3> */}
            {/* <h3 className="infoDataUser">{returnDate(state.post.date_fin)}</h3> */}
          </div>
          <div className="containerTextDataUser">
            <h3 className="TitleDataUser ">Necesidad</h3>
          </div>
          <div className="containerTextDataUser">
            <h3 className="infoDataUser long_postDetail">{state.post.needs}</h3>
          </div>
          <div className="containerTextDataUser">
            <h3 className="TitleDataUser ">Nombre del Paciente:</h3>
            <h3 className="TitleDataUser ">Edad del Paciente </h3>
          </div>
          <div className="containerTextDataUser">
            <h3 className="infoDataUser">
              {idprof.isProfessional
                ? state.post.namePatient
                : "--DATO RESERVADO--"}
            </h3>
            <h3 className="infoDataUser">{state.post.agePatient}</h3>
            {idprof.isProfessional ? (
              <button
                className="buttonOne aplicar"
                onClick={() =>
                  state.aplica
                    ? setState({ ...state, aplica: false })
                    : setState({ ...state, aplica: true })
                }
              >
                APLICAR
              </button>
            ) : null}
          </div>
        </div>
        {state.aplica ? (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props) => {
              const { values, setFieldValue } = props;
              return (
                <Form>
                  <div className="commentAuction">
                    <label className="sign-label">Comentario*:</label>
                    <Field
                      className="sign-inputs"
                      id="comment"
                      name="comment"
                      type="text"
                      multiline={true}
                      placeholder="comment"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="comment"
                    />
                  </div>
                  <div className="propousalAuction">
                    <label className="sign-label">Propuesta*:</label>
                    <Field
                      className="sign-inputs"
                      id="offer"
                      name="offer"
                      type="number"
                      placeholder="Precio por el total solicitado"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="offer"
                    />
                  </div>

                  <div className="sign-button">
                    <button
                      className="buttonOne principalButton"
                      type="submit"
                      onSubmit={onSubmit}
                    >
                      Aplique su propuesta
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        ) : null}
      </div>
    </div>
  ) : null;
}
