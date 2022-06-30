import { React, useEffect } from "react";
import "./PostForm.css";
import jwt from "jsonwebtoken";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCitiesByState,
  getCountry,
  getSpecialties,
  GetStatebyCountry,
  postUser,
} from "../../redux/action.js";
import * as Yup from "yup";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const PostForm = () => {
  const id = jwt.decode(localStorage?.getItem("session"))?.id;
  //Hooks states
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);
  const region = useSelector((state) => state.states);
  const city = useSelector((state) => state.cities);
  const specialty = useSelector((state) => state.specialties);
  const postInfo = useSelector((state) => state.postRegister);

  // Actual Time and Date
  let date = new Date();
  const actualDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  const actualHour = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  //Input values
  const initialValues = {
    date_post: `${actualDate}`,
    hour_post: `${actualHour}`,
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
    availableTime_0: 0,
    availableTime_1: 0,
    addressPatient: "",
    active: true,
  };
  const validationSchema = Yup.object({
    date_ini: Yup.string().required("Es necesario llenar este campo"),
    date_fin: Yup.string().required("Es necesario llenar este campo"),
    needs: Yup.string().required("Es necesario llenar este campo"),
    locationReference: Yup.string().required("Es necesario llenar este campo"),
    contact_phone: Yup.string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "El número no es válido."
      )
      .required("Es necesario llenar este campo.")
      .trim("Elimine los espacios"),
    state: Yup.string().required("Es necesario llenar este campo"),
    city: Yup.string().required("Es necesario llenar este campo"),
    country: Yup.string().required("Es necesario llenar este campo"),
    specialtyPatient: Yup.string().required("Es necesario llenar este campo"),
    agePatient: Yup.number().required("Es necesario llenar este campo"),
    namePatient: Yup.string().required("Es necesario llenar este campo"),
    availableTime_0: Yup.number().required("Es necesario llenar este campo"),
    availableTime_1: Yup.number().required("Es necesario llenar este campo"),
    addressPatient: Yup.string().required("Es necesario llenar este campo"),
  });

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getSpecialties());
  }, [dispatch]);

  //Handlers
  const onSubmit = (values, { resetForm }) => {
    dispatch(postUser(values));
    resetForm();
  };

  const onCancel = ({ resetForm }) => {
    // dispatch(postUser(values));

    resetForm();
  };

  //Alerts to know if successful post
  const onClick = () => {
    if (Object.keys(postInfo).length !== 0) {
      swal({
        title: postInfo,
        text: "Continue usando ClickCare.",
      }).then(
        () =>
          (window.location = "https://deploy-click-care.vercel.app/user/:id")
      );
    }
  };
  onClick();

  return (
    <div className="containerCreatePostForm">
      <Link to={`/user/${id}`}>
        <button className="buttonOne posBottonVolver">Volver</button>
      </Link>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => {
          const { values, setFieldValue } = props;
          return (
            <div className="PostForm">
              <div className="contenPostForm">
                <h1 className="titleDescription">Crear Post</h1>
                <Form className="formDescription">
                  <div className="secUno">
                    <div>
                      <label>Nombre del Paciente</label>
                      <Field
                        className="profInput"
                        id="namePatient"
                        name="namePatient"
                        type="text"
                        placeholder="Escribe aquí"
                      />
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="namePatient"
                      />
                    </div>
                    <div>
                      <label>Edad del Paciente</label>
                      <Field
                        className="profInput"
                        type="number"
                        id="agePatient"
                        name="agePatient"
                        placeholder="De click en las flechas o Escribe"
                      />
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="agePatient"
                      />
                    </div>
                  </div>
                  <div className="secUno">
                    <div>
                      <label>Telefono del Contacto</label>
                      <Field
                        className="profInput"
                        id="contact_phone"
                        type="tel"
                        name="contact_phone"
                      />
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="contact_phone"
                      />
                    </div>
                    <div>
                      <label>Dirección del paciente</label>
                      <Field
                        className="profInput"
                        id="addressPatient"
                        type="text"
                        name="addressPatient"
                      />
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="addressPatient"
                      />
                    </div>
                    <div>
                      <label>Referencia Locacion </label>
                      <Field
                        className="textArea"
                        as="textarea"
                        id="locationReference"
                        name="locationReference"
                        placeholder="Escribe aquí"
                      />
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="locationReference"
                      />
                    </div>
                  </div>
                  <div className="secUno">
                    <div>
                      <label>Fecha de Inicio</label>
                      <Field
                        type="date"
                        id="date_ini"
                        className="profInput"
                        name="date_ini"
                      />
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="date_ini"
                      />
                    </div>
                    <div>
                      <label>Fecha de Terminado</label>
                      <Field
                        className="profInput"
                        type="date"
                        id="date_fin"
                        name="date_fin"
                      />
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="date_ini"
                      />
                    </div>
                  </div>
                  <div className="secUno">
                    <div>
                      <label>Hora de Inicio</label>
                      <Field
                        className="profInput"
                        type="number"
                        id="availableTime_0"
                        name="availableTime_0"
                      />
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="availableTime_0"
                      />
                    </div>
                    <div>
                      <label>Hora de Fin</label>
                      <Field
                        className="profInput"
                        type="number"
                        id="availableTime_1"
                        name="availableTime_1"
                      />
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="availableTime_1"
                      />
                    </div>
                  </div>
                  <div className="secUno">
                    <div>
                      <label>Especialidades Necesitadas</label>
                      <Field
                        className="profInput"
                        as="select"
                        name="specialtyPatient"
                        id="specialtyPatient"
                        value={values.specialtyPatient}
                      >
                        <option value="" key="specialtyPatient">
                          Selecciona la Especialidad
                        </option>
                        {specialty?.map((e) => (
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
                  </div>
                  <div className="secUno">
                    <div>
                      <label>Explique la necesidad</label>
                      <Field
                        className="textArea"
                        as="textarea"
                        id="needs"
                        name="needs"
                        placeholder="Escribe aquí"
                      />
                    </div>
                    <div>
                      <label>País</label>
                      <Field
                        className="profInput"
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
                  </div>
                  <div className="secUno">
                    <div>
                      <label>Estado</label>
                      <Field
                        className="profInput"
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
                        {region?.map((state) => (
                          <option value={state.id} key={state.id}>
                            {state.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        render={(msg) => <div className="error">{msg}</div>}
                        name="state"
                      />
                    </div>
                    <div>
                      <label>Ciudad</label>
                      <Field
                        className="profInput"
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
                        {city[0]?.cities?.map((city) => (
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
                  <div className="sign-button">
                    <button
                      className="buttonOne buttonNavTwo"
                      onSubmit={onCancel}
                    >
                      Cancelar
                    </button>
                    <button
                      className="buttonOne buttonCreate"
                      type="submit"
                      onSubmit={onSubmit}
                    >
                      Crea tu post
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default PostForm;
