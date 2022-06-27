import React from "react";
import "./conversations.css";

export default function Conversations({ name, img }) {
  return (
    <div className="conversations">
      <img
        src={
          img
            ? img
            : "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6"
        }
        alt=""
        className="conversationsimage"
      />
      <span className="conversationsName"> {name}</span>
    </div>
  );
}
