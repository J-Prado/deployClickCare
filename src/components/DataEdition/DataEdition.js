import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import "../DataEdition/DataEdition.css";
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

const DataEdition = ({
  email,
  password,
  name,
  surname,
  phone,
  address,
  age,
  document,
  phone2,
  userId, //id_user
  tuition,
  trainings,
  photo,
  cvu,
  state,
  city,
  country,
  nivelDeEstudio,
  institucion,
  titulo,
  date_inicioEstudio,
  date_finicioEstudio,
}) => {
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
    email: email,
    password: password,
    name: name, //
    surname: surname, //
    phone: phone,
    address: address,
    age: age, //
    document: document, //
    phone2: phone2,
    userId: userId, //id_user
    tuition: tuition,
    trainings: trainings,
    photo: photo,
    cvu: cvu,
    state: state,
    city: city,
    country: country,
    nivelDeEstudio: nivelDeEstudio,
    institucion: institucion,
    titulo: titulo,
    date_inicioEstudio: date_inicioEstudio,
    date_finicioEstudio: date_finicioEstudio,
  };

  return (
    <div className="container-edit">
      <Formik>
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
                    <label className="TitleDataUser">Fecha naciemiento:</label>
                    <label className="TitleDataUser oneTitleUser">Edad:</label>
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
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nombre"
                    />
                    <Field
                      className="infoDataUser twoTitleUser"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nombre"
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
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nombre"
                    />
                    <Field
                      className="infoDataUser threeTitleUser"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nombre"
                    />
                    <Field
                      className="infoDataUser forTitleUser"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nombre"
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
