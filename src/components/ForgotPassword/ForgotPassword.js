import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import "../ForgotPassword/ForgotPassword.css";
import * as Yup from "yup";
import swal from "sweetalert";
import { forgetPassword } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const forget = useSelector((state) => state.newPassword);

  const initialValues = {
    email: "",
    document: "",
    password: "",
  };

  //Validation using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Es necesario llenar este campo")
      .email("El email no es válido")
      .trim("Elimine los espacios"),
    password: Yup.string()
      .required("Es necesario llenar este campo.")
      .matches(
        /^.*(?=.{4,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        " La contraseña debe ser alfanumérica de min 4 Caracteres."
      )
      .trim("Elimine los espacios"),
    document: Yup.string()
      .required("Es necesario llenar este campo.")
      .trim("Elimine los espacios"),
  });

  //Handlers
  const onSubmit = (values, { resetForm }) => {
    dispatch(forgetPassword(values));
    resetForm();
    console.log(values);
  };
  const onClick = () => {
    if (forget) {
      swal({
        title: forget,
      });
    }
  };
  onClick();

  return (
    <div className="container-forget">
      <div className="container-img-form">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => {
            const { values, setFieldValue } = props;
            return (
              <Form>
                <div className="sign-spaces">
                  <label className="sign-label">E-mail:</label>
                  <Field
                    className="sign-inputs"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    render={(msg) => <div className="error">{msg}</div>}
                    name="email"
                  />

                  <label className="sign-label">Documento:</label>
                  <Field
                    className="sign-inputs"
                    name="document"
                    id="document"
                    type="text"
                    placeholder="Documento"
                  />
                  <ErrorMessage
                    render={(msg) => <div className="error">{msg}</div>}
                    name="document"
                  />

                  <label className="sign-label">Nueva Contraseña:</label>
                  <Field
                    className="sign-inputs"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                  />
                  <ErrorMessage
                    render={(msg) => <div className="error">{msg}</div>}
                    name="password"
                  />
                  <div className="sign-button">
                    <button
                      className="buttonOne principalButton"
                      type="submit"
                      onSubmit={onSubmit}
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
