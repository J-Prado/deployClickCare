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

        {verificOne === 1 ? (
          <div>
            <div className="containerTextDataUser">
              <label className="TitleDataUser">Nivel Educativo</label>
              <label className="TitleDataUser">Institucion Educativa</label>
              <label className="TitleDataUser">Titulo</label>
            </div>
            <div className="containerTextDataUser">
              <Field
                className="sign-inputs"
                id="name"
                name="name"
                type="text"
                placeholder="Nombre"
              />
              <Field
                className="sign-inputs"
                id="name"
                name="name"
                type="text"
                placeholder="Nombre"
              />
              <Field
                className="sign-inputs"
                id="name"
                name="name"
                type="text"
                placeholder="Nombre"
              />
              <h3 className="infoDataUser">{speciality}</h3>
              <h3 className="infoDataUser">{institution}</h3>
              <h3 className="infoDataUser">{title}</h3>
            </div>
            <div className="containerTextDataUser">
              <h3 className="TitleDataUser">Fecha de Inicio</h3>
              <h3 className="TitleDataUser">Fecha de Finalizacion</h3>
              <h3 className="TitleDataUser">Tarjeta profesional</h3>
            </div>
            <div className="containerTextDataUser">
              <h3 className="infoDataUser">
                {studyStart ? studyintial : null}
              </h3>
              <h3 className="infoDataUser">{studyEnd ? studyedn : null}</h3>
              <h3 className="infoDataUser">{cvu}</h3>
            </div>
          </div>
        ) : null}

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
