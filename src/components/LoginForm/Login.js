import React, { useEffect } from "react";
import "./Login.css";
import { useFormik } from "formik";
import { clear, login, loginGoogle } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
// import { useCookies, Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import image from "./helpImages/imgUserById.png";
import * as Yup from "yup";
import swal from "sweetalert";
//Google
import { useAuth0 } from "@auth0/auth0-react";
import google from "../LoginForm/helpImages/google.png";
// import { email } from "react-admin";
const Login = (props) => {
  //Hooks needed
  const dispatch = useDispatch();
  const { loginWithPopup, user, isAuthenticated, logout } = useAuth0();

  const userlogged = useSelector((state) => state.userSession);

  useEffect(() => {
    if (isAuthenticated) {
      validate();
    }
  }, [isAuthenticated]);

  const validate = async () => {
    dispatch(
      loginGoogle({ isAuthenticated: isAuthenticated, email: user.email })
    );
  };
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
        /^.*(?=.{4})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        " La contraseña debe ser alfanumérica de min 4 Caracteres."
      )
      .trim("Elimine los espacios"),
  });

  //Handlers
  const onSubmit = (values, { resetForm }) => {
    dispatch(login(values));
    localStorage.setItem("accessBlocked", jwt.sign(values, "Goool"));
    resetForm();
  };

  if (userlogged?.message) {
    swal({
      title: userlogged?.message,
      text: "Disfruta de nuestros Servicios",
    }).then(() => {
      localStorage.setItem("session", userlogged["token"]);
      window.location = "https://deploy-click-care.vercel.app/offers";
    });
  } else if (userlogged?.error) {
    swal({
      title: userlogged?.error,
      text: "Por Favor Intente Nuevamente",
    });
    logout();
  }

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
              {/* <label className="labelCheck">
                <input className="box" type="checkbox" />
                Recuerdame.
              </label> */}
              <Link to="/forgetpassword">
                <button className="buttonOne forget">
                  ¿Olvidaste tu contraseña?
                </button>
              </Link>
            </div>

            <button className="buttonOne principalButton" type="submit">
              Inicia tu Sesión
            </button>
          </form>
          <div className="reg-space">
            <span className="register">Inicia Sesión También con ➤</span>
            <button
              className="logGoogle"
              onClick={() => {
                loginWithPopup();
              }}
            >
              <img className="google" src={google} alt="Google Login" />
            </button>
          </div>
          <div>
            <Link className="link" to="/signin">
              <span className="register">
                ¿Aún no haz creado tu cuenta?{" "}
                <span className="register2">Presiona Aquí</span>
              </span>
              <button className=" buttonOne regButton">➤</button>
            </Link>
          </div>
        </div>
        <div className="container-img">
          <img className="sideImage" src={image} alt="Side help Ilustration" />
        </div>
      </div>
    </>
  );
};

export default Login;
