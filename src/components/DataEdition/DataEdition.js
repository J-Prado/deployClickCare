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

  //Initial Values
  const initialValues = {
    email: "", //
    password: "", //
    name: "", //
    surname: "", //
    phone: "", //
    address: "",
    age: "", //
    document: "", //
    phone2: "", //
    userId: jwt.decode(localStorage.getItem("session"))?.id, //id_user
    tuition: "",
    trainings: "",
    photo: "", //
    cvu: "",
    state: "",
    city: "",
    country: "",
    nivelDeEstudio: "",
    institucion: "",
    titulo: "",
    date_inicioEstudio: "",
    date_finicioEstudio: "",
  };

  //Hooks
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);
  const states = useSelector((state) => state.states);
  const cities = useSelector((state) => state.cities);
  const register = useSelector((state) => state.userRegister);

  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

  //Handlers
  const onSubmit = (values, { resetForm }) => {
    // resetForm();
    console.log(values);
  };

  //Validation using Yup
  const validationSchema = Yup.object({});

  return (
    <div className="container-edit">
      <Formik
        initialValues={initialValues}
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
                      placeholder="Nombre"
                    />
                    <Field
                      className="infoDataUser"
                      id="surname"
                      name="surname"
                      type="text"
                      placeholder="Apellidos"
                    />
                    <Field
                      className="infoDataUser"
                      id="document"
                      name="document"
                      type="text"
                      placeholder="Documento de Identidad"
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
                      type="date"
                    />
                    <Field
                      className="infoDataUser oneTitleUser"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Contraseña"
                    />
                    <Field
                      className="infoDataUser twoTitleUser"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Correo Electrónico"
                    />
                  </div>

                  {/* {verificOne === 1 ? ( */}
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
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nombre"
                      />
                      <Field
                        className="infoDataUser"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nombre"
                      />
                      <Field
                        className="infoDataUser"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nombre"
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
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nombre"
                      />
                      <Field
                        className="infoDataUser"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nombre"
                      />
                      <Field
                        className="infoDataUser"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nombre"
                      />
                    </div>
                  </div>
                  {/* ) : null} */}

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
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="Teléfono"
                    />
                    <Field
                      className="infoDataUser threeTitleUser"
                      id="phone2"
                      name="phone2"
                      type="text"
                      placeholder="Movil"
                    />
                    <Field
                      className="infoDataUser forTitleUser"
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Dirección"
                    />
                  </div>
                  <div className="containerTextDataUser">
                    <label className="TitleDataUser">Ciudad:</label>
                    <label className="TitleDataUser">Estado/Provincia:</label>
                    <label className="TitleDataUser">Pais:</label>
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
                      <option value="" key="paises" disabled>
                        Selecciona tu país.
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
                      <option value="" key="estados" disabled>
                        Selecciona tu estado.
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
                      <option value="" key="ciudades" disabled>
                        Selecciona tu ciudad.
                      </option>
                      {cities[0]?.cities?.map((city) => (
                        <option value={city.name} key={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="containerButtonInfoById">
                    <button className="buttonOne buttonInfoById">Enviar</button>
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
