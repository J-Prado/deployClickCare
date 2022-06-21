import React from "react"
import "./Banner.css"
import coverVideo from "../../media/cover.mp4"


const Banner = () => {

    return(
    <div className="cover-container">
    <div className="Colum1"></div>
    <div className="containerText">
        <h1 className="title1"><span className="titlesLandingOne">Make smarter</span> decision for your family life</h1>
    </div>
    <div className="VideoContainer">
        <video className="video" src={coverVideo} autoPlay loop muted /> 
    </div>
    <div className="Colum1"></div>
    </div>
    )
}
export default Banner