import React from "react";
import "./AuctionByPro.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuctionsByProfesional } from "../../../../redux/action.js";
import CardAuctProf from "./CardAucProf/CardAuctProf";
import sliceRight from "../../../../images/sliceRight.png";
import sliceLeft from "../../../../images//sliceLeft.png";

function AuctionByPro({ idPr }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuctionsByProfesional(idPr));
  }, [dispatch, idPr]);

  const auctionProf = useSelector((state) => state.auctionByProfesional);

  const [page, setPage] = useState(1);
  const [PostPage, setPostPage] = useState(1);

  const PostPagOne = page * PostPage;
  const firstPostPage = PostPagOne - PostPage;
  const PostByPage = auctionProf.slice(firstPostPage, PostPagOne);
  const maxPages = auctionProf.length;

  function pageNum(e) {
    alert(page);
    document.getElementById("paginas").innerText = `${page}`;
    setPage(page);
  }
  function anterior() {
    if (page > 1) {
      document.getElementById("paginas").innerText = `Post ${page - 1}`;
      setPage(page - 1);
    }
  }
  function siguiente() {
    if (page <= auctionProf.length - 1) {
      document.getElementById("paginas").innerText = `Post ${page + 1}`;
      setPage(page + 1);
    }
  }
  const handlePageChange = (e) => {
    document.getElementById("paginas").innerText = `Post ${e.target.value}`;
    document.getElementById("unadetantas").innerText = ` /${maxPages}`;
    e.target.value ? setPage(e.target.value) : setPage(1);
  };

  return (
    <div className="containerAuctionByPro">
      {auctionProf.length > 1 ? (
        <h3 className="countPag">
          <span id="paginas">Post 1</span>/{auctionProf.length}
        </h3>
      ) : null}
      <div className="containerAuctionByProOne">
        {auctionProf.length > 1 ? (
          <img
            className="sliceLeft"
            src={sliceLeft}
            alt="sliceLeft"
            onClick={(e) => anterior(e)}
          />
        ) : null}
        <div className="containerAuctionByProLeft">
          {PostByPage.map((e) => (
            <CardAuctProf
              key={e.id}
              date={e.date}
              offer={e.offer}
              comment={e.comment}
              approved={e.approved}
              date_post={e.post.date_post}
              date_ini={e.post.date_ini}
              date_fin={e.post.date_fin}
              needs={e.post.needs}
              namePatient={e.post.namePatient}
              agePatient={e.post.agePatient}
              city={e.post.city.name}
            />
          ))}
        </div>
        {auctionProf.length > 1 ? (
          <img
            className="sliceRight"
            src={sliceRight}
            alt="sliceRight"
            onClick={(e) => siguiente(e)}
          />
        ) : null}
      </div>
    </div>
  );
}

export default AuctionByPro;
