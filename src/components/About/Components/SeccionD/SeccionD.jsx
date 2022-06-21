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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            praesentium incidunt quia aspernatur quasi quidem facilis quo nihil
            vel voluptatum?
          </p>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          {/*<h2>MISSION</h2>
          <hr />*/}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            voluptatum qui adipisci.
          </p>
        </div>

    
      </div>
     
      </div>

      <div className="Colum1"></div>
    </div>
  );
}

export default SeccionD;