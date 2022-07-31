import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, banUser, UnbanUser} from '../../../redux/actions'

export default function UsersList() {

    const dispatch = useDispatch()

    const Users = useSelector((state) => state.users)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(getUsers())
        Users.length > 0 && setLoading(false)
    }, [Users])

    const banUserFunction = (e) => {
        let idUser = e.target.value
        dispatch(banUser({
            accountState : "banned"
        }, idUser))
        alert("Usuario baneado con exito")
    }

    const unbanUserFunction = (e) => {
        let idUser = e.target.value
        dispatch(UnbanUser({
            accountState : "active"
        }, idUser))
        alert("Usuario desbaneado con exito")
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
                    {e.accountState === "active" ? <button value={e._id} onClick={(e) => banUserFunction(e)}>Banear</button> :
                     <button value={e._id} onClick={(e) => unbanUserFunction(e)}>Desbanear</button>}
                 </div>
                </div>
            )
            })}
        </div> : <div>Loading...</div>
        }
    </div>
  )
}
