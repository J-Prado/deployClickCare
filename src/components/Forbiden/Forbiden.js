import React from "react";
import "../Forbiden/Forbiden.css";
import background from "../../images/Forbiden.jpeg";
const Forbiden = () => {
  return (
    <div className="forbiben">
      <img className="forbidenImg" src={background} alt="Not Found" />
    </div>
  );
};

export default Forbiden;
