import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, banUser} from '../../../redux/actions'

export default function UsersList() {

    const dispatch = useDispatch()

    const Users = useSelector((state) => state.users.slice(0,5))
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(getUsers())
        Users.length > 0 && setLoading(false)
    }, [Users])

    const banUserFunction = (e) => {
        let idUser = e.target.value
        dispatch(banUser({
            accountState : "Banned"
        }, idUser))
        alert("Usuario baneadon con exito")
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
                    <button value={e._id} onClick={(e) => banUserFunction(e)}>Banear</button>
                 </div>
                </div>
            )
            })}
        </div> : <div>Loading...</div>
        }
    </div>
  )
}
