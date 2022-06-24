import React from "react";
import "../Professional/Professional.css";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import * as Yup from "yup";
import jwt from "jsonwebtoken";
import { profRegister } from "../../redux/action";

const Professional = () => {
  //Input values
  const initialValues = {
    tuition: "",
    trainings: "",
    photo: "",
    cvu: "",
    userId: jwt.decode(localStorage?.getItem("session"))?.id,
  };

  //Hooks for Redux
  const dispatch = useDispatch();

  //Validation using Yup
  const validationSchema = Yup.object({
    tuition: Yup.string()
      .required("Es necesario llenar este campo")
      .trim("Elimine los espacios en blanco"),
    trainings: Yup.string()
      .required("Es necesario llenar este campo")
      .trim("Elimine los espacios en blanco"),
    photo: Yup.string()
      .required("Es necesario llenar este campo")
      .trim("Elimine los espacios en blanco"),
    cvu: Yup.string()
      .required("Es necesario llenar este campo")
      .trim("Elimine los espacios en blanco"),
    userId: Yup.number().required("Es necesario llenar este campo"),
  });

  //Handlers
  const onSubmit = (values, { resetForm }) => {
    dispatch(profRegister(values));
    resetForm();
    console.log(values);
  };

  return (
    <div className="general-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => {
          return (
            <Form>
              <div className="sign-prof">
                <div className="prof-spaces">
                  <label className="sign-label">Universidad*:</label>
                  <Field
                    className="profInputs"
                    id="tuition"
                    name="tuition"
                    type="text"
                    placeholder="Universidad"
                  />
                  <ErrorMessage
                    render={(msg) => <div className="error-prof">{msg}</div>}
                    name="tuition"
                  />
                </div>
                <div className="prof-spaces">
                  <label className="sign-label">URL Photo*:</label>
                  <Field
                    className="profInputs"
                    id="photo"
                    name="photo"
                    type="text"
                    placeholder="URL Photo"
                  />
                  <ErrorMessage
                    render={(msg) => <div className="error-prof">{msg}</div>}
                    name="photo"
                  />
                </div>
                <div className="prof-spaces">
                  <label className="sign-label">CVU*:</label>
                  <Field
                    className="profInputs"
                    id="cvu"
                    name="cvu"
                    type="text"
                    placeholder="CVU"
                  />
                  <ErrorMessage
                    render={(msg) => <div className="error-prof">{msg}</div>}
                    name="cvu"
                  />
                </div>
                <div className="prof-spaces">
                  <label className="sign-label">Capacitaciones*:</label>
                  <Field
                    className="profInputs"
                    id="trainings"
                    name="trainings"
                    type="text"
                    placeholder="Capacitaciones"
                  />
                  {/* <button className="principalButton">
                    Añadir Capacitación
                  </button>
                  <ul>
                    <li>a</li>
                    <li>a</li>
                  </ul> */}
                  <ErrorMessage
                    render={(msg) => <div className="error-prof">{msg}</div>}
                    name="trainings"
                  />
                </div>
                <div className="sign-button">
                  <button className="buttonOne principalButton" type="submit">
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
};

export default Professional;
