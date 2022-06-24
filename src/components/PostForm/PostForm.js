import { React, useState, useEffect } from "react";
import "./PostForm.css";
import jwt from "jsonwebtoken";

import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  GetCitiesByState,
  getCountry,
  GetStatebyCountry,
  postUser,
} from "../../redux/action";

const PostForm = () => {
  //los hooks

  const country = useSelector((state) => state.country);
  const region = useSelector((state) => state.states);
  const city = useSelector((state) => state.cities);
  const dispatch = useDispatch();

  //Input values
  const [user, setUser] = useState({
    date_post: "",
    hour_post: "",
    date_ini: "",
    date_fin: "",
    needs: "",
    locationReference: "",
    contact_phone: "",
    id_users: jwt.decode(localStorage?.getItem("session"))?.id,
    state: "",
    city: "",
    country: "",
    specialtyPatient: "",
    agePatient: "",
    namePatient: "",
    availableTime_0: "",
    availableTime_1: "",
    addressPatient: "",
    active: true,
  });

  function cancelar() {
    //reseteo
    setUser({
      date_post: "",
      hour_post: "",
      date_ini: "",
      date_fin: "",
      needs: "",
      locationReference: "",
      contact_phone: "",
      id_users: 1,
      state: "",
      city: "",
      country: "",
      specialtyPatient: "",
      agePatient: "",
      namePatient: "",
      availableTime_0: "",
      availableTime_1: "",
      addressPatient: "",
    });
  }

  function changeDate(e) {
    /*const date = new Date()
  const actualDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  const actualHour = date.toLocaleTimeString()
  setUser({ ...user, date_post: actualDate, hour_post: actualHour })*/
    console.log(e);
  }
  function inputNombre(e) {
    console.log(e.target.value);
    e.preventDefault();
    let nombre = e.target.value;
    let cambio = nombre[0].toUpperCase() + nombre.slice(1);
    setUser({
      ...user,
      namePatient: cambio,
    });
  }
  /*
function changeName(namePatient){
  console.log(namePatient)
  setUser({...user, id_users:1})
  setUser({...user, namePatient})
}*/

  function onInputChange(e) {
    console.log(e.target.value);
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function onCountry(e) {
    setUser({
      ...user,
      country: e.target.value,
    });
    console.log(e.target.value);
    dispatch(GetStatebyCountry(e.target.value));
  }
  /* dispatch(GetStatebyCountry("Colombia"));*/

  function onCity(e) {
    setUser({
      ...user,
      city: e.target.value,
    });
  }
  function onState(e) {
    setUser({
      ...user,
      state: e.target.value,
    });
    dispatch(GetCitiesByState(e.target.value));
  }

  async function onSubmit() {
    console.log(user);
    changeDate();
    if (!user.namePatient) alert("ingrese datos");
    else {
      try {
        await dispatch(postUser(user));
        alert("post creado");
      } catch (e) {
        console.log(e.response.data);
        // Alert.alert(Object.keys(e.response.data.errors[0])[0], Object.values(e.response.data.errors[0])[0])
      }
    }
  }
  useEffect(() => {
    dispatch(getCountry());
    changeDate();
  }, [dispatch]);

  return (
    <div className="containerPostForm">
      <div className="Colum1"></div>
      <div className="PostForm">
        <div className="contenPostForm">
          <h1 className="titleDescription">Crear Post</h1>
          <form className="formDescription">
            <div className="secUno">
              <div>
                <p>Nombre del Paciente</p>
                <input
                  onChange={(name) => onInputChange(name)}
                  name="namePatient"
                  type="text"
                  placeholder="Escribe aquí"
                />
              </div>
              <div>
                <p>Edad del Paciente</p>
                <input
                  onChange={(age) => onInputChange(age)}
                  type="number"
                  id="edad"
                  name="agePatient"
                  placeholder="De click en las flechas o Escribe"
                />
              </div>
            </div>
            <div className="secUno">
              <div>
                <p>Telefono del Contacto</p>
                <input
                  onChange={(contact_phone) => onInputChange(contact_phone)}
                  type="tel"
                  name="contact_phone"
                />
              </div>
              <div>
                <p>Dirección del paciente</p>
                <input
                  onChange={(addressPatient) => onInputChange(addressPatient)}
                  type="text"
                  name="addressPatient"
                />
              </div>
              <div>
                <p>Referencia Locacion </p>
                <textarea
                  onChange={(rl) => onInputChange(rl)}
                  id="msg"
                  name="locationReference"
                  placeholder="Escribe aquí"
                ></textarea>
              </div>
            </div>
            <div className="secUno">
              <div>
                <p>Fecha de Inicio</p>
                <input
                  type="date"
                  name="date_ini"
                  defaultValue={user.date_ini}
                  onChange={(date_ini) => onInputChange(date_ini)}
                />
              </div>
              <div>
                <p>Fecha de Terminado</p>
                <input
                  type="date"
                  name="date_fin"
                  defaultValue={user.date_fin}
                  onChange={(date_fin) => onInputChange(date_fin)}
                />
              </div>
            </div>
            <div className="secUno">
              <div>
                <p>Hora de Inicio</p>
                <input
                  type="time"
                  name="availableTime_0"
                  defaultValue={user.availableTime_0}
                  onChange={(availableTime_0) => onInputChange(availableTime_0)}
                />
              </div>
              <div>
                <p>Hora de Fin</p>
                <input
                  type="time"
                  name="availableTime_1"
                  defaultValue={user.availableTime_1}
                  onChange={(availableTime_1) => onInputChange(availableTime_1)}
                />
              </div>
            </div>
            <div className="secUno">
              <div>
                <p>Especialidades Necesitadas</p>
                <input
                  list="Especialidades"
                  defaultValue={user.specialtyPatient}
                  onChange={(specialtyPatient) =>
                    onInputChange(specialtyPatient)
                  }
                  name="specialtyPatient"
                  placeholder="Escribe aquí o selecciona uno"
                />
                <datalist id="Especialidades">
                  <option value="Acompañante Terapéutico">
                    Acompañante Terapéutico
                  </option>
                  <option value="Enfermería">Enfermería</option>
                  <option value="Kinesiología">Kinesiología</option>
                  <option value="Acompañante de Adulto Mayor">
                    Acompañante de Adulto Mayor
                  </option>
                  <option value="Aplicaciones">Aplicaciones</option>
                </datalist>
              </div>
            </div>
            <div className="secUno">
              <div>
                <p>Explique la necesidad</p>
                <textarea
                  onChange={(need) => onInputChange(need)}
                  id="msg"
                  name="needs"
                  placeholder="Escribe aquí"
                ></textarea>
              </div>
              <div>
                <h4 className="tituloOrden">paises</h4>
                <select
                  className="caja"
                  name="select"
                  onChange={(e) => {
                    onCountry(e);
                  }}
                >
                  {country.map((g) => (
                    <option key={g.id} value={g.name}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h4 className="tituloOrden">state</h4>
                <select
                  className="caja"
                  name="select"
                  onChange={(e) => onState(e)}
                >
                  {region?.map((g) => (
                    <option key={g.id} value={g.name}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h4 className="tituloOrden">Ciudad</h4>
                <select
                  className="caja"
                  name="select"
                  onChange={(e) => onCity(e)}
                >
                  {city[0]?.cities?.map((g) => (
                    <option key={g.id} value={g.name}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
          <div className="ButtonPostFrom">
            <button
              className="buttonOne buttonNavTwo"
              onClick={() => cancelar()}
            >
              Cancelar
            </button>
            <input
              className="buttonOne"
              type="submit"
              onClick={onSubmit}
              value="Crear"
            />
          </div>
        </div>
      </div>
      <div className="Colum1"></div>
    </div>
  );
};

export default PostForm;
