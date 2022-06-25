import React from "react";
import "./CardRegProf.css";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import * as Yup from "yup";
import { profRegister } from "../../../redux/action";

const CardRegProf = ({ idUs }) => {
  //Input values
  const initialValues = {
    id_user: idUs,
    tuition: "",
    trainings: "",
    // photo: "",
    cvu: "",
    nivelDeEstudio: "",
    institucion: "",
    // titulo: "",
    date_inicioEstudio: "",
    date_finicioEstudio: "",
  };
  //console.log(idUs)

  //Hooks for Redux
  const dispatch = useDispatch();
  const register = useSelector((state) => state.profRegister);

  //Validation using Yup
  const validationSchema = Yup.object({
    tuition: Yup.string()
      .required("Es necesario llenar este campo")
      .trim("Elimine los espacios en blanco"),
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
    // titulo: Yup.string()
    //   .required("Es necesario llenar este campo")
    //   .trim("Elimine los espacios en blanco"),
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
              <div className="formRegConteiner">
                <div className="formProfContainerLeft">
                  <div className="prof-spaces">
                    <label className="TitleDataUser tiRegProf">Titulo *</label>
                    <Field
                      className="profInputs"
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

                    <label className="TitleDataUser tiRegProf">
                      Nivel Educativo *
                    </label>
                    <Field
                      className="profInputs"
                      id="nivelDeEstudio"
                      name="nivelDeEstudio"
                      type="text"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error-prof">{msg}</div>}
                      name="nivelDeEstudio"
                    />
                    <label className="TitleDataUser tiRegProf">
                      Capacitación *
                    </label>
                    <Field
                      className="profInputs"
                      id="trainings"
                      name="trainings"
                      type="text"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error-prof">{msg}</div>}
                      name="trainings"
                    />
                  </div>

                  <div className="prof-spaces">
                    <label className="TitleDataUser tiRegProf">
                      Institucion Educativa *
                    </label>
                    <Field
                      className="profInputs"
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
                </div>

                <div className="formProfContainerRight">
                  <div className="prof-spaces">
                    <label className="TitleDataUser tiRegProf">
                      Fecha de Inicio *
                    </label>
                    <Field
                      className="profInputs"
                      id="date_inicioEstudio"
                      name="date_inicioEstudio"
                      type="date"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error-prof">{msg}</div>}
                      name="date_inicioEstudio"
                    />
                  </div>
                  <div className="prof-spaces">
                    <label className="TitleDataUser tiRegProf">
                      Fecha de Finalizacion *
                    </label>
                    <Field
                      className="profInputs"
                      id="date_finicioEstudio"
                      name="date_finicioEstudio"
                      type="date"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error-prof">{msg}</div>}
                      name="date_finicioEstudio"
                    />
                  </div>
                  <div className="prof-spaces">
                    <label className="TitleDataUser tiRegProf">
                      Tarjeta profesional *
                    </label>
                    <Field
                      className="profInputs"
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
              </div>
              <div className="sign-button">
                <button className="buttonOne principalButton" type="submit">
                  Registra Datos Profesionales
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CardRegProf;
