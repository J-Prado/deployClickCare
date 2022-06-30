import { useState } from "react";
import "./SeccionD.css";

function SeccionD() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="containerE" >
       <div className="Colum1">
        
       </div>
    
    <div className="containertabs">
     
      <div className="bloc-tabs">
        <button id="Uno"
          className={toggleState === 1 ? "tabs active-tabs"  : "tabs"}
          onClick={() => toggleTab(1)}
        >Misión       
        </button>
        <button  id="Dos"
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >Visión        
        </button>
      </div>
      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          {/*<h2>MISSION</h2>*/}
          <p>
          ClickCare pretende ser una plataforma que acerque potenciales pacientes o usuarios a profesionales vinculados a cualquier rama de la salud con cualquier tipo de especialidad. Democratizando el acceso a estos grupos en ambas direcciones, con la transparencia que puede aportar un sistema de subasta de cada oferta.
          </p>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          {/*<h2>MISSION</h2>
          <hr />*/}
          <p>
          Trabajar en dar a conocer esta plataforma para llegar en 5 años a ser utilizada masivamente para la contratación de servicios <br></br>médicos.
          </p>
        </div>

    
      </div>
     
      </div>

      <div className="Colum1"></div>
    </div>
  );
}

export default SeccionD;