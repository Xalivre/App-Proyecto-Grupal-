import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, updateUserState, adminUser } from "../../../redux/actions";
import { useJwt } from "react-jwt";
import Style from "./UsersList.module.css";
import loader from "../../../img/loader.gif";
import swal from 'sweetalert';

export default function UsersList() {
  const { decodedToken } = useJwt(localStorage.getItem("usuario"));

  let autho = decodedToken?.role;

  const dispatch = useDispatch();

  const Users = useSelector((state) => state.users);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
    Users.length > 0 && setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Users.length]);

  useEffect(() => {
    dispatch(getUsers());
  }, [count]);

  const banUserFunction = (e) => {
    setCount(!count);
    let idUser = e.target.value;
    dispatch(
      updateUserState(
        {
          accountState: "banned",
        },
        idUser
      )
    );
    swal("Baneado!","Usuario baneado con exito","success");
  };

  const unbanUserFunction = (e) => {
    setCount(!count);
    let idUser = e.target.value;
    dispatch(
      updateUserState(
        {
          accountState: "active",
        },
        idUser
      )
    );
    swal("Desbaneado!","Usuario desbaneado con exito","success");
  };

  const giveAdmin = (e) => {
    setCount(!count);
    let idUser = e.target.value;
    dispatch(
      adminUser(
        {
          role: "admin",
        },
        idUser
      )
    );
    swal("Ascendido!","El usuario ahora tambien es admin","success")
  };

  const removeAdmin = (e) => {
    setCount(!count);
    let idUser = e.target.value;
    dispatch(
      adminUser(
        {
          role: "user",
        },
        idUser
      )
    );
    swal("Descendido!","El usuario ya no es admin","success")
  };

  return (
    <div className={Style.containerAll}>
      {loading === false ? (
        <table className="table container">
          <thead className="table-dark">
            <tr>
              <th scope="col">UserName</th>
              <th scope="col">E-mail</th>
              <th scope="col">State</th>
              <th scope="col">Role</th>
              <th scope="col">History Payment</th>
              <th scope="col">Ban</th>
            </tr>
          </thead>
          <tbody>
            {Users?.map((e) => {
              return (
                <>
                  <tr>
                    <th className="table-secondary" scope="row">{e.username}</th>
                    <td className="table-info" >{e.email}</td>
                    <td  className="table-light" >{e.accountState}</td>
                    <td  className="table-warning" >{e.role}</td>
                    {e.paymentHistory?.map((f) => console.log(f))}
                    <td>{e.paymentHistory.length > 0 && (
                      <Link to={`/payments/${e._id}`}>
                        <button className="btnDash">Historial de compras</button>
                      </Link>
                    )}</td>
                    <td> {e.accountState === "banned" ? (
                      <button className="btnDash" value={e._id} onClick={(e) => unbanUserFunction(e)}>
                        Desbanear
                      </button>
                    ) : autho === "owner" && e.role === "admin" ? (
                      <div>
                        <button
                          className="buttonDelete" value={e._id} onClick={(e) => banUserFunction(e)}>
                          Banear usuario
                        </button>
                        <button
                          className="buttonDelete" value={e._id} onClick={(e) => removeAdmin(e)}>
                          Remover admin
                        </button>
                      </div>
                    ) : (autho === "owner" || autho === "admin") && e.role === "user" ? (
                      <div>
                        <button className="btnDash" value={e._id} onClick={(e) => giveAdmin(e)}>
                          Ascender a admin
                        </button>
                        <button
                          className="buttonDelete" value={e._id} onClick={(e) => banUserFunction(e)}>
                          Banear usuario
                        </button>
                      </div>
                    ) : (
                      autho === "admin" &&
                      e.role === "user" && (
                        <div>
                          <button
                            className="buttonDelete"
                            value={e._id}
                            onClick={(e) => banUserFunction(e)}
                          >
                            Banear usuario
                          </button>
                        </div>
                      )
                    )} </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className={Style.loader}>
          <img className={Style.gif} src={loader} alt="Loading" />
        </div>
      )}
    </div>
  );
}
