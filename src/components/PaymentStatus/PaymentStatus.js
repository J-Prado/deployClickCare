import jwt from "jsonwebtoken";
import React from "react";
import "../PaymentStatus/PaymentStatus.css";

const PaymentStatus = () => {
  const idUs = jwt.decode(localStorage?.getItem("session"))?.id;
  return (
    <div className="pay-container">
      <span className="pay-text">¡Gracias por Confiar en ClickCare!</span>
      <br />
      <span className="pay-text validated">
        Transacción realizada con éxito.
      </span>
      <br />
    </div>
  );
};

export default PaymentStatus;
