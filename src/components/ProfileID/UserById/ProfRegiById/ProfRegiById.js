import React from 'react'
import "./ProfRegiById.css"
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import * as Yup from "yup";

function ProfRegiById({idUsr}) {
    
    const initialValues = {
        nivelDeEstudio: "",
        titulo: "",
        institucion: "",
        date_inicioEstudio: "",
        date_finicioEstudio: "",
        cvu: "",
        userId: idUsr,
    };

    const dispatch = useDispatch();

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

    const onSubmit = (values, { resetForm }) => {
        //console.log(values);
        };

    return (
        <div className='formRegConteiner '>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>{(props) => {
        return (
            <Form>
                <div className='containerProfRegiById'>
                    <div className='containerTitleProfRegiById'>
                        <h2 className='nameUserById'>Registra Tus Datos <h2 className='nameUserById nameUserByIdSecond'>Profesionales</h2></h2>
                    </div>
                    <div className='containerSubProfRegiById'>
                        <div className='containerProfRegiByIdLeft'>
                            <label className="titleProfRegiById">Nivel Educativo *</label>
                            <Field className="inputsProfRegiById" id="nivelDeEstudio" name="nivelDeEstudio" type="text"/>
                            <ErrorMessage render={(msg) => <div className="error-prof">{msg}</div>} name="nivelDeEstudio"/>
                            <label className="titleProfRegiById">Titulo *</label>
                            <Field className="inputsProfRegiById" id="titulo" name="titulo" type="text"/>
                            <ErrorMessage render={(msg) => <div className="error-prof">{msg}</div>}name="titulo"/>
                            <label className="titleProfRegiById">Fecha de Inicio *</label>
                            <Field className="inputsProfRegiById" id="date_inicioEstudio" name="date_inicioEstudio" type="date"/>
                            <ErrorMessage render={(msg) => <div className="error-prof">{msg}</div>} name="date_inicioEstudio"/>
                            
                        </div> 
                        <div className='containerProfRegiByIdRight'>
                            <label className="titleProfRegiById">Institucion Educativa *</label>
                            <Field className="inputsProfRegiById" id="institucion" name="institucion" type="text"/>
                            <ErrorMessage className='errRegProf' render={(msg) => <div className="error-prof">{msg}</div>} name="institucion"/>
                            <label className="titleProfRegiById">Tarjeta profesional *</label>
                            <Field className="inputsProfRegiById" id="cvu" name="cvu" type="text"/>
                            <ErrorMessage render={(msg) => <div className="error-prof">{msg}</div>} name="cvu"/>
                            <label className="titleProfRegiById">Fecha de Finalizacion *</label>
                            <Field className="inputsProfRegiById" id="date_finicioEstudio" name="date_finicioEstudio" type="date"/>
                            <ErrorMessage render={(msg) => <div className="error-prof">{msg}</div>} name="date_finicioEstudio"/>
                        </div> 
                    </div>
                    <div className='containerTitleProfRegiById'>
                        <button className="buttonOne" type="submit">Registrate</button>
                    </div>
                </div>
            </Form>
        );
        }}
            </Formik>
        </div>
    )
}

export default ProfRegiById
