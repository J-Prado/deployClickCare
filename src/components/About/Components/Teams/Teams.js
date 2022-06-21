import React, { useState }  from 'react'
// Importing React and the useState hook.
import facebook from "./ImgTeams/facebook.png"
import instagram from "./ImgTeams/instagram.png"
import github from "./ImgTeams/github.png"
// Importing React DOM.
 import ReactDOM from 'react-dom';
// importing React icons.
 //import { BsArrowRightShort } from "react-icons/bs";

// importing the CSS file.
import './Teams.css';
// importing the array of objects which contains data in data.js
 import { arr } from './data';

//google icon
/*
  <button type="button" onClick={() => value === 0 ? setValue(1) : setValue(value - 1)}> a </button>
    <button type="button" onClick={() => value === 1 ? setValue(0) : setValue(value + 1)}> s </button>
*/
//*****


// creating a component which uses useState and contains our UI.
const Teams = () =>{
    // UseState with a default value of 0.
    const [value, setValue] = useState(0);
    

    function slide(){
      let cambioTeam = document.getElementById("containerTeam") 
      cambioTeam.slick();
      document.getElementsByClassName("containerImgTeam").hide();
    }
    
    return(
    <>
    
   <section className='containerTeam' id={"containerTeam"}>
      <div className='Column1'></div>
      <div className='cardsUp'>
         <div className='containerCardTeam' id="cardTeam">
            <div className='containerImgTeam' id="ivan"/>
            <h1 className='titleTeam'><span className='nameCardTeam'>Name</span>  Lastname</h1>
            <h3 className='subtitleTeam'>Desarrollador FrontEnd</h3>
            <div className='containerIconsTeam'>
            <a href="http://www.facebook.com" target="_blank" rel="noopener noreferrer"> <img className="iconoTeam" src={facebook} alt=""/></a>
            <img className="iconoTeam" src={instagram} alt=""/>
            <img className="iconoTeam" src={github} alt=""/>
            </div>
         </div>
              <div className='containerCardTeam' id="cardTeam">
                 <div className='containerImgTeam' id="juan" />
                 <h1 className='titleTeam'><span className='nameCardTeam'>Name</span>  Lastname</h1>
                 <h3 className='subtitleTeam'>Desarrollador FrontEnd</h3>
                 <div className='containerIconsTeam'>
                 <a href="http://www.facebook.com" target="_blank" rel="noopener noreferrer"> <img className="iconoTeam" src={facebook} alt=""/></a>
                    <img className="iconoTeam" src={instagram} alt=""/>
                    <img className="iconoTeam" src={github} alt=""/>
                 </div>
              </div>
              <div className='containerCardTeam' id="cardTeam">
                 <div className='containerImgTeam' id="steven" />
                 <h1 className='titleTeam'><span className='nameCardTeam'>Name</span>  Lastname</h1>
                 <h3 className='subtitleTeam'>Desarrollador FrontEnd</h3>
                 <div className='containerIconsTeam'>
                 <a href="http://www.facebook.com" target="_blank" rel="noopener noreferrer"> <img className="iconoTeam" src={facebook} alt=""/></a>
                    <img className="iconoTeam" src={instagram} alt=""/>
                    <img className="iconoTeam" src={github} alt=""/>
                 </div>
              </div>
              <div className='containerCardTeam' id="cardTeam">
                 <div className='containerImgTeam' id="Matias" />
                 <h1 className='titleTeam'><span className='nameCardTeam'>Name</span>  Lastname</h1>
                 <h3 className='subtitleTeam'>Desarrollador FrontEnd</h3>
                 <div className='containerIconsTeam'>
                 <a href="http://www.facebook.com" target="_blank" rel="noopener noreferrer"> <img className="iconoTeam" src={facebook} alt=""/></a>
                    <img className="iconoTeam" src={instagram} alt=""/>
                    <img className="iconoTeam" src={github} alt=""/>
                 </div>
              </div>
          </div>
       
              <div className='Column1'></div>
       </section>


      

       <section className='containerTeam' id={"containerTeam"}>
      <div className='Column1'></div>
        <div className='cardsDown'>
              <div className='containerCardTeam' id="cardTeam">
                  <div className='containerImgTeam' id="luis"/>
                  <h1 className='titleTeam'><span className='nameCardTeam'>Name</span>  Lastname</h1>
                  <h3 className='subtitleTeam'>Desarrollador FrontEnd</h3>
                  <div className='containerIconsTeam'>
                    <a href="http://www.facebook.com" target="_blank" rel="noopener noreferrer"> <img className="iconoTeam" src={facebook} alt=""/></a>
                    <img className="iconoTeam" src={instagram} alt=""/>
                    <img className="iconoTeam" src={github} alt=""/>
                  </div>
              </div>
              <div className='containerCardTeam' id="cardTeam">
                 <div className='containerImgTeam' id="Danimir" />
                 <h1 className='titleTeam'><span className='nameCardTeam'>Name</span>  Lastname</h1>
                 <h3 className='subtitleTeam'>Desarrollador FrontEnd</h3>
                 <div className='containerIconsTeam'>
                 <a href="http://www.facebook.com" target="_blank" rel="noopener noreferrer"> <img className="iconoTeam" src={facebook} alt=""/></a>
                    <img className="iconoTeam" src={instagram} alt=""/>
                    <img className="iconoTeam" src={github} alt=""/>
                 </div>
              </div>
              <div className='containerCardTeam' id="cardTeam">
                 <div className='containerImgTeam' id="Emmanuel" />
                 <h1 className='titleTeam'><span className='nameCardTeam'>Name</span>  Lastname</h1>
                 <h3 className='subtitleTeam'>Desarrollador FrontEnd</h3>
                 <div className='containerIconsTeam'>
                 <a href="http://www.facebook.com" target="_blank" rel="noopener noreferrer"> <img className="iconoTeam" src={facebook} alt=""/></a>
                    <img className="iconoTeam" src={instagram} alt=""/>
                    <img className="iconoTeam" src={github} alt=""/>
                 </div>
              </div>
              <div className='containerCardTeam' id="cardTeam">
                 <div className='containerImgTeam' id="beto" />
                 <h1 className='titleTeam'><span className='nameCardTeam'>Name</span>  Lastname</h1>
                 <h3 className='subtitleTeam'>Desarrollador FrontEnd</h3>
                 <div className='containerIconsTeam'>
                 <a href="http://www.facebook.com" target="_blank" rel="noopener noreferrer"> <img className="iconoTeam" src={facebook} alt=""/></a>
                    <img className="iconoTeam" src={instagram} alt=""/>
                    <img className="iconoTeam" src={github} alt=""/>
                 </div>
              </div>
          </div>
       
              <div className='Column1'></div>
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
  }

export default Teams