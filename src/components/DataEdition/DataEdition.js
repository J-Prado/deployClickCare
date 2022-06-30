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
  profEdition,
  userEdition,
} from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  console.log(id);

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
  const register = useSelector((state) => state.messagesEdition);
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

  const dayB = new Date(usuario?.age).getDate();
  const monthb = new Date(usuario?.age).getMonth() + 1;
  const yearB = new Date(usuario?.age).getFullYear();
  const birthdayDate = dayB + "/" + monthb + "/" + yearB;
  const ageFinal = birthdayDate ? birthdayDate : "";
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
          age: birthdayDate, //
          document: usuario?.document, //
          phone2: usuario?.phone2, //
          id: id, //id_user
          photo: usuario?.photo, //
          tuition: 123456,
          trainings: "Enfermería",
          state: usuario?.state?.name,
          city: usuario?.city?.name,
          country: usuario?.country?.name,
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
          age: birthdayDate,
          document: usuario?.document,
          phone2: usuario?.phone2,
          state: usuario?.state?.name,
          city: usuario?.city?.name,
          country: usuario?.country?.name,
          photo: usuario?.photo,
        };
  };

  // console.log("Valores", usuario);

  //Handlers
  const onSubmit = (values, { resetForm }) => {
    // resetForm();
    // console.log(values);

    if (localStorage.getItem("google")) {
      swal({
        text: "Escriba su contraseña en el campo requerido",
      });
      dispatch(userEdition(values));
    } else {
      dispatch(userEdition(values));

      swal({
        text: "Para Confirmar Introduce tu Contraseña",
        content: {
          element: "input",
          attributes: {
            type: "password",
          },
        },
        attributes: {},
      }).then((password) => {
        if (
          verific === 1 &&
          password ===
            jwt.decode(localStorage.getItem("accessBlocked"))?.password
        ) {
          dispatch(profEdition(values));
          console.log("despache1");
          return swal("Se han editado tus datos");
        } else if (
          verific === 0 &&
          password ===
            jwt.decode(localStorage.getItem("accessBlocked"))?.password
        ) {
          dispatch(userEdition(values));
          console.log("despache2");
          return swal("Se han editado tus datos");
        } else {
          return swal("No se han validado los datos correctamente");
        }
      });
    }
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
        }
  );

  return (
    <div className="container-edit">
      <Link to={`/user/${id}`}>
        <button className="buttonOne posBottonVolver">Volver</button>
      </Link>
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
                      crop="1:1"
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
                  <div className="secUno">
                    <div className="dataBlock">
                      <label className="TitleDataUser">Nombres:</label>
                      <Field
                        className="infoDataUser"
                        id="name"
                        name="name"
                        type="text"
                        placeholder={usuario?.name}
                      />{" "}
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="name"
                      />
                    </div>
                    <div className="dataBlock">
                      <label className="TitleDataUser">Apellidos:</label>
                      <Field
                        className="infoDataUser"
                        id="surname"
                        name="surname"
                        type="text"
                        placeholder={detailUser[0]?.surname}
                      />
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="surname"
                      />
                    </div>
                    <div className="dataBlock">
                      <label className="TitleDataUser">
                        Documento de Identidad:
                      </label>
                      <Field
                        className="infoDataUser"
                        id="document"
                        name="document"
                        type="text"
                        placeholder={detailUser[0]?.document}
                      />
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="document"
                      />
                    </div>
                  </div>
                  <div className="secUno">
                    <div className="dataBlock">
                      <label className="TitleDataUser">Fecha nacimiento:</label>
                      <Field
                        className="infoDataUser"
                        id="age"
                        name="age"
                        type="text"
                        disabled
                      />
                    </div>
                    {localStorage.getItem("google") ? (
                      <div className="dataBlock">
                        <label className="TitleDataUser oneTitleUser">
                          Contraseña:
                        </label>
                        <Field
                          className="infoDataUser oneTitleUser"
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
                    ) : (
                      <div className="dataBlock">
                        <label className="TitleDataUser oneTitleUser">
                          Contraseña:
                        </label>
                        <Field
                          className="infoDataUser oneTitleUser"
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Contraseña"
                          disabled
                        />
                        <ErrorMessage
                          render={(msg) => <div className="error">{msg}</div>}
                          name="password"
                        />
                      </div>
                    )}

                    <div className="dataBlock">
                      <label className="TitleDataUser twoTitleUser">
                        Correo Electronico:
                      </label>
                      <Field
                        className="infoDataUser twoTitleUser"
                        id="email"
                        name="email"
                        type="email"
                        placeholder={usuario?.email}
                      />
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="email"
                      />
                    </div>
                  </div>
                  {verific === 1 ? (
                    <div>
                      <div className="secUno">
                        <div className="dataBlock">
                          <label className="TitleDataUser">
                            Nivel Educativo
                          </label>
                          <Field
                            className="infoDataUser"
                            id="nivelDeEstudio"
                            name="nivelDeEstudio"
                            type="text"
                            placeholder={
                              detailUser[0]?.professionals[0]?.nivelDeEstudio
                            }
                          />{" "}
                          <ErrorMessage
                            render={(msg) => <div className="error">{msg}</div>}
                            name="nivelDeEstudio"
                          />
                        </div>
                        <div className="dataBlock">
                          <label className="TitleDataUser">
                            Institucion Educativa
                          </label>
                          <Field
                            className="infoDataUser"
                            id="institucion"
                            name="institucion"
                            type="text"
                            placeholder={
                              detailUser[0]?.professionals[0]?.institucion
                            }
                          />
                          <ErrorMessage
                            render={(msg) => <div className="error">{msg}</div>}
                            name="institucion"
                          />
                        </div>
                        <div className="dataBlock">
                          <label className="TitleDataUser">Titulo</label>
                          <Field
                            className="infoDataUser"
                            id="titulo"
                            name="titulo"
                            type="text"
                            placeholder={
                              detailUser[0]?.professionals[0]?.titulo
                            }
                          />
                          <ErrorMessage
                            render={(msg) => <div className="error">{msg}</div>}
                            name="titulo"
                          />
                        </div>
                      </div>
                      <div className="secUno">
                        <div className="dataBlock">
                          <label className="TitleDataUser">
                            Fecha de Inicio
                          </label>
                          <Field
                            className="infoDataUser"
                            id="date_inicioEstudio"
                            name="date_inicioEstudio"
                            type="date"
                            // placeholder={
                            //   detailUser[0]?.professionals[0]
                            //     ?.date_inicioEstudio
                            // }
                          />
                          <ErrorMessage
                            render={(msg) => <div className="error">{msg}</div>}
                            name="date_inicioEstudio"
                          />
                        </div>
                        <div className="dataBlock">
                          <label className="TitleDataUser">
                            Fecha de Finalización
                          </label>
                          <Field
                            className="infoDataUser"
                            id="date_finicioEstudio"
                            name="date_finicioEstudio"
                            type="date"
                            // placeholder={
                            //   detailUser[0]?.professionals[0]
                            //     ?.date_finicioEstudio
                            // }
                          />
                          <ErrorMessage
                            render={(msg) => <div className="error">{msg}</div>}
                            name="date_finicioEstudio"
                          />
                        </div>
                        <div className="dataBlock">
                          <label className="TitleDataUser">
                            Tarjeta Profesional
                          </label>

                          <Field
                            className="infoDataUser"
                            id="cvu"
                            name="cvu"
                            type="text"
                            placeholder={detailUser[0]?.professionals[0]?.cvu}
                          />
                          <ErrorMessage
                            render={(msg) => <div className="error">{msg}</div>}
                            name="cvu"
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div className="secUno">
                    <div className="dataBlock">
                      <label className="TitleDataUser threeTitleUser">
                        Telefono:
                      </label>
                      <Field
                        className="infoDataUser threeTitleUser"
                        id="phone2"
                        name="phone2"
                        type="text"
                        placeholder={detailUser[0]?.phone2}
                      />
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="phone2"
                      />
                    </div>
                    <div className="dataBlock">
                      <label className="TitleDataUser threeTitleUser">
                        Movil:
                      </label>
                      <Field
                        className="infoDataUser threeTitleUser"
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder={detailUser[0]?.phone}
                      />
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="phone"
                      />
                    </div>
                    <div className="dataBlock">
                      <label className="TitleDataUser forTitleUser">
                        Dirección:
                      </label>
                      <Field
                        className="infoDataUser forTitleUser"
                        id="address"
                        name="address"
                        type="text"
                        placeholder={detailUser[0]?.address}
                      />
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="address"
                      />
                    </div>
                  </div>

                  <div className="secUno">
                    <div className="dataBlock">
                      <label className="TitleDataUser forTitleUser">
                        País:
                      </label>

                      <Field
                        className="infoDataUser uno"
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
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="country"
                      />
                    </div>
                    <div className="dataBlock">
                      <label className="TitleDataUser forTitleUser">
                        Estado/Provincia:
                      </label>

                      <Field
                        className="infoDataUser uno"
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
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="state"
                      />
                    </div>
                    <div className="dataBlock">
                      <label className="TitleDataUser forTitleUser">
                        Ciudad:
                      </label>
                      <Field
                        className="infoDataUser uno"
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

                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="city"
                      />
                    </div>
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
