import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllPost, filterDate } from "../../redux/action.js"
import { HiArrowCircleRight } from "react-icons/hi";
import { HiArrowCircleLeft } from "react-icons/hi";


import "./Offers.css"
import Card from './Card/Card.js';

function Offers() {

  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  
  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  const [page, setPage] = useState(1);
  const [PostPage, setPostPage] = useState(5);

  //Paginado//
  const PostPagOne = page * PostPage;
  const firstPostPage = PostPagOne - PostPage;
  const PostByPage = post.slice(firstPostPage, PostPagOne);
  const maxPages = Math.ceil(post.length / PostPagOne);
  
  function pageNum(e) {
    alert(page);
    document.getElementById("paginas").innerText = `${page}`;
    setPage(page);
  }
  function anterior() {
    if (page > 1) {
      document.getElementById("paginas").innerText = `Página ${page - 1}`;
      setPage(page - 1);
    }
  }
  function siguiente() {
    if (page * PostPage + page <= post.length) {

      document.getElementById("paginas").innerText = `Página ${page + 1}`;
      setPage(page + 1);
    }
  }
  const handlePageChange = (e) => {
    document.getElementById("paginas").innerText = `Página ${e.target.value}`;
    document.getElementById("unadetantas").innerText = ` /${maxPages}`;
    e.target.value ? setPage(e.target.value) : setPage(1);
  };

  //Filtros
  const cityLength = post.filter((e) => e.city.name )
  //const postLoca = cityLength.filter(cityLength => cityLength = citys)
  //console.log(cityLength)

  function handleDateChange(e) {
    e.preventDefault();
    
  };   
      
  //Geolocalizacion
  const [geoPos, setgeoPos] = useState([]);
  function position(pos) {
    const { latitude, longitude } = pos.coords;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=5a356e829671832fd6ad0994b01c7dbb`)
        .then(r => r.json())
        .then((data) => {
          let localCity = {
            city: data.name
          }
          setgeoPos(geoPos => [localCity]);
        })
  };
  const onLoad = () => {
    navigator.geolocation.getCurrentPosition(position)
  }
  const citys = geoPos.map((d) => d.city)
  //console.log(citys)


  return (
    <div className='pageOffers' onLoad={onLoad}>
      <div className='pageOffersIn'>
        <h2>search hhhhhhhhhhhh</h2>
        <div className='containerTitlesOffers'>
          {citys[0]?<h2 className='lenthCity'>{cityLength.length} Ofertas en {citys} </h2>:null}
        </div>

        <div className='containerOffers'>
          <div className='containerOffersLeft'>

            <div className='containerInputDate'>
              <form onFocus={(e)=> handleDateChange(e)}>
                <legend className='titleFilters'>Fecha de publicación</legend>
                <label> Hoy <input type="radio" name="date" value="Hoy"/></label><br/>
                <label> Esta Semana <input type="radio" name="date" value="EstaSemana"/></label><br/>
                <label> Este Mes <input type="radio" name="date" value="EsteMes"/></label><br/>
               </form>
            </div>
            <div className='containerInputDate'>
              <form onFocus={(e)=> handleDateChange(e)}>
                <legend className='titleFilters'>Categoría</legend>

                <label> Acompañante Terapéutico <input type="radio" name="date" value="AcompañanteTerapéutico" /></label><br/>
                <label> Enfermería <input type="radio" name="date" value="Enfermería"/></label><br/>
                <label> Doctor <input type="radio" name="date" value="Doctor"/></label><br/>
                <label> Kinesiología <input type="radio" name="date" value="Kinesiología"/></label><br/>
                <label> Acompañante de Adulto Mayor <input type="radio" name="date" value="AcompañantedeAdultoMayor"/></label><br/>
                <label> Aplicaciones <input type="radio" name="date" value="Aplicaciones"/></label><br/>
               </form>
            </div>
            <div className='containerInputDate'>
              <form onFocus={(e)=> handleDateChange(e)}>
                <legend className='titleFilters'>Ubicacion</legend>
                <label> Cerca de ti <input type="radio" name="date" value="Hoy"/></label><br/>
                <label> Tu Pais <input type="radio" name="date" value="EstaSemana"/></label><br/>
                <label> Todos <input type="radio" name="date" value="EsteMes"/></label><br/>
               </form>
            </div>

          </div>

          <div className='containerOffersRight'>
            {PostByPage.map(d => <Card
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
        
        <div className='containerPagButton'>
          <span className='countPag' id="paginas">Pagina 1</span>
          <HiArrowCircleLeft className='buttonArrowOffers' onClick={(e) => anterior(e)}/>
          <HiArrowCircleRight className='buttonArrowOffers' onClick={(e) => siguiente(e)}/>
          <div className="inputPagbotton">
            <input id="paginadoNumerico" placeholder={page} type="number" min="1" max={maxPages} onChange={handlePageChange}/>
            <span className='countPag' id="unadetantas"> /{maxPages}</span>
          </div>
        </div>
      </div>
    </div>

    
    
    )

}

export default Offers
