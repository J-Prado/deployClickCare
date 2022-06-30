import React, { useState } from "react";
// Importing React and the useState hook.
import linkedin from "./ImgTeams/linked.png";

// Importing React DOM.

// importing React icons.
//import { BsArrowRightShort } from "react-icons/bs";

// importing the CSS file.
import "./Teams.css";
// importing the array of objects which contains data in data.js

//google icon
/*
  <button type="button" onClick={() => value === 0 ? setValue(1) : setValue(value - 1)}> a </button>
    <button type="button" onClick={() => value === 1 ? setValue(0) : setValue(value + 1)}> s </button>
*/
//*****

// creating a component which uses useState and contains our UI.
const Teams = () => {
  // UseState with a default value of 0.
  const [value, setValue] = useState(0);

  function slide() {
    let cambioTeam = document.getElementById("containerTeam");
    cambioTeam.slick();
    document.getElementsByClassName("containerImgTeam").hide();
  }

  return (
    <>
      <section className="containerTeam" id={"containerTeam"}>
        <div className="Column1"></div>
        <div className="cardsUp">
          <div className="containerCardTeam" id="cardTeam">
            <div className="containerImgTeam" id="ivan" />
            <h1 className="titleTeam">
              <span className="nameCardTeam">Ivan</span> Parra
            </h1>
            <h3 className="subtitleTeam">Desarrollador FullStack</h3>
            <div className="containerIconsTeam">
              <a
                href="https://www.linkedin.com/in/ivan-parra-casallas-91906a18a/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <img className="iconoTeam" src={linkedin} alt="" />
              </a>
            </div>
          </div>
          <div className="containerCardTeam" id="cardTeam">
            <div className="containerImgTeam" id="juan" />
            <h1 className="titleTeam">
              <span className="nameCardTeam">Juan</span> Prado
            </h1>
            <h3 className="subtitleTeam">Desarrollador FullStack</h3>
            <div className="containerIconsTeam">
              <a
                href="https://www.linkedin.com/in/juan-p-/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <img className="iconoTeam" src={linkedin} alt="" />
              </a>
            </div>
          </div>
          <div className="containerCardTeam" id="cardTeam">
            <div className="containerImgTeam" id="steven" />
            <h1 className="titleTeam">
              <span className="nameCardTeam">Steven</span> Galeano
            </h1>
            <h3 className="subtitleTeam">Desarrollador FullStack</h3>
            <div className="containerIconsTeam">
              <a
                href="https://www.linkedin.com/in/steven-jaimes-galeano/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <img className="iconoTeam" src={linkedin} alt="" />
              </a>
            </div>
          </div>
          <div className="containerCardTeam" id="cardTeam">
            <div className="containerImgTeam" id="Matias" />
            <h1 className="titleTeam">
              <span className="nameCardTeam">Matias</span> Caceres
            </h1>
            <h3 className="subtitleTeam">Desarrollador FullStack</h3>
            <div className="containerIconsTeam">
              <a
                href="https://www.linkedin.com/in/matias-caceres-aldana/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <img className="iconoTeam" src={linkedin} alt="" />
              </a>
            </div>
          </div>
        </div>

        <div className="Column1"></div>
      </section>

      <section className="containerTeam" id={"containerTeam"}>
        <div className="Column1"></div>
        <div className="cardsDown">
          <div className="containerCardTeam" id="cardTeam">
            <div className="containerImgTeam" id="luis" />
            <h1 className="titleTeam">
              <span className="nameCardTeam">Luis</span> Gimenez
            </h1>
            <h3 className="subtitleTeam">Desarrollador FullStack</h3>
            <div className="containerIconsTeam">
              <a
                href="https://www.linkedin.com/in/luisergimenez/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <img className="iconoTeam" src={linkedin} alt="" />
              </a>
            </div>
          </div>
          <div className="containerCardTeam" id="cardTeam">
            <div className="containerImgTeam" id="Danimir" />
            <h1 className="titleTeam">
              <span className="nameCardTeam">Danimir</span> Lorkovic
            </h1>
            <h3 className="subtitleTeam">Desarrollador FullStack</h3>
            <div className="containerIconsTeam">
              <a
                href="https://www.linkedin.com/in/danimirlorkovic/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <img className="iconoTeam" src={linkedin} alt="" />
              </a>
            </div>
          </div>
          <div className="containerCardTeam" id="cardTeam">
            <div className="containerImgTeam" id="Emmanuel" />
            <h1 className="titleTeam">
              <span className="nameCardTeam">Emmanuel</span> Zarate
            </h1>
            <h3 className="subtitleTeam">Desarrollador FullStack</h3>
            <div className="containerIconsTeam">
              <a
                href="https://www.linkedin.com/in/emmanuel-luis-zarate-a07b63147/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <img className="iconoTeam" src={linkedin} alt="" />
              </a>
            </div>
          </div>
          <div className="containerCardTeam" id="cardTeam">
            <div className="containerImgTeam" id="beto" />
            <h1 className="titleTeam">
              <span className="nameCardTeam">Alejandro</span> Betancourt
            </h1>
            <h3 className="subtitleTeam">Desarrollador FullStack</h3>
            <div className="containerIconsTeam">
              <a
                href="https://www.linkedin.com/in/betanmendoza/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <img className="iconoTeam" src={linkedin} alt="" />
              </a>
            </div>
          </div>
        </div>

        <div className="Column1"></div>
      </section>

      {/**
     * <section className="containerTeam">
    
    <div className='btns1'>
      <button type="button" onClick={() => value === 0 ? setValue(6) : setValue(value - 1)}>A</button>
      </div>

      <div className='team'>
      <img src = {arr[value].image} alt={arr[value].id}/>
      <h2>{arr[value].name}</h2>
      <h3>{arr[value].job}</h3>
      </div>
    
      <div className='btns2'>
      <button type="button" onClick={() => value === 6 ? setValue(0) : setValue(value + 1)}>S</button>
      </div>
    </section>
     * 
     */}
    </>
  );
};

export default Teams;
