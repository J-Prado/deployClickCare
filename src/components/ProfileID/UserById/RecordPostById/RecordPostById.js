import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPostDetail } from '../../../../redux/action.js';
import CardPostUserById from './CardPostUserById/CardPostUserById.js';
import sliceRight from "../../../../images/sliceRight.png"
import sliceLeft from "../../../../images//sliceLeft.png"
import "./RecordPostById.css"

function RecordPostById({idUsp}) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserPostDetail(idUsp))
    }, [dispatch, idUsp]);

    const detailPostUser = useSelector(state => state.userPostDetail);

    const [page, setPage] = useState(1);
    const [PostPage, setPostPage] = useState(1);

    const PostPagOne = page * PostPage;
    const firstPostPage = PostPagOne - PostPage;
    const PostByPage = detailPostUser.slice(firstPostPage, PostPagOne);
    const maxPages = Math.ceil(detailPostUser.length / PostPagOne);

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
        if (page <= detailPostUser.length-1) {
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
    <div className='containerRecordPostById'>
        <div className='containerSubRecordPostById'>
            <h3 className='titleRecUserById'>Mira Tus </h3><h3 className='titleRecUserById nameUserByIdSecond'> Publicaciones</h3> 
        </div>
        <div className='containerSubRecordPostById'>
            {detailPostUser.length>1?<h3 className="countPag"><span  id="paginas">Post 1</span>/{detailPostUser.length}</h3>:null}
        </div>
        <div className='containerSubRecordPostById'>
            {detailPostUser.length>1?<img className='sliceLeft' src={sliceLeft} alt="sliceLeft" onClick={(e) => anterior(e)} />:null}
            <div>
            {PostByPage.map((d) => (<CardPostUserById
                key={d.id}
                id={d.id}
                datPost={d.date_post}
                whenIn={d.date_ini}
                whenOut={d.date_fin}
                needs={d.needs}
                startTime={d.availableTime_0}
                endTime={d.availableTime_1}
                agePatient={d.agePatient}
                namePatient={d.namePatient}
                locationReference={d.locationReference}
                contact_phone={d.contact_phone}
                addressPatient={d.addressPatient}
                specialty={d.specialty.specialty}
                city={d.city.name}
                state={d.state.name}
                country={d.country.name}

                datePostulation={d.auctions[0]?.date}
                offerPostulation={d.auctions[0]?.offer}
                commentPostulation={d.auctions[0]?.comment}
                professionalPostulation={d.auctions[0]?.professional.id}
                />))}
            </div>
            {detailPostUser.length>1?<img className='sliceRight' src={sliceRight} alt="sliceRight" onClick={(e) => siguiente(e)} />:null}
        </div>
    </div>
  )
}

export default RecordPostById
