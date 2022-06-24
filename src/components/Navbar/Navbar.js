import React, { useState } from "react";
import logo from "../../images/logonavbar.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { logOut } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

const Navbar = () => {
  //Hooks
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const out = useSelector((state) => state.userSession);
  const [cookies, setCookie] = useCookies();

  //Handlers
  const onClick = () => {
    dispatch(logOut());
    swal({
      title: "Logout Success",
      text: "Gracias por usar ClickCare",
    }).then(() => {
      window.location = "http://localhost:3000/login";
    });
  };

  return (
    <div className="Navbar">
      <Link to="/">
        <img className="nav-logo" href="/" src={logo} height={60} alt="logo" />
      </Link>
      <div className={`nav-items ${isOpen && "open"}`}>
        <Link to="/">
          <span>Inicio</span>
        </Link>
        <Link to="/about">
          <span>Nosotros</span>
        </Link>
        <Link to="/offers">
          <span>Ofertas</span>
        </Link>
        <a href="#testimonials">Testimonio</a>
        <div className="containerButtonNav">
          <Link to="/signin">
            <button className="buttonOne buttonNav">Registrate</button>
          </Link>
          {cookies.sessionClickcare ? (
            <button className="buttonOne buttonNavTwo" onClick={onClick}>
              Salir
            </button>
          ) : (
            <Link to="/login">
              <button className="buttonOne buttonNavTwo">Ingresa</button>
            </Link>
          )}
        </div>
      </div>
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Navbar;
