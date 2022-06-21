import React, { useEffect } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import "./createPost.css";
import {
  clear,
  GetCitiesByState,
  getCountry,
  GetStatebyCountry,
  getSpecialties,
  postRegister,
} from "../../redux/action.js";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import swal from "sweetalert";

export default function CreatePost() {
  const [cookies, setCookie] = useCookies();

  let date = new Date();
  let output =
    date.getFullYear() +
    "/" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(date.getDate()).padStart(2, "0");

  //Hooks
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);
  const states = useSelector((state) => state.states);
  const cities = useSelector((state) => state.cities);
  const specialties = useSelector((state) => state.specialties);
  const postInfo = useSelector((state) => state.postRegister);
  const arraySpec = specialties.map((e) => e);
  // console.log("soy el arrayspec", arraySpec);

  //Formik Initial Values
  const initialValues = {
    id_users: `${cookies?.SessionUserClickCare?.userId}`,
    date_post: `${output}`,
    hour_post: "",
    date_ini: "",
    date_fin: "",
    needs: "",
    locationReference: "",
    contact_phone: "",
    city: "",
    state: "",
    country: "",
    specialtyPatient: "",
    agePatient: "",
    namePatient: "",
    availableTime_0: "",
    availableTime_1: "",
    addressPatient: "",
  };

  //ValidationSchema
  const validationSchema = Yup.object({
    date_post: Yup.string().required("Es necesario llenar este campo"),
    hour_post: Yup.string().required("Es necesario llenar este campo"),
    date_ini: Yup.string().required("Es necesario llenar este campo"),
    date_fin: Yup.string().required("Es necesario llenar este campo"),
    needs: Yup.string().required("Es necesario llenar este campo"),
    locationReference: Yup.string().required("Es necesario llenar este campo"),
    contact_phone: Yup.number().required("Es necesario llenar este campo"),
    city: Yup.string().required("Es necesario llenar este campo"),
    state: Yup.string().required("Es necesario llenar este campo"),
    country: Yup.string().required("Es necesario llenar este campo"),
    specialtyPatient: Yup.string().required("Es necesario llenar este campo"),
    agePatient: Yup.number().required("Es necesario llenar este campo"),
    namePatient: Yup.string().required("Es necesario llenar este campo"),
    availableTime_0: Yup.string().required("Es necesario llenar este campo"),
    availableTime_1: Yup.string().required("Es necesario llenar este campo"),
    addressPatient: Yup.string().required("Es necesario llenar este campo"),
  });

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getSpecialties());
  }, [dispatch]);

  const onSubmit = (values, { resetForm }) => {
    dispatch(postRegister(values));
    resetForm();
  };

  const onClick = () => {
    if (postInfo.message === "Existing Post") {
      swal({
        title: postInfo.message,
        text: "Usted ya ha creado un post como este",
      });
      dispatch(clear());
    } else if (postInfo.message === "Post created") {
      swal({
        title: postInfo.message,
        text: "Su post a sido creado con exito",
      }).then(() => {
        window.location = "http://localhost:3000/offer";
      });
      dispatch(clear());
    }
  };
  onClick();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(props) => {
        const { values, setFieldValue } = props;
        return (
          <Form>
            <div className="conteinerForm">
              <div> formulario de creacion de post</div>

              <div className="Hour">
                <label>Horario del trabajo</label>
                <Field
                  className="sign-inputs"
                  id="hour_post"
                  name="hour_post"
                  type="time"
                  placeholder="Nombre"
                />
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="hour_post"
                />
              </div>
              <div className="dateInit">
                <label>Fecha de inicio:</label>
                <Field
                  className="sign-inputs"
                  id="date_ini"
                  name="date_ini"
                  type="date"
                  placeholder="Nombre"
                />
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="date_ini"
                />
              </div>
              <div className="dateFinish">
                <label>Fecha de Finalizacion:</label>
                <Field
                  className="sign-inputs"
                  id="date_fin"
                  name="date_fin"
                  type="date"
                  placeholder="Nombre"
                />
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="date_fin"
                />
              </div>
              <div className="Needs">
                <label>Detalles de la atencion</label>
                <Field
                  className="sign-inputs"
                  id="needs"
                  name="needs"
                  type="text"
                  placeholder="Informacion"
                />
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="needs"
                />
              </div>
              <div className="location Reference">
                <label>Direccion del paciente</label>
                <Field
                  className="sign-inputs"
                  id="addressPatient"
                  name="addressPatient"
                  type="text"
                  placeholder="Direccion del paciente"
                />
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="addressPatient"
                />
              </div>
              <div className="location Reference">
                <label>Datos adicionales de ubicacion</label>
                <Field
                  className="sign-inputs"
                  id="locationReference"
                  name="locationReference"
                  type="text"
                  placeholder="Informacion de la ubicacion"
                />
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="locationReference"
                />
              </div>
              <div className="contactNumber">
                <label>Numero de contacto</label>
                <Field
                  className="sign-inputs"
                  id="contact_phone"
                  name="contact_phone"
                  type="number"
                />
                <ErrorMessage
                  render={(msg) => <div className="error">{msg}</div>}
                  name="contact_phone"
                />
              </div>
              <div className="country">
                <label>País:</label>
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
              <div className="state">
                <label>Estado:</label>
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
                <div className="city">
                  <label>Ciudad:</label>
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
                  <div className="namePatient">
                    <label>Nombre Del Paciente</label>
                    <Field
                      className="sign-inputs"
                      id="namePatient"
                      name="namePatient"
                      type="text"
                      placeholder="Nombre"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="namePatient"
                    />
                  </div>
                  <div className="agePatient">
                    <label>Edad del paciente</label>
                    <Field
                      className="sign-inputs"
                      id="agePatient"
                      name="agePatient"
                      type="text"
                      placeholder="edad"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="agePatient"
                    />
                  </div>
                  <div className="patienteName">
                    <label>Avalailable time 0</label>
                    <Field
                      className="sign-inputs"
                      id="availableTime_0"
                      name="availableTime_0"
                      type="text"
                      placeholder="time"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="availableTime_0"
                    />
                  </div>
                  <div className="patienteName">
                    <label>Avalailable time 1</label>
                    <Field
                      className="sign-inputs"
                      id="availableTime_1"
                      name="availableTime_1"
                      type="text"
                      placeholder="time"
                    />
                    <ErrorMessage
                      render={(msg) => <div className="error">{msg}</div>}
                      name="availableTime_1"
                    />
                  </div>

                  <label>Especialidad de la atencion:</label>
                  <Field
                    className="sign-inputs"
                    as="select"
                    name="specialtyPatient"
                    id="specialtyPatient"
                    value={values.specialtyPatient}
                  >
                    <option value="" key="specialtyPatient">
                      Selecciona la especialidad.
                    </option>
                    {specialties?.map((e) => (
                      <option value={e.specialty} key={e.id}>
                        {e.specialty}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    render={(msg) => <div className="error">{msg}</div>}
                    name="specialtyPatient"
                  />
                </div>
                <div className="sign-button">
                  <button
                    className="buttonOne principalButton"
                    type="submit"
                    onSubmit={onSubmit}
                  >
                    Registra tu post
                  </button>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
