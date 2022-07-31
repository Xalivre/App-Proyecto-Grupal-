import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../../redux/actions'

export default function UsersList() {

    const dispatch = useDispatch()

    const Users = useSelector((state) => state.users.slice(0,5))

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    console.log(Users)
  return (
    <div>
        <div>
            {Users?.map(e => {
                return  (
                <div key={e._id}>
                 <div>
                    <h6>Nombre de Usuario: {e.username}</h6>
                    <h6>Correo: {e.email}</h6>
                    <h6>Estado de la cuenta: {e.accountState}</h6>
                 </div>
                </div>
            )
            })}
        </div>
    </div>
  )
}
