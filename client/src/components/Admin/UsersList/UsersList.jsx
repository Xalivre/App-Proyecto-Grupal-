import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, updateUserState, adminUser} from '../../../redux/actions'
import {useJwt} from "react-jwt"

export default function UsersList() {

    const { decodedToken } = useJwt(localStorage.getItem("usuario"))

    let autho = decodedToken?.role

    const dispatch = useDispatch()

    const Users = useSelector((state) => state.users)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(getUsers())
        Users.length > 0 && setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Users])

    const banUserFunction = (e) => {
        let idUser = e.target.value
        dispatch(updateUserState({
            accountState : "banned"
        }, idUser))
        alert("Usuario baneado con exito")
    }

    const unbanUserFunction = (e) => {
        let idUser = e.target.value
        dispatch(updateUserState({
            accountState : "active"
        }, idUser))
        alert("Usuario desbaneado con exito")
    }

    const giveAdmin = (e) => {
        let idUser = e.target.value
        dispatch(adminUser({
            role : "admin"
        }, idUser))
        alert("El usuario ha sido ascendido correctamente")
    }

    const removeAdmin = (e) => {
        let idUser = e.target.value
        dispatch(adminUser({
            role : "user"
        }, idUser))
        alert("El usuario ha sido descendido correctamente")
    }


  return (
    <div>
        {
         loading === false ?   
            <div>
            {Users?.map(e => {
                return  (
                <div key={e._id}>
                 <div>
                 
                    <h6>Nombre de Usuario: {e.username}</h6>
                    <h6>Correo: {e.email}</h6>
                    <h6>Estado de la cuenta: {e.accountState}</h6>
                    <h6>role: {e.role}</h6>
                    { e.accountState === "banned" ? 
                    <button value={e._id} onClick={(e) => unbanUserFunction(e)}>Desbanear</button>
                    : 
                     autho === "owner" && e.role === "admin" ? 
                     <div>
                        <button value={e._id} onClick={(e) => banUserFunction(e)}>Banear usuario</button>
                        <button value={e._id} onClick={(e) => removeAdmin(e)}>remover admin</button>
                    </div> 
                        : autho === "owner" && e.role === "user" ?
                        <div>
                        <button value={e._id} onClick={(e) => giveAdmin(e)}>Ascender a admin</button> 
                        <button value={e._id} onClick={(e) => banUserFunction(e)}>Banear</button>
                        </div> : autho === "admin" && e.role === "user" && <div><button value={e._id} onClick={(e) => banUserFunction(e)}>Banear</button></div>
                    }
                 </div>
                </div>
            )
            })}
        </div> : <div>Loading...</div>
        }
    </div>
  )
}
