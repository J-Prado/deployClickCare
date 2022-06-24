import "../Welcome/Welcome.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear, login, userValidationProcess } from "../../redux/action";

import { withRouter } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";

// import { useCookies } from "react-cookie";

const Welcome = withRouter((props) => {
  const dispatch = useDispatch();
  const validation = useSelector((state) => state.valid);
  const userSession = useSelector((state) => state.userSession);
  // const [cookies, setCookie] = useCookies();
  useEffect(() => {
    dispatch(userValidationProcess(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  //Formik initial values
  const initialValues = { email: validation.email, password: "" };
  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Es necesario llenar este campo.")
      .matches(
        /^.*(?=.{4,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        " La contraseña debe ser alfanumérica de min 4 Caracteres."
      ),
  });

  //Handlers
  const onSubmit = (values, { resetForm }) => {
    dispatch(login(values));
    resetForm();
    console.log(values);
  };

  const onClick = () => {
    if (userSession.message) {
      swal({
        title: userSession.message,
        text: "Disfruta de nuestros Servicios",
      }).then(() => {
        window.location = "https://deploy-click-care.vercel.app/offers";
      });
    } else if (userSession.error) {
      swal({
        title: userSession.error,
        text: "Por Favor Intente Nuevamente",
      });
      dispatch(clear());
    } else return null;
  };
  onClick();

  //Setting Formik to be functional when calling
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="welcome-container">
      {props.match.params.id ? (
        <div>
          <span className="wel-text">¡BIENVENIDO!</span>
          <br />
          <span className="wel-text validated">
            La cuenta {validation.email} se ha validado correctamente.
          </span>
          <br />
          <form onSubmit={formik.handleSubmit} className="log-form">
            <label className="label">
              Por tu seguridad Contraseña nuevamente o Inicia Sesión desde
              nuestra App:
            </label>
            <label className="label">Password:</label>
            <input
              className="password1"
              id="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <span className="error1">{formik.errors.password}.</span>
            ) : null}
            <button className="buttonOne principalButton" type="submit">
              Inicia tu Sesión
            </button>
          </form>
        </div>
      ) : (
        <div>
          <span className="wel-text">¡BIENVENIDO!</span>
          <br />
          <span className="wel-text validated">
            Por favor valida tu cuenta.
          </span>
          <br />
        </div>
      )}
    </div>
  );
});

export default Welcome;
