import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import "../DataEdition/DataEdition.css";

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
  //Initial Values
  const initialValues = {
    email: email,
    password: password,
    name: name,
    surname: surname,
    phone: phone,
    address: address,
    age: age,
    document: document,
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
        <div className="dataUserIdConteiner">
          <div className="containerTextDataUser">
            <label className="TitleDataUser">Nombres:</label>
            <label className="TitleDataUser">Apellidos:</label>
            <label className="TitleDataUser">Documento de Identidad:</label>
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
            <label className="TitleDataUser">Fecha naciemiento:</label>
            <label className="TitleDataUser oneTitleUser">Edad:</label>
            <label className="TitleDataUser twoTitleUser">
              Correo Electronico:
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
              <label className="TitleDataUser">Institucion Educativa</label>
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
              <label className="TitleDataUser">Fecha de Finalización</label>
              <label className="TitleDataUser">Tarjeta Profesional</label>
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
            <label className="TitleDataUser threeTitleUser">Telefono:</label>
            <label className="TitleDataUser threeTitleUser">Movil:</label>
            <label className="TitleDataUser forTitleUser">Dirección:</label>
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
        </div>
      </Formik>
    </div>
  );
};

export default DataEdition;
