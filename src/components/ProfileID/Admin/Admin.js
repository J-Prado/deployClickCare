//npm install @mui/x-data-grid

//npm install mui-datatables --save
import React, { useEffect, useMemo, useState } from "react";
import "./Admin.css";
import { DataGrid, GridToolbar, CustomToolbar } from "@mui/x-data-grid";

//CONTENIDOS
import {
  getTableUsers,
  getTableProfs,
  getTablePosteos,
  getTableAplicaciones,
  getTableContracts,
  cancelUser,
  activateUser,
  makeUserAdmin,
  makeUserUsuario,
  getUserDetail,
  activateProfessional,
  desactivateProf,
  activateMember,
  cancelMember,
  validateEmailUser,
  cancelateEmailUser,
  getKpi,
  activatePost,
  cancelPost,
} from "../../../redux/action.js";
import { useDispatch, useSelector } from "react-redux";
import * as dpd from "./datagridProcessData.js";
import swal from "sweetalert";
import jwt from "jsonwebtoken";

export default function Admin() {
  const initialValues = {
    data: [],
    columns: [],
  };

  const [info, setInfo] = useState(initialValues);
  const [table, setTable] = useState("");
  const [kpi, setKpi] = useState("");
  const [Prof, setProf] = useState("");
  // const [infoRowSelected, setInfoRowSelected] = useState("");
  // const [idSelected, setidSelected] = useState("");

  let infoRowSelected = "";
  let idSelected = "";
  const detailUser = useSelector((state) => state.userDetail);

  // let idSelected = "";
  // let rowSelected = "";

  const dispatch = useDispatch();

  // const reference = useMemo(() => {
  //   return jwt.decode(localStorage.getItem("session")) ;
  // }, [userId]);

  useEffect(() => {
    if (!Prof) {
      setProf(jwt.decode(localStorage.getItem("session")));
    }
    if (Prof) {
      dispatch(getUserDetail(Number(Prof.id)));
      console.log("useEffect Prof", Prof);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getKpi()).then((resp) => {
      setKpi(resp.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTableUsers()).then((resp) => {
      const trabajado = resp.payload.map((e) => {
        return {
          id: e.id,
          name: e.name,
          surname: e.surname,
          phone: e.phone,
          address: e.address,
          age: e.age,
          document: e.document,
          estado: e.active,
          email: e.email,
          phone2: e.phone2,
          google_user: e.google_user,
          validated_email: e.validated_email,
          photo: e.photo,
          userType: e.userType,
          city: e.city.name,
          state: e.state.name,
          country: e.country.name,
        };
      });
      setInfo(dpd.objForDataGrid(trabajado));
    });
    setTable("Usuarios");
  }, []);

  //CAPTURA DATOS DEL DATAGRID
  function handleRowClick(e) {
    console.log(e);
    infoRowSelected = e.row;
    console.log("ROWSELECTED-->>", infoRowSelected);
    idSelected = e.row.id;
  }

  function bringUsers() {
    dispatch(getTableUsers()).then((resp) => {
      const trabajado = resp.payload.map((e) => {
        return {
          id: e.id,
          name: e.name,
          surname: e.surname,
          phone: e.phone,
          address: e.address,
          age: e.age,
          document: e.document,
          estado: e.active,
          email: e.email,
          phone2: e.phone2,
          google_user: e.google_user,
          validated_email: e.validated_email,
          photo: e.photo,
          userType: e.userType,
          city: e.city.name,
          state: e.state.name,
          country: e.country.name,
        };
      });
      setInfo(dpd.objForDataGrid(trabajado));
    });
    idSelected = "";
    setTable("Usuarios");
  }
  function bringProfes() {
    dispatch(getTableProfs()).then((resp) => {
      console.log(resp.payload);
      const trabajado = resp.payload.map((e) => {
        return {
          id: e.id,
          name: e.user.name,
          surname: e.user.surname,
          tuition: e.tuition,
          trainings: e.trainings,
          active: e.active,
          photo: e.photo,
          Membership: e.balance,
          nivelDeEstudios: e.nivelDeEstudio,
          institucion: e.institucion,
          titulo: e.titulo,
          date_inicioEstudio: e.date_inicioEstudio,
          date_finicioEstudio: e.date_finicioEstudio,
          fecha_nacimiento: e.fecha_nacimiento,
          userId: e.userId,
        };
      });
      setInfo(dpd.objForDataGrid(trabajado));
    });
    idSelected = "";
    setTable("Profesionales");
  }
  function bringPosteos() {
    dispatch(getTablePosteos()).then((resp) => {
      const trabajado = resp.payload.map((e) => {
        return {
          id: e.id,
          active: e.active,
          hour_post: e.hour_post,
          date_post: e.date_post,
          date_ini: e.date_ini,
          date_fin: e.date_fin,
          needs: e.needs,
          Hora_desde: e.availableTime_0,
          Hora_hasta: e.availableTime_1,
          agePatient: e.agePatient,
          namePatient: e.namePatient,
          addressPatient: e.addressPatient,

          user_id: e.user.id,
          user_name: e.user.name,
          user_surname: e.user.surname,
          user_age: e.user.age,
          specialty: e.specialty,
          city: e.city.name,
          state: e.state.name,
          country: e.country.name,
        };
      });
      setInfo(dpd.objForDataGrid(trabajado));
    });
    idSelected = "";
    setTable("Posteos");
  }
  function bringAuctions() {
    dispatch(getTableAplicaciones()).then((resp) => {
      const trabajado = resp.payload.map((e) => {
        return {
          id: e.id,
          date: e.date,
          offer: e.offer,
          comment: e.comment,
          date_post: e.post.date_post,
          date_ini: e.post.date_ini,
          date_fin: e.post.date_fin,
          needs: e.post.needs,
          locationReference: e.post.locationReference,
          availableTime_0: e.post.availableTime_0,
          availableTime_1: e.post.availableTime_1,
          agePatient: e.post.agePatient,
          namePatient: e.post.namePatient,
          addressPatient: e.post.addressPatient,
          city: e.post.city.name,
          state: e.post.state.name,
          country: e.post.country.name,
          professionalId: e.professional.id,
          tuition: e.professional.tuition,
          trainings: e.professional.trainings,
          active: e.professional.active,
          photo: e.professional.photo,
          cvu: e.professional.cvu,
          miembro: e.professional.balance,
          nivelDeEstudio: e.professional.nivelDeEstudio,
          institucion: e.professional.institucion,
          titulo: e.professional.titulo,
          date_inicioEstudio: e.professional.date_inicioEstudio,
          date_finicioEstudio: e.professional.date_finicioEstudio,
          fecha_nacimiento: e.professional.fecha_nacimiento,
          userId: e.professional.userId,
        };
      });
      setInfo(dpd.objForDataGrid(trabajado));
    });
    idSelected = "";
    setTable("Aplicaciones");
  }
  function bringContracts() {
    dispatch(getTableContracts()).then((resp) => {
      const trabajado = resp.payload.map((e) => {
        return {
          id: e.id,
          price: e.price,
          date: e.date,
          hour: e.hour,
          postId: e.postId,
          auction_Id: e.auction.id,
          offer: e.auction.offer,
          comment: e.auction.comment,
          approved: e.auction.approved,
          date_post: e.auction.post.date_post,
          date_ini: e.auction.post.date_ini,
          date_fin: e.auction.post.date_fin,
          needs: e.auction.post.needs,
          active: e.auction.post.active,
          locationReference: e.auction.post.locationReference,
          contact_phone: e.auction.post.contact_phone,
          agePatient: e.auction.post.agePatient,
          namePatient: e.auction.post.namePatient,
          addressPatient: e.auction.post.addressPatient,
          city: e.auction.post.city.name,
          state: e.auction.post.state.name,
          country: e.auction.post.country.name,
          user_name: e.auction.post.user.name,
          user_surname: e.auction.post.user.surname,
          user_email: e.auction.post.user.email,
          user_phone: e.auction.post.user.phone,
          user_photo: e.auction.post.user.photo,
          professional_cvu: e.auction.professional.cvu,
          professional_name: e.auction.professional.user.name,
          professional_surname: e.auction.professional.user.surname,
          professional_phone: e.auction.professional.user.phone,
          professional_age: e.auction.professional.user.age,
          professional_document: e.auction.professional.user.document,
          professional_email: e.auction.professional.user.email,
          professional_photo: e.auction.professional.user.photo,
          professional_city: e.auction.professional.user.city.name,
          professional_state: e.auction.professional.user.state.name,
          professional_country: e.auction.professional.user.country.name,
        };
      });
      setInfo(dpd.objForDataGrid(trabajado));
    });
    idSelected = "";
    setTable("Contratos");
  }
  //AVISOS
  function AvisarForbinden(title) {
    swal({
      title: title,
      text: "Un Admin no puede alterarse a si mismo",
    });
  }
  function AvisarElijaRegistro(title) {
    swal({
      title: title,
      text: `POR FAVOR SELECCIONE UN REGISTRO`,
    });
  }
  //USUARIOS
  function activarUser() {
    const title = "ACTIVACION DE USUARIO";

    if (detailUser[0].id && detailUser[0].id !== idSelected) {
      if (infoRowSelected) {
        swal({
          title: title,
          text: `¿Desea Activar al Usuario ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname}?`,
          buttons: {
            cancel: true,
            confirm: true,
          },
        }).then((resp) => {
          // console.log("SWAL", resp);
          if (resp) {
            //IFs que despachan accion -->> FUNCION(tabla,id)
            dispatch(activateUser(idSelected)).then(() => {
              bringUsers();
            });
          }
        });
      } else {
        AvisarElijaRegistro(title);
      }
    } else {
      AvisarForbinden(title);
    }
  }
  function desactivarUser() {
    const title = "DESACTIVACIÓN DE USUARIO";
    console.log("desactivarUser", detailUser[0].id, idSelected);
    if (detailUser[0].id && detailUser[0].id !== idSelected) {
      if (infoRowSelected) {
        swal({
          title: title,
          text: `Desea desactivar al Usuario ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname}`,
          buttons: {
            cancel: true,
            confirm: true,
          },
        }).then((resp) => {
          // console.log("SWAL", resp);
          if (resp) {
            //IFs que despachan accion -->> FUNCION(tabla,id)
            dispatch(cancelUser(idSelected)).then(() => {
              bringUsers();
            });
          }
        });
      } else {
        AvisarElijaRegistro(title);
      }
    } else {
      AvisarForbinden(title);
    }
  }
  function changeToAdmin() {
    const title = "NOMBRAR ADMIN A USUARIO";
    if (detailUser[0].id && detailUser[0].id !== idSelected) {
      if (infoRowSelected) {
        swal({
          title: title,
          text: `¿Desea nombrar ADMIN al Usuario ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname}?`,
          buttons: {
            cancel: true,
            confirm: true,
          },
        }).then((resp) => {
          // console.log("SWAL", resp);
          if (resp) {
            //IFs que despachan accion -->> FUNCION(tabla,id)
            dispatch(makeUserAdmin(idSelected)).then((resp) => {
              // console.log(resp);
              if (
                resp.payload === "User administrador" &&
                resp.type === "MAKE_USER_ADMIN"
              ) {
                swal({
                  title: title,
                  text: `El Usuario ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname} tiene rol de ADMIN`,
                }).then(() => {
                  bringUsers();
                });
              }
            });
          }
        });
      } else {
        AvisarElijaRegistro(title);
      }
    } else {
      AvisarForbinden(title);
    }
  }
  function changeToUser() {
    const title = "NOMBRAR Usuario A USUARIO";
    if (detailUser[0].id && detailUser[0].id !== idSelected) {
      if (infoRowSelected) {
        swal({
          title: title,
          text: `¿Desea dar rol de Usuario al Usuario ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname}?`,
          buttons: {
            cancel: true,
            confirm: true,
          },
        }).then((resp) => {
          // console.log("SWAL", resp);
          if (resp) {
            //IFs que despachan accion -->> FUNCION(tabla,id)
            dispatch(makeUserUsuario(idSelected)).then((resp) => {
              console.log(resp);
              if (
                resp.payload === "User sin permisos" &&
                resp.type === "MAKE_USER_usuario"
              ) {
                swal({
                  title: title,
                  text: `El Usuario ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname} tiene rol de Usuario`,
                }).then(() => {
                  bringUsers();
                });
              }
            });
          }
        });
      } else {
        AvisarElijaRegistro(title);
      }
    } else {
      AvisarForbinden(title);
    }
  }
  function validateMail() {
    const title = "VALIDAR MAIL A USUARIO";
    if (infoRowSelected) {
      swal({
        title: title,
        text: `¿Desea validar mail al Usuario ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname}?`,
        buttons: {
          cancel: true,
          confirm: true,
        },
      }).then((resp) => {
        // console.log("SWAL", resp);
        if (resp) {
          //IFs que despachan accion -->> FUNCION(tabla,id)
          dispatch(validateEmailUser(idSelected)).then((resp) => {
            console.log(resp);
            if (
              resp.payload === "User validated Email" &&
              resp.type === "EMAIL_VALIDATION"
            ) {
              swal({
                title: title,
                text: `Se ha validado Email al usuario ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname}`,
              }).then(() => {
                bringUsers();
              });
            }
          });
        }
      });
    } else {
      AvisarElijaRegistro(title);
    }
  }
  function invalidateMail() {
    const title = "INVALIDAR MAIL A USUARIO";
    if (infoRowSelected) {
      swal({
        title: title,
        text: `¿Desea invalidar mail al Usuario ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname}?`,
        buttons: {
          cancel: true,
          confirm: true,
        },
      }).then((resp) => {
        // console.log("SWAL", resp);
        if (resp) {
          //IFs que despachan accion -->> FUNCION(tabla,id)
          dispatch(cancelateEmailUser(idSelected)).then((resp) => {
            console.log(resp);
            if (
              resp.payload === "User NO validated Email" &&
              resp.type === "EMAIL_CANCELATION"
            ) {
              swal({
                title: title,
                text: `Se ha invalidado el Email al usuario ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname}`,
              }).then(() => {
                bringUsers();
              });
            }
          });
        }
      });
    } else {
      AvisarElijaRegistro(title);
    }
  }
  //PROFESIONALES
  function activarProf() {
    const title = "ACTIVACION DE PROFESIONAL";
    if (infoRowSelected) {
      console.log(infoRowSelected);
      swal({
        title: title,
        text: `¿Desea Activar al Profesional ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname}?`,
        buttons: {
          cancel: true,
          confirm: true,
        },
      }).then((resp) => {
        // console.log("SWAL", resp);
        if (resp) {
          //IFs que despachan accion -->> FUNCION(tabla,id)
          dispatch(activateProfessional(idSelected)).then((resp) => {
            console.log(resp);
            if (
              resp.payload === "Professional actived" &&
              resp.type === "ACTIVATE_PROFESSIONAL"
            ) {
              swal({
                title: title,
                text: `El Profesional ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname} fue Activado`,
              }).then(() => {
                bringProfes();
              });
            }
          });
        }
      });
    } else {
      AvisarElijaRegistro(title);
    }
  }
  function desactivarProf() {
    const title = "DESACTIVACION DE PROFESIONAL";
    if (infoRowSelected) {
      swal({
        title: title,
        text: `¿Desea Desactivar al Profesional ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname}?`,
        buttons: {
          cancel: true,
          confirm: true,
        },
      }).then((resp) => {
        // console.log("SWAL", resp);
        if (resp) {
          //IFs que despachan accion -->> FUNCION(tabla,id)
          dispatch(desactivateProf(idSelected)).then((resp) => {
            console.log(resp);
            if (
              resp.payload === "Professional cancel" &&
              resp.type === "DESACTIVATE_PROFESSIONAL"
            ) {
              swal({
                title: title,
                text: `El Profesional ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname} fue Desactivado`,
              }).then(() => {
                bringProfes();
              });
            }
          });
        }
      });
    } else {
      AvisarElijaRegistro(title);
    }
  }
  function activateMembership() {
    const title = "ACTIVACION DE MEMBRESÍA";
    if (infoRowSelected) {
      swal({
        title: title,
        text: `¿Desea Activar Membresía al Profesional ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname}?`,
        buttons: {
          cancel: true,
          confirm: true,
        },
      }).then((resp) => {
        // console.log("SWAL", resp);
        if (resp) {
          //IFs que despachan accion -->> FUNCION(tabla,id)
          dispatch(activateMember(idSelected)).then((resp) => {
            console.log(resp);
            if (
              resp.payload === "Balance 1" &&
              resp.type === "ACTIVATE_MEMBERSHIP"
            ) {
              swal({
                title: title,
                text: `Se ha activado al Profesional ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname} su Membresía`,
              }).then(() => {
                bringProfes();
              });
            }
          });
        }
      });
    } else {
      AvisarElijaRegistro(title);
    }
  }
  function cancelmembership() {
    const title = "CANCELACIÓN DE MEMBRESÍA";
    if (infoRowSelected) {
      swal({
        title: title,
        text: `¿Desea Cancelar la Membresía al Profesional ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname}?`,
        buttons: {
          cancel: true,
          confirm: true,
        },
      }).then((resp) => {
        // console.log("SWAL", resp);
        if (resp) {
          //IFs que despachan accion -->> FUNCION(tabla,id)
          dispatch(cancelMember(idSelected)).then((resp) => {
            console.log(resp);
            if (
              resp.payload === "Balance 0" &&
              resp.type === "CANCEL_MEMBERSHIP"
            ) {
              swal({
                title: title,
                text: `Se ha cancelado al Profesional ${idSelected}-${infoRowSelected.name} ${infoRowSelected.surname} su Membresía`,
              }).then(() => {
                bringProfes();
              });
            }
          });
        }
      });
    } else {
      AvisarElijaRegistro(title);
    }
  }
  //POSTS

  function activarPOST() {
    const title = "ACTIVACION DE POST";
    if (infoRowSelected) {
      console.log(infoRowSelected);
      swal({
        title: title,
        text: `¿Desea Activar el Post ${idSelected}?`,
        buttons: {
          cancel: true,
          confirm: true,
        },
      }).then((resp) => {
        // console.log("SWAL", resp);
        if (resp) {
          //IFs que despachan accion -->> FUNCION(tabla,id)
          dispatch(activatePost(idSelected)).then((resp) => {
            console.log(resp);
            if (
              resp.payload === "Post active" &&
              resp.type === "ACTIVATE_POST"
            ) {
              swal({
                title: title,
                text: `El Post ${idSelected} fue Activado`,
              }).then(() => {
                bringPosteos();
              });
            }
          });
        }
      });
    } else {
      AvisarElijaRegistro(title);
    }
  }

  function cancelarPost() {
    const title = "DESACTIVACIÓN DE POST";
    if (infoRowSelected) {
      console.log(infoRowSelected);
      swal({
        title: title,
        text: `¿Desea Desactivar el Post ${idSelected}?`,
        buttons: {
          cancel: true,
          confirm: true,
        },
      }).then((resp) => {
        // console.log("SWAL", resp);
        if (resp) {
          //IFs que despachan accion -->> FUNCION(tabla,id)
          dispatch(cancelPost(idSelected)).then((resp) => {
            console.log(resp);
            if (resp.payload === "Post cancel" && resp.type === "CANCEL_POST") {
              swal({
                title: title,
                text: `El Post ${idSelected} fue Desactivado`,
              }).then(() => {
                bringPosteos();
              });
            }
          });
        }
      });
    } else {
      AvisarElijaRegistro(title);
    }
  }

  function goToSeeDetails(e) {
    console.log(e);
    let field = e.field;
    swal({
      title: "Detalle de Celda",
      text: `${e.row[field]}`,
    });
  }

  //RENDERIZADO
  return (
    <div className="divGeneral">
      <h1 className="divTabla">TABLERO DE ADMINISTRACIÓN</h1>
      {/* <h3 className="divTabla h3usuario">Id seleccionado:{idSelected}</h3> */}
      <div className="divIndicadores">
        <div className="divModuloIndicadores">
          <h2>Usuarios Activos: {kpi.usuarios}</h2>
          <h2>Profesionales Activos: {kpi.professionals}</h2>
          <h2>Cantidad Miembros: {kpi.members}</h2>
          <h2>
            Members:{" "}
            {((100 * Number(kpi.members)) / Number(kpi.professionals)).toFixed(
              0
            )}{" "}
            %
          </h2>
        </div>
        <div className="divModuloIndicadores">
          <h2>Posteos: {kpi.posts}</h2>
          <h2>Aplicaciones: {kpi.aplicaciones}</h2>
          <h2>
            Aplicacion/Posteo:{" "}
            {(Number(kpi.aplicaciones) / Number(kpi.posts)).toFixed(1)}
          </h2>
        </div>
        <div className="divModuloIndicadores">
          <h2>Contratos: {kpi.contractsactive}</h2>
          <h2>
            Promedio $/Contratos: $
            {(Number(kpi.priceactivo) / Number(kpi.contractsactive)).toFixed(0)}
          </h2>
          <h2>Sum $ Contratos: ${kpi.priceactivo}</h2>
        </div>
      </div>
      <br />
      <br />
      <button className="buttonOne posBottonVolver" onClick={bringUsers}>
        Usuarios
      </button>
      <button className="buttonOne posBottonVolver" onClick={bringProfes}>
        Profesionales
      </button>
      <button className="buttonOne posBottonVolver" onClick={bringPosteos}>
        Posteos
      </button>
      <button className="buttonOne posBottonVolver" onClick={bringAuctions}>
        Aplicaciones
      </button>
      <button className="buttonOne posBottonVolver" onClick={bringContracts}>
        Contratos
      </button>
      {table ? <h5 className="divTabla">Visualizando Tabla: {table}</h5> : null}
      <DataGrid
        className="tablauser"
        rows={info.data}
        columns={info.columns}
        autoHeight={true}
        showBorders={true}
        allowColumnResizing={true}
        pageSize={10}
        rowsPerPageOptions={[20]}
        rowAlternationEnabled={true}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
        components={{
          Toolbar: GridToolbar, //CustomToolbar
        }}
        onRowClick={handleRowClick} //https://mui.com/x/react-data-grid/events/
        onCellDoubleClick={goToSeeDetails}
        key={Math.random()}
        // hoverStateEnabled={true}
        // onCellClick={handleCellClick}
        // checkboxSelection
        // getRowClassName={(params) => `super-app-theme--${params.row.status}`}
        // columnAutoWidth={true}
      />
      {table === "Posteos" ? (
        <>
          <button className="buttonOne posBottonVolver" onClick={activarPOST}>
            ACTIVAR POST
          </button>
          <button className="buttonOne posBottonVolver" onClick={cancelarPost}>
            DESACTIVAR POST
          </button>
        </>
      ) : null}
      {table === "Usuarios" ? (
        <>
          <button className="buttonOne posBottonVolver" onClick={activarUser}>
            ACTIVAR USUARIO
          </button>
          <button
            className="buttonOne posBottonVolver"
            onClick={desactivarUser}
          >
            DESACTIVAR USUARIO
          </button>
          <button className="buttonOne posBottonVolver" onClick={changeToUser}>
            DAR ROL USUARIO
          </button>
          <button className="buttonOne posBottonVolver" onClick={changeToAdmin}>
            DAR ROL ADMIN
          </button>
          <button className="buttonOne posBottonVolver" onClick={validateMail}>
            VALIDAR MAIL
          </button>
          <button
            className="buttonOne posBottonVolver"
            onClick={invalidateMail}
          >
            INVALIDAR MAIL
          </button>
        </>
      ) : null}
      {table === "Profesionales" ? (
        <div className="dani">
          <button className="buttonOne posBottonVolver" onClick={activarProf}>
            ACTIVAR PROFESIONAL
          </button>
          <button
            className="buttonOne posBottonVolver"
            onClick={desactivarProf}
          >
            DESACTIVAR PROFESIONAL
          </button>
          <button
            className="buttonOne posBottonVolver"
            onClick={activateMembership}
          >
            ACTIVAR MEMBRESÍA
          </button>
          <button
            className="buttonOne posBottonVolver"
            onClick={cancelmembership}
          >
            CANCELAR MEMBRESÍA
          </button>
        </div>
      ) : null}
    </div>
  );
}
