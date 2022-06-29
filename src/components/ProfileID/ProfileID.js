import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../../redux/action.js";
import Admin from "./Admin/Admin.js";
import UserById from "./UserById/UserById.js";
import "./ProfileID.css";

export default function ProfileID(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getUserDetail(id));
  }, [dispatch, id]);

  const detailUser = useSelector((state) => state.userDetail);

  const userVal = detailUser.map((d) => d.userType);

  return (
    <div className="containerProfileID">
      <div className="containerProfileIdUs_Pro_Adm">
        {detailUser.map((s) => (
          <UserById key={s.id} idUs={s.id} />
        ))}
      </div>
    </div>
  );
}
