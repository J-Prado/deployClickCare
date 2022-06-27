import React from "react";
import "./ProfRegiById.css";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import * as Yup from "yup";
import { profRegister } from "../../../../redux/action.js";

function ProfRegiById({ idUsr }) {
  //Input values
  const initialValues = {
    id_user: idUsr,
    // tuition: "",
    trainings: "",
    // photo: "",
    cvu: "",
    nivelDeEstudio: "",
    institucion: "",
    titulo: "",
    date_inicioEstudio: "",
    date_finicioEstudio: "",
  };
  //console.log(idUs)

  //Hooks for Redux
  const dispatch = useDispatch();
  const register = useSelector((state) => state.profRegister);

  //Validation using Yup
  const validationSchema = Yup.object({
    // tuition: Yup.string()
    //   .required("Es necesario llenar este campo")
    // .trim("Elimine los espacios en blanco"),
    trainings: Yup.string()
      .required("Es necesario llenar este campo")
      .trim("Elimine los espacios en blanco"),
    // photo: Yup.string()
    //   .required("Es necesario llenar este campo")
    //   .trim("Elimine los espacios en blanco"),
    cvu: Yup.string()
      .required("Es necesario llenar este campo")
      .trim("Elimine los espacios en blanco"),
    nivelDeEstudio: Yup.string()
      .required("Es necesario llenar este campo")
      .trim("Elimine los espacios en blanco"),
    titulo: Yup.string()
      .required("Es necesario llenar este campo")
      .trim("Elimine los espacios en blanco"),
    institucion: Yup.string()
      .required("Es necesario llenar este campo")
      .trim("Elimine los espacios en blanco"),
    date_inicioEstudio: Yup.string().required("Es necesario llenar este campo"),
    date_finicioEstudio: Yup.string().required(
      "Es necesario llenar este campo"
    ),
  });

  //Handlers
  const onSubmit = (values, { resetForm }) => {
    dispatch(profRegister(values));
    console.log(values);
    resetForm();
  };

  const onClick = () => {
    if (register?.message === "Professional created") {
      swal({
        title: register?.message,
        text: "Usted se ha registrado como profesional",
      });
    } else if (register.errors) {
      register.errors.map((e) =>
        swal({
          title: e.photo,
          text: "Intente nuevamente",
        })
      );
    }
    // alert("Felicidades se Completó el Registro.");
    // alert("Se envió la confirmación a su email.");
  };
  onClick();

  return (
    <div className="formRegConteiner ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => {
          return (
            <Form>
              <div className="containerProfRegiById">
                <div className="containerTitleProfRegiById">
                  <h2 className="nameUserById">
                    Registra Tus Datos{" "}
                    <label className="nameUserById nameUserByIdSecond">
                      Profesionales
                    </label>
                  </h2>
                </div>
                <div className="containerSubProfRegiById">
                  <div className="containerProfRegiByIdLeft">
                    <label className="titleProfRegiById">Titulo *</label>
                    <Field
                      className="inputsProfRegiById"
                      id="tuition"
                      name="tuition"
                      type="text"
                    />
                    {/* <button className="principalButton">Añadir Capacitación</button>
                            <ul>
                                <li>a</li>
                                <li>a</li>
                            </ul> */}
                    <ErrorMessage
                      render={(msg) => <div className="error-prof">{msg}</div>}
                      name="tuition"
                    />

                    <label className="titleProfRegiById">
                      Nivel Educativo *
                    </label>
                    <Field
                      className="inputsProfRegiById"
                      id="nivelDeEstudio"
                      name="nivelDeEstudio"
                      type="text"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error-prof">{msg}</div>}
                      name="nivelDeEstudio"
                    />
                    <label className="titleProfRegiById">Capacitación *</label>
                    <Field
                      className="inputsProfRegiById"
                      id="trainings"
                      name="trainings"
                      type="text"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error-prof">{msg}</div>}
                      name="trainings"
                    />

                    <label className="titleProfRegiById">
                      Institucion Educativa *
                    </label>
                    <Field
                      className="inputsProfRegiById"
                      id="institucion"
                      name="institucion"
                      type="text"
                    />
                    <ErrorMessage
                      className="errRegProf"
                      render={(msg) => <div className="error-prof">{msg}</div>}
                      name="institucion"
                    />
                  </div>
                  <div className="containerProfRegiByIdRight">
                    <label className="titleProfRegiById">
                      Fecha de Inicio *
                    </label>
                    <Field
                      className="inputsProfRegiById"
                      id="date_inicioEstudio"
                      name="date_inicioEstudio"
                      type="date"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error-prof">{msg}</div>}
                      name="date_inicioEstudio"
                    />

                    <label className="titleProfRegiById">
                      Fecha de Finalizacion *
                    </label>
                    <Field
                      className="inputsProfRegiById"
                      id="date_finicioEstudio"
                      name="date_finicioEstudio"
                      type="date"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error-prof">{msg}</div>}
                      name="date_finicioEstudio"
                    />

                    <label className="titleProfRegiById">
                      Tarjeta Profesional *
                    </label>
                    <Field
                      className="inputsProfRegiById"
                      id="cvu"
                      name="cvu"
                      type="text"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error-prof">{msg}</div>}
                      name="cvu"
                    />
                  </div>
                </div>
                <div className="containerTitleProfRegiById">
                  <button className="buttonOne" type="submit">
                    Registra Datos Profesionales
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ProfRegiById;
