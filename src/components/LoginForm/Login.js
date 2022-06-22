import React from "react";
import "./Login.css";
import { useFormik } from "formik";
import { clear, login } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import image from "./helpImages/doctor_PNG15967.png";

// import Offers from "../Offers/Offers.js";

import * as Yup from "yup";
import swal from "sweetalert";

const Login = () => {
  //Hooks needed
  const dispatch = useDispatch();
  // const state = useSelector((state) => state.isLogged);
  const [cookies, setCookie] = useCookies();
  console.log(document.cookie);
  const user = useSelector((state) => state.userSession);

  //Formik initial values
  const initialValues = { email: "", password: "" };

  //Validations without Formik
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
  });

  //Handlers
  const onSubmit = (values, { resetForm }) => {
    dispatch(login(values));
    resetForm();
  };

  const onClick = () => {
    if (user?.message) {
      swal({
        title: user?.message,
        text: "Disfruta de nuestros Servicios",
      });
    } else if (user?.error) {
      swal({
        title: user?.error,
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
    <>
      <div className="container-login">
        <div className="container-form">
          <h1 className="title">
            <span className="span-login">Inicia</span> tu Sesión
          </h1>
          <form onSubmit={formik.handleSubmit} className="log-form">
            <label className="label">Email*:</label>
            <input
              className="email"
              id="email"
              type="text"
              placeholder="E-mail"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="error1">{formik.errors.email}</span>
            ) : null}
            <label className="label">Contraseña*:</label>
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
            <div className="password"></div>
            <div className="password">
              <label className="labelCheck">
                <input className="box" type="checkbox" />
                Recuerdame.
              </label>
              <button className="buttonOne forget">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button className="buttonOne principalButton" type="submit">
              Inicia tu Sesión
            </button>

            <Link className="link" to="/signin">
              <span className="register">
                ¿Aún no haz creado tu cuenta?{" "}
                <span className="register2">Presiona Aquí</span>
              </span>
              <button className=" buttonOne regButton">➤</button>
            </Link>
          </form>
        </div>
        <div className="container-img">
          <img className="sideImage" src={image} alt="Side help Ilustration" />
        </div>
      </div>
    </>
  );
};

export default Login;
