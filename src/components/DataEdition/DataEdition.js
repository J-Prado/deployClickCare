import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import "../DataEdition/DataEdition.css";
import { Widget } from "@uploadcare/react-widget";
import styled, { css } from "styled-components";
import profile from "../../images/imgProfile.png";
import * as Yup from "yup";
import swal from "sweetalert";
import jwt from "jsonwebtoken";
import {
  GetCitiesByState,
  getCountry,
  GetStatebyCountry,
  getUserDetail,
} from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
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
            background: none;
          }
        `
      : css`
          & .image {
            display: none;
          }
        `}

  & .uploadcare--widget__button_type_open {
    height: 300px;
    width: 300px;
    border-radius: 100%;
    background: none;
    color: var(--main-extra-color);
  }
`;

const DataEdition = () => {
  //Hooks
  const id = jwt.decode(localStorage.getItem("session"))?.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

  const detailUser = useSelector((state) => state.userDetail);
  const idValidate = detailUser[0]?.professionals[0]?.id;

  let verific = 0;
  if (idValidate !== undefined) {
    verific = +1;
  }

  const country = useSelector((state) => state.country);
  const states = useSelector((state) => state.states);
  const cities = useSelector((state) => state.cities);
  const register = useSelector((state) => state.userRegister);
  let usuario = {};

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
  if (detailUser[0]) {
    usuario = detailUser[0];
    // console.log("llegué");
  }

  //Initial Values
  const initialValues = (usuario) => {
    return verific === 1
      ? {
          email: usuario?.email,
          password: jwt.decode(localStorage.getItem("accessBlocked"))?.password, //
          name: usuario?.name, //
          surname: usuario?.surname, //
          phone: usuario?.phone, //
          address: usuario?.address,
          age: usuario?.age, //
          document: usuario?.document, //
          phone2: usuario?.phone2, //
          id: id, //id_user
          photo: usuario?.photo, //

          state: usuario?.state,
          city: usuario?.city,
          country: usuario?.country,
          nivelDeEstudio: detailUser[0]?.professionals[0]?.nivelDeEstudio,
          institucion: detailUser[0]?.professionals[0]?.institucion,
          titulo: detailUser[0]?.professionals[0]?.titulo,
          date_inicioEstudio:
            detailUser[0]?.professionals[0]?.date_inicioEstudio,
          date_finicioEstudio:
            detailUser[0]?.professionals[0]?.date_finicioEstudio,
          cvu: detailUser[0]?.professionals[0]?.cvu,
        }
      : {
          id: id,
          email: usuario?.email,
          password: jwt.decode(localStorage.getItem("accessBlocked"))?.password,
          name: usuario?.name,
          surname: usuario?.surname,
          phone: usuario?.phone,
          address: usuario?.address,
          age: usuario?.age,
          document: usuario?.document,
          phone2: usuario?.phone2,
          state: usuario?.state,
          city: usuario?.city,
          country: usuario?.country,
          photo: usuario?.photo,
        };
  };

  // console.log("Valores", usuario);

  //Handlers
  const onSubmit = (values, { resetForm }) => {
    // resetForm();
    console.log(values);
    swal({
      text: "Para Confirmar Introduce tu Contraseña",
      content: "input",
      button: {
        text: "Validar",
        closeModal: false,
      },
    }).then((password) => {
      if (
        verific === 0 &&
        password === jwt.decode(localStorage.getItem("accessBlocked"))?.password
      ) {
        dispatch();
      }
    });
  };

  //Validation using Yup
  const validationSchema = Yup.object(
    verific === 1
      ? {
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
            .matches(
              /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              "El número no es válido."
            )
            .trim("Elimine los espacios"),
          state: Yup.string().required("Es necesario llenar este campo."),
          city: Yup.string().required("Es necesario llenar este campo."),
          country: Yup.string().required("Es necesario llenar este campo."),
          nivelDeEstudio: Yup.string().required(
            "Es necesario llenar este campo."
          ),
          institucion: Yup.string().required("Es necesario llenar este campo."),
          titulo: Yup.string().required("Es necesario llenar este campo."),
          date_inicioEstudio: Yup.string().required(
            "Es necesario llenar este campo."
          ),
          date_finicioEstudio: Yup.string().required(
            "Es necesario llenar este campo."
          ),
          cvu: Yup.string().required("Es necesario llenar este campo."),
        }
      : {
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
            .matches(
              /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              "El número no es válido."
            )
            .trim("Elimine los espacios"),
          state: Yup.string().required("Es necesario llenar este campo."),
          city: Yup.string().required("Es necesario llenar este campo."),
          country: Yup.string().required("Es necesario llenar este campo."),
        }
  );

  return (
    <div className="container-edit">
      <Formik
        initialValues={usuario ? initialValues(usuario) : initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => {
          const { values, setFieldValue } = props;
          return (
            <Form>
              <div className="formEditContainer">
                <div className="containerEditLeft">
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
                      crop="free, 1:1"
                      publicKey="demopublickey"
                      id="photo"
                      name="photo"
                      value={values?.photo}
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
                </div>

                <div className="dataUserIdConteiner">
                  <div className="containerTextDataUser">
                    <label className="TitleDataUser">Nombres:</label>
                    <label className="TitleDataUser">Apellidos:</label>
                    <label className="TitleDataUser">
                      Documento de Identidad:
                    </label>
                  </div>
                  <div className="containerTextDataUser">
                    <Field
                      className="infoDataUser"
                      id="name"
                      name="name"
                      type="text"
                      placeholder={usuario?.name}
                    />

                    <Field
                      className="infoDataUser"
                      id="surname"
                      name="surname"
                      type="text"
                      placeholder={detailUser[0]?.surname}
                    />

                    <Field
                      className="infoDataUser"
                      id="document"
                      name="document"
                      type="text"
                      placeholder={detailUser[0]?.document}
                    />
                  </div>
                  <div>
                    {" "}
                    <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="name"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="surname"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="document"
                    />
                  </div>
                  <div className="containerTextDataUser">
                    <label className="TitleDataUser">Fecha nacimiento:</label>
                    <label className="TitleDataUser oneTitleUser">
                      Contraseña:
                    </label>
                    <label className="TitleDataUser twoTitleUser">
                      Correo Electronico:
                    </label>
                  </div>
                  <div className="containerTextDataUser">
                    <Field
                      className="infoDataUser"
                      id="age"
                      name="age"
                      type="text"
                      placeholder={detailUser[0]?.age}
                      disabled
                    />

                    <Field
                      className="infoDataUser oneTitleUser"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Contraseña"
                      disabled
                    />

                    <Field
                      className="infoDataUser twoTitleUser"
                      id="email"
                      name="email"
                      type="email"
                      placeholder={usuario?.email}
                    />
                  </div>
                  <div>
                    {" "}
                    {/* <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="age"
                    /> */}
                    <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="password"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="email"
                    />
                  </div>
                  {verific === 1 ? (
                    <div>
                      <div className="containerTextDataUser">
                        <label className="TitleDataUser">Nivel Educativo</label>
                        <label className="TitleDataUser">
                          Institucion Educativa
                        </label>
                        <label className="TitleDataUser">Titulo</label>
                      </div>
                      <div className="containerTextDataUser">
                        <Field
                          className="infoDataUser"
                          id="nivelDeEstudio"
                          name="nivelDeEstudio"
                          type="text"
                          placeholder={
                            detailUser[0]?.professionals[0]?.nivelDeEstudio
                          }
                        />

                        <Field
                          className="infoDataUser"
                          id="institucion"
                          name="institucion"
                          type="text"
                          placeholder={
                            detailUser[0]?.professionals[0]?.institucion
                          }
                        />

                        <Field
                          className="infoDataUser"
                          id="titulo"
                          name="titulo"
                          type="text"
                          placeholder={detailUser[0]?.professionals[0]?.titulo}
                        />
                      </div>
                      <div>
                        {" "}
                        <ErrorMessage
                          render={(msg) => <div className="error">{msg}</div>}
                          name="nivelDeEstudio"
                        />
                        <ErrorMessage
                          render={(msg) => <div className="error">{msg}</div>}
                          name="institucion"
                        />
                        <ErrorMessage
                          render={(msg) => <div className="error">{msg}</div>}
                          name="titulo"
                        />
                      </div>
                      <div className="containerTextDataUser">
                        <label className="TitleDataUser">Fecha de Inicio</label>
                        <label className="TitleDataUser">
                          Fecha de Finalización
                        </label>
                        <label className="TitleDataUser">
                          Tarjeta Profesional
                        </label>
                      </div>
                      <div className="containerTextDataUser">
                        <Field
                          className="infoDataUser"
                          id="date_inicioEstudio"
                          name="date_inicioEstudio"
                          type="text"
                          placeholder={
                            detailUser[0]?.professionals[0]?.date_inicioEstudio
                          }
                        />

                        <Field
                          className="infoDataUser"
                          id="date_finicioEstudio"
                          name="date_finicioEstudio"
                          type="text"
                          placeholder={
                            detailUser[0]?.professionals[0]?.date_finicioEstudio
                          }
                        />

                        <Field
                          className="infoDataUser"
                          id="cvu"
                          name="cvu"
                          type="text"
                          placeholder={detailUser[0]?.professionals[0]?.cvu}
                        />
                      </div>
                      <div>
                        {" "}
                        <ErrorMessage
                          render={(msg) => <div className="error">{msg}</div>}
                          name="date_inicioEstudio"
                        />
                        <ErrorMessage
                          render={(msg) => <div className="error">{msg}</div>}
                          name="date_finicioEstudio"
                        />
                        <ErrorMessage
                          render={(msg) => <div className="error">{msg}</div>}
                          name="cvu"
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className="containerTextDataUser">
                    <label className="TitleDataUser threeTitleUser">
                      Telefono:
                    </label>
                    <label className="TitleDataUser threeTitleUser">
                      Movil:
                    </label>
                    <label className="TitleDataUser forTitleUser">
                      Dirección:
                    </label>
                  </div>
                  <div className="containerTextDataUser">
                    <Field
                      className="infoDataUser threeTitleUser"
                      id="phone2"
                      name="phone2"
                      type="text"
                      placeholder={detailUser[0]?.phone2}
                    />

                    <Field
                      className="infoDataUser threeTitleUser"
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder={detailUser[0]?.phone}
                    />

                    <Field
                      className="infoDataUser forTitleUser"
                      id="address"
                      name="address"
                      type="text"
                      placeholder={detailUser[0]?.address}
                    />
                  </div>
                  <div>
                    <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="phone2"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="phone"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="address"
                    />
                  </div>
                  <div className="containerTextDataUser">
                    <label className="TitleDataUser">País:</label>
                    <label className="TitleDataUser">Estado/Provincia:</label>
                    <label className="TitleDataUser">Ciudad:</label>
                  </div>
                  <div className="containerTextDataUser">
                    <Field
                      className="infoDataUser"
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
                      <option value="" key="paises">
                        Cambia tu país
                      </option>
                      {country?.map((country) => (
                        <option value={country.name} key={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </Field>

                    <Field
                      className="infoDataUser"
                      as="select"
                      name="state"
                      value={values.state}
                      onChange={(e) => {
                        const { value } = e.target;
                        setFieldValue("state", value);
                        dispatch(GetCitiesByState(value));
                      }}
                    >
                      <option value="" key="estados">
                        Cambia tu Estado
                      </option>
                      {states?.map((state) => (
                        <option value={state.name} key={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </Field>

                    <Field
                      className="infoDataUser"
                      as="select"
                      name="city"
                      id="city"
                      value={values.city}
                      onChange={(e) => {
                        const { value } = e.target;
                        setFieldValue("city", value);
                      }}
                    >
                      <option value="" key="ciudades">
                        Cambia tu Ciudad
                      </option>
                      {cities[0]?.cities?.map((city) => (
                        <option value={city.name} key={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div>
                    {" "}
                    <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="country"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="state"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="city"
                    />
                  </div>
                  <div className="containerButtonInfoById">
                    <button className="buttonOne buttonInfoById">
                      Validar los Cambios
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default DataEdition;
