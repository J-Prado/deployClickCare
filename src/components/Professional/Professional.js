import React from "react";
import "../Professional/Professional.css";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import * as Yup from "yup";

const Professional = () => {
  //Input values
  const initialValues = {
    tuition: "",
    trainings: "",
    photo: "",
    cvu: "",
    userId: 0,
  };

  //Hooks for Redux
  const dispatch = useDispatch();

  //Validation using Yup
  const validationSchema = Yup.object({
    tuition: Yup.string().required("Es necesario llenar este campo"),
    trainings: Yup.string().required("Es necesario llenar este campo"),
    photo: Yup.string().required("Es necesario llenar este campo"),
    cvu: Yup.string().required("Es necesario llenar este campo"),
    userId: Yup.number().required("Es necesario llenar este campo"),
  });

  //Handlers
  const onSubmit = (values, { resetForm }) => {
    dispatch();
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(props) => {
        return (
          <Form>
            <div className="sign-prof">
              <div className="sign-spaces">
                <label className="sign-label">Universidad*:</label>
                <Field
                  className="inputs"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nombre"
                />
                <span className="sign-error">Este campo es obligatorio.</span>
                <label className="sign-label">URL Photo*:</label>
                <input
                  className="inputs"
                  id="photo"
                  type="text"
                  placeholder="URL photo"
                />
                <span className="sign-error">Este campo es obligatorio.</span>
                <label className="sign-label">Especialidad*:</label>
                <input
                  className="inputs"
                  id="speciality"
                  type="text"
                  placeholder="Especialidad"
                />
                <span className="sign-error">Este campo es obligatorio.</span>
              </div>
              <div className="sign-spaces">
                <label className="sign-label">Capacitaciones*:</label>
                <input
                  className="inputs"
                  id="trainings"
                  type="text"
                  placeholder="Capacitaciones"
                />
                <button className="principalButton">Añadir Capacitación</button>
                <ul>
                  <li>a</li>
                  <li>a</li>
                </ul>
                <span className="sign-error">Este campo es obligatorio.</span>
              </div>
              <div className="sign-button">
                <button className="oneButton principalButton" type="submit">
                  Registra Datos Profesionales
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Professional;
