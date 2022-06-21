import "../Signin/Signin.css";

import UserRegister from "../User/User.js";

import React from "react";
import image from "../Signin/Images/doctor_PNG15965.png";

const Signin = () => {
  // const [state, setstate] = React.useState(true);
  // const handleClick = () => {
  //   if (state === true) {
  //     setstate(false);
  //   } else {
  //     setstate(true);
  //   }
  // };

  return (
    <>
      <div className="container-signin">
        <div className="container-form-img">
          <img className="side" src={image} alt="Sign In Help" />
        </div>

        <div className="container-form-sign">
          <h1 className="sign-tittle">
            Registra <span className="other">tus Datos</span>
          </h1>

          {/* <div className="change">
            <span className="sign-text">¿Quisieras prestar tus servicios?</span>

            <span className="sign-text1">
              Presiona aquí y Completa tus Datos
            </span>
            <label className="switch">
              <input type="checkbox" onClick={handleClick} />
              <span className="slider round"></span>
            </label>
          </div> */}
          {/* {state === false ? ( */}
          {/* <div>
              <UserRegister />
              
            </div> */}
          {/* ) : ( */}
          <UserRegister />
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default Signin;
