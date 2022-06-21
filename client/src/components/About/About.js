import React from 'react'
import Navbar from "../Navbar/Navbar";
import './About.css'
import { Link } from "react-router-dom";
import Banner from './Components/Banner/Banner';
import Teams from './Components/Teams/Teams';
import SeccionD from './Components/SeccionD/SeccionD';
import Phone from './Components/Phone/Phone';

const AboutUs = () => {

  return (
      
    <>
   
        <Navbar />
        <Banner />
        <SeccionD />
        <Teams/>
        <Phone/>
      
             
    </>
  )
}

export default AboutUs
