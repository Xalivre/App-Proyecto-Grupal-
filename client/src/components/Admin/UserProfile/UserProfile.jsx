import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearPage, getUserById } from "../../../redux/actions";
import axios from "axios";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [msg, setMsg] = useState('')

  useEffect(() => {
    dispatch(getUserById(id));
    return () => dispatch(clearPage())
  }, [id, dispatch]);

  const user = useSelector((state) => state.userDetails);

  const handleClick = async (e, email) => {
    e.preventDefault();
    const {data} = await axios.put(`http://localhost:3000/forcepassword`, { email });
    setMsg(data.msg)
   
  };
  

  return (
    <div>
      {user.username && (
        <div>
          <h2>Username: {user.username}</h2>
          <h2>Rol de usuario: {user.role}</h2>
          <h2>Email de usuario: {user.email}</h2>
          <button onClick={(e) => handleClick(e, user.email)}>
            Reset Password
          </button>
          <br/>
            {msg ? <div> {msg} </div> : null}

        
        </div>
      )}
    </div>
  );
}
