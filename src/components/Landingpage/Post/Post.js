import React from 'react'
import { BiHealth } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPost } from "../../../redux/action.js"
import Card from '../../Offers/Card/Card.js';
import { Link } from "react-router-dom";

import "./Post.css"

function Services() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.allPost);

  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);
  // const recent = post.
  // post.filter(word => word.length > 6);
  const PostByLanding =  post.slice(0, 2);

  return (
    <div className='conteinerSelectonBlok'>
      <div className='containerPost'>
        <i className='iconoLanding'><BiHealth/></i>
        <h3 className='subTitleLanding'>Ofertas</h3>
        <h1 className='titlesLandin'><span className='titlesLandingOne'>cuentanos</span> como podemos ayudarte </h1>
        <p className='parrafoLanding'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <div className='conatinerCardPost'>
          <Link to="/offers">
            <button className='buttonOne'>Mas Ofertas</button>
          </Link>
          <div className=''>
            {PostByLanding.map(d => <Card 
              key={d.id}
              id={d.id}
              datPost={d.date_post}
              hourPost={d.hour_post}
              whenIn={d.date_ini}
              whenOut={d.date_fin} 
              startTime={d.availableTime_0}
              endTime={d.availableTime_1}
              city={d.city.name}
              state={d.state.name}
              needs={d.needs}
              specialty={d.specialty.specialty}
              name={d.user.name}
            />)} 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
