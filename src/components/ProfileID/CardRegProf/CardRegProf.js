import React from 'react'
import "./CardRegProf.css"
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import * as Yup from "yup";

const CardRegProf = ({idUs}) => {
//Input values
    const initialValues = {
        nivelDeEstudio: "",
        titulo: "",
        institucion: "",
        date_inicioEstudio: "",
        date_finicioEstudio: "",
        cvu: "",
        userId: idUs,
    };
//console.log(idUs)
    //Hooks for Redux
    const dispatch = useDispatch();

    //Validation using Yup
    const validationSchema = Yup.object({
        nivelDeEstudio: Yup.string()
            .required("Es necesario llenar este campo")
            .trim("Elimine los espacios en blanco"),
        titulo: Yup.string()
            .required("Es necesario llenar este campo")
            .trim("Elimine los espacios en blanco"),
        institucion: Yup.string()
            .required("Es necesario llenar este campo")
            .trim("Elimine los espacios en blanco"),
        date_inicioEstudio: Yup.string()
            .required("Es necesario llenar este campo"),
        date_finicioEstudio: Yup.string()
            .required("Es necesario llenar este campo"),
        cvu: Yup.string()
            .required("Es necesario llenar este campo")
            .trim("Elimine los espacios en blanco"),
        userId: Yup.number().required("Es necesario llenar este campo"),
    });

    //Handlers
    const onSubmit = (values, { resetForm }) => {
    //console.log(values);
    };

  return (
    <div className='formRegConteiner '>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => {
          return (
            <Form>
                <div className='formRegConteiner'>
                    <div className='formProfContainerLeft'>
                        <div className="prof-spaces">
                            <label className="TitleDataUser tiRegProf">Nivel Educativo *</label>
                            <Field className="profInputs" id="nivelDeEstudio" name="nivelDeEstudio" type="text"/>
                            <ErrorMessage render={(msg) => <div className="error-prof">{msg}</div>} name="nivelDeEstudio"/>
                        </div>
                        <div className="prof-spaces">
                            <label className="TitleDataUser tiRegProf">Institucion Educativa *</label>
                            <Field className="profInputs" id="institucion" name="institucion" type="text"/>
                            <ErrorMessage className='errRegProf' render={(msg) => <div className="error-prof">{msg}</div>} name="institucion"/>
                        </div>
                        <div className="prof-spaces">
                            <label className="TitleDataUser tiRegProf">Titulo *</label>
                            <Field className="profInputs" id="titulo" name="titulo" type="text"/>
                            {/* <button className="principalButton">Añadir Capacitación</button>
                            <ul>
                                <li>a</li>
                                <li>a</li>
                            </ul> */}
                            <ErrorMessage render={(msg) => <div className="error-prof">{msg}</div>}name="titulo"/>
                        </div>
                    </div>
                
                    <div className='formProfContainerRight'>
                        <div className="prof-spaces">
                            <label className="TitleDataUser tiRegProf">Fecha de Inicio *</label>
                            <Field className="profInputs" id="date_inicioEstudio" name="date_inicioEstudio" type="date"/>
                            <ErrorMessage render={(msg) => <div className="error-prof">{msg}</div>} name="date_inicioEstudio"/>
                        </div>
                        <div className="prof-spaces">
                            <label className="TitleDataUser tiRegProf">Fecha de Finalizacion *</label>
                            <Field className="profInputs" id="date_finicioEstudio" name="date_finicioEstudio" type="date"/>
                            <ErrorMessage render={(msg) => <div className="error-prof">{msg}</div>} name="date_finicioEstudio"/>
                        </div>
                        <div className="prof-spaces">
                            <label className="TitleDataUser tiRegProf">Tarjeta profesional *</label>
                            <Field className="profInputs" id="cvu" name="cvu" type="text"/>
                            <ErrorMessage render={(msg) => <div className="error-prof">{msg}</div>} name="cvu"/>
                        </div>

                    </div>
                </div>
                <div className="sign-button">
                    <button className="buttonOne principalButton" type="submit">Registra Datos Profesionales</button>
                </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  )
}

export default CardRegProf
