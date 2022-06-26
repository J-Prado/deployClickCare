import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import "../DataEdition/DataEdition.css";

const DataEdition = ({
  name,
  lastName,
  document,
  birthday,
  email,
  city,
  state,
  country,
  phone,
  phone2,
  address,
  idProf,
  title,
  speciality,
  institution,
  studyStart,
  studyEnd,
  cvu,
}) => {
  const dayB = new Date(birthday).getDate();
  const monthb = new Date(birthday).getMonth() + 1;
  const yearB = new Date(birthday).getFullYear();
  const birthdayDate = dayB + "/" + monthb + "/" + yearB;
  const dateOne = new Date().getFullYear();
  const age = dateOne - yearB;

  const idVer = idProf;
  //console.log(idVer)
  let verificOne = 0;
  if (idVer !== undefined) {
    verificOne = +1;
  }

  const startDate = (studyStart) =>
    [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ][new Date(studyStart).getMonth()];

  let studyintial =
    startDate(studyStart) + "-" + new Date(studyStart).getFullYear();

  const endDate = (studyEnd) =>
    [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ][new Date(studyEnd).getMonth()];

  let studyedn = endDate(studyEnd) + "-" + new Date(studyEnd).getFullYear();

  //Initial Values
  const initialValues = {
    name: name,
    surname: lastName,
    document: document,
    age: birthday,
    email: email,
    city: city,
    state: state,
    country: country,
    phone: phone,
    phone2: phone2,
    address: address,
    titulo: title,
    speciality,
    institucion: institution,
    date_inicioEstudio: studyStart,
    date_finicioEstudio: studyEnd,
    cvu: cvu,
  };

  return (
    <Formik>
      <div className="dataUserIdConteiner">
        <br />
        <br />
        <br />
        <br />
        <br />
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
  );
};

export default DataEdition;
