import React, { useEffect, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  GetCitiesByState,
  getCountry,
  GetStatebyCountry,
  signUp,
} from "../../redux/action";
import * as Yup from "yup";
import swal from "sweetalert";
import "../User/User.css";
import { Widget } from "@uploadcare/react-widget";
import styled, { css } from "styled-components";
import profile from "../../images/imgProfile.png";

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ image }) =>
    image
      ? css`
          & .image {
            height: 300px;
            width: 300px;
            border-radius: 50%;
            overflow: hidden;

            img {
              height: 100%;
              width: 300px;
            }
          }

          & .uploadcare--widget {
          }
        `
      : css`
          & .image {
            display: none;
          }
        `}

  & .uploadcare--widget__button_type_open {
    height: 200px;
    width: 200px;
    border-radius: 100%;
    background: none;
    color: var(--main-extra-color);
  }
`;
const UserRegister = () => {
  const today = new Date();
  //Preset for Image
  const [image, setImage] = React.useState(null);
  const [url, seturl] = React.useState(null);
  const widgetApi = React.useRef();
  console.log("here", widgetApi);
  const translation = {
    buttons: {
      choose: {
        images: {
          one: `<div className="image"><img src=${profile} width="100px" alt="camera" /><br/>Upload photo</div>`,
        },
      },
    },
  };
  // let imagen = `https://ucarecdn.com/${url?.url}/${url?.name}`;

  //Input values
  const initialValues = {
    email: "",
    password: "",
    name: "",
    surname: "",
    phone: "",
    address: "",
    age: "",
    document: "",
    phone2: "",
    state: "",
    city: "",
    country: "",
    photo: "",
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
    name: Yup.string().required("Es necesario llenar este campo"),
    surname: Yup.string().required("Es necesario llenar este campo"),
    phone: Yup.string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "El número no es válido."
      )
      .required("Es necesario llenar este campo.")
      .trim("Elimine los espacios"),

    address: Yup.string().required("Es necesario llenar este campo."),
    age: Yup.string().required("Es necesario llenar este campo."),
    document: Yup.string()
      .required("Es necesario llenar este campo.")
      .trim("Elimine los espacios"),
    phone2: Yup.string()
      .required("Es necesario llenar este campo.")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "El número no es válido."
      )
      .trim("Elimine los espacios"),
    state: Yup.string().required("Es necesario llenar este campo."),
    city: Yup.string().required("Es necesario llenar este campo."),
    country: Yup.string().required("Es necesario llenar este campo."),
  });

  //Hooks for Redux
  const dispatch = useDispatch();

  const country = useSelector((state) => state.country);
  const states = useSelector((state) => state.states);
  const cities = useSelector((state) => state.cities);
  const register = useSelector((state) => state.userRegister);

  //Handlers
  const onSubmit = (values, { resetForm }) => {
    dispatch(signUp(values));
    resetForm();
    console.log(values);
  };

  const onClick = () => {
    if (register?.message === "User existent") {
      swal({
        title: register?.message,
        text: "Por Favor Intente Nuevamente",
      });
      dispatch(clear());
    } else if (register?.message === "User created") {
      swal({
        title: register?.message,
        text: "Por favor revise su correo, se ha enviado un link de verificación",
      }).then(() => {
        window.location = "https://deploy-click-care.vercel.app/welcome";
      });
      dispatch(clear());
    }
    // alert("Felicidades se Completó el Registro.");
    // alert("Se envió la confirmación a su email.");
  };
  onClick();

  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

  return (
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
              <UploadWrapper image={image}>
                <div
                  className="image"
                  onClick={() => widgetApi.current.openDialog()}
                >
                  <img src={image} alt="uploaded" />
                </div>
                <Widget
                  ref={widgetApi}
                  localeTranslations={translation}
                  crop="1:1"
                  publicKey="demopublickey"
                  id="photo"
                  name="photo"
                  value={values.photo}
                  onChange={(e) => setFieldValue("photo", e.cdnUrl)}
                  clearable
                  imagesOnly
                  previewStep
                  onFileSelect={(file) => {
                    if (!file) {
                      console.log("File removed from widget");
                      setImage(null);
                    }
                    file?.done((fileInfo) => {
                      console.log("File uploaded: ", fileInfo.cdnUrl);
                      setImage(fileInfo.cdnUrl);
                    });
                  }}
                />
              </UploadWrapper>

              <div className="sign-spaces">
                <label className="sign-label">Nombres*:</label>
                <Field
                  className="sign-inputs"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nombre"
                />
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="name"
                />
              </div>
              <div className="sign-spaces">
                <label className="sign-label">Apellidos*:</label>
                <Field
                  className="sign-inputs"
                  id="surname"
                  name="surname"
                  type="text"
                  placeholder="Apellido"
                />
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="surname"
                />
              </div>
              <div className="sign-spaces">
                <label className="sign-label">Fecha de Nacimiento*:</label>
                <Field
                  className="sign-inputs"
                  name="age"
                  id="age"
                  type="date"
                  placeholder="Edad"
                />
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="age"
                />
              </div>
              <div className="sign-spaces">
                <label className="sign-label">Email*:</label>
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
              </div>
              <div className="sign-spaces">
                <label className="sign-label">Contraseña*:</label>
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
              </div>
              <div className="sign-spaces">
                <label className="sign-label">Celular*:</label>
                <Field
                  className="sign-inputs"
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Celular"
                />
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="phone"
                />
              </div>
              <div className="sign-spaces">
                <label className="sign-label">Celular Altenativo:</label>
                <Field
                  className="sign-inputs"
                  id="phone2"
                  name="phone2"
                  type="tel"
                  placeholder="Celular Alternativo"
                />
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="phone2"
                />
              </div>

              <div className="sign-spaces">
                <label className="sign-label">Doc. de Identificación*:</label>
                <Field
                  className="sign-inputs"
                  id="document"
                  name="document"
                  type="text"
                  placeholder="Documento de Identificación"
                />
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="document"
                />
              </div>
              <div className="sign-spaces">
                <label className="sign-label">Dirección*:</label>
                <Field
                  className="sign-inputs"
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Dirección"
                />
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="address"
                />
              </div>

              <div className="sign-space">
                <label className="sign-label">País*:</label>
                <Field
                  className="sign-inputs"
                  as="select"
                  name="country"
                  id="country"
                  value={values.country}
                  onChange={(e) => {
                    const { value } = e.target;
                    setFieldValue("country", value);
                    dispatch(GetStatebyCountry(value));
                  }}
                >
                  <option value="" key="paises" disabled>
                    Selecciona tu país.
                  </option>
                  {country?.map((country) => (
                    <option value={country.name} key={country.id}>
                      {country.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="country"
                />
              </div>

              <div className="sign-spaces">
                <label className="sign-label">Estado*:</label>
                <Field
                  className="sign-inputs"
                  as="select"
                  name="state"
                  value={values.state}
                  onChange={(e) => {
                    const { value } = e.target;
                    setFieldValue("state", value);
                    dispatch(GetCitiesByState(value));
                  }}
                >
                  <option value="" key="estados" disabled>
                    Selecciona tu estado.
                  </option>
                  {states?.map((state) => (
                    <option value={state.name} key={state.id}>
                      {state.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="state"
                />
              </div>
              <div className="sign-spaces">
                <label className="sign-label">Ciudad*:</label>
                <Field
                  className="sign-inputs"
                  as="select"
                  name="city"
                  id="city"
                  value={values.city}
                  onChange={(e) => {
                    const { value } = e.target;
                    setFieldValue("city", value);
                  }}
                >
                  <option value="" key="ciudades" disabled>
                    Selecciona tu ciudad.
                  </option>
                  {cities[0]?.cities?.map((city) => (
                    <option value={city.name} key={city.id}>
                      {city.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="city"
                />
              </div>

              <div className="sign-button">
                <button
                  className="buttonOne principalButton"
                  type="submit"
                  onSubmit={onSubmit}
                >
                  Registra tu Usuario
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default UserRegister;
