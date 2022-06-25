import jwt from "jsonwebtoken";
import React, { useEffect } from "react";
import "../PaymentStatus/PaymentStatus.css";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { validatePremium } from "../../redux/action";
const PaymentStatus = (props) => {
  const collection_id = qs.parse(props.location.search, {
    ignoreQueryPrefix: true,
  }).collection_id;
  const collection_status = qs.parse(props.location.search, {
    ignoreQueryPrefix: true,
  }).collection_status;
  const idPROFESIONAL = jwt.decode(localStorage?.getItem("session"))?.id;

  // console.log(
  //   qs.parse(props.location.search, { ignoreQueryPrefix: true }).collection_id
  // );
  // console.log(
  //   qs.parse(props.location.search, { ignoreQueryPrefix: true })
  //     .collection_status
  // );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      validatePremium({ collection_id, collection_status, idPROFESIONAL: 3 })
    );
  }, [collection_id, collection_status, dispatch, idPROFESIONAL]);

  const state = useSelector((state) => state.premium);

  return state.message ? (
    <div className="pay-container">
      <span className="pay-text">¡Gracias por Confiar en ClickCare!</span>
      <br />
      <span className="pay-text validated">{state.message}</span>
      <br />
    </div>
  ) : state.error ? (
    <div className="pay-container">
      <span className="pay-text">¡Lo sentimos!</span>
      <br />
      <span className="pay-text validated">{state.error}</span>
      <br />
    </div>
  ) : (
    <div className="pay-container">
      <span className="pay-text">¡Estamos esperando una respuesta!</span>
      <br />
    </div>
  );
};

export default PaymentStatus;
