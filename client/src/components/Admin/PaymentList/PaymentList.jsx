/* eslint-disable no-unused-vars */
import { Style } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeState, getTotalPayments, sortDate } from "../../../redux/actions";
import styles from "./PaymentList.module.css"

export default function PaymentList() {
    const [view, setView] = useState('')
    const totalPayments = useSelector(state => state.totalPayments);
    const [purchaseState, setPurchaseState] = useState('pendiente')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTotalPayments())
    }, [])


    const handleAnotherClick = async (userId, paymentId) => {
        const delivereds = {
            userId,
            state: 'finalizado',
            paymentId
        }
        await dispatch(changeState(delivereds))
    }

    const handleAnotherOtherClick = async (userId, paymentId) => {
        const pendings = {
            userId,
            state: 'despachado',
            paymentId
        }
        await dispatch(changeState(pendings))
    }


    const handleClick = (e, id) => {
        e.preventDefault()
        setView(id)

    }



    return (
        <div>
            <br/>
            <div>
                <div className={styles.topPositioning}>
                    <div className={styles.buttonsTab}>
                        <button value={'pendiente'} onClick={() => setPurchaseState('pendiente')}> Pendiente </button>
                        <button value={'despachado'} onClick={() => setPurchaseState('despachado')}> Despachado </button>
                        <button value={'finalizado'} onClick={() => setPurchaseState('finalizado')}> Finalizado </button>
                    </div>
                    <div>
                        <select onChange={(e) => dispatch(sortDate(e.target.value))}>
                            <option value="Default">Ordenar por fecha</option>
                            <option value="Most Recent">Más recientes</option>
                            <option value="Oldest">Más antiguos</option>
                        </select>
                    </div>
                </div>
                <br/>
                {totalPayments && purchaseState === 'pendiente' && totalPayments.pendiente?.map(x => {
                    return (
                        <div>
                            <h6>Fecha: {x.date.slice(0, 4) + "/" + x.date.slice(5, 7) + "/" + x.date.slice(8, 10)} Hora: {x.date.slice(11, 16)}</h6>
                            <h6>Usuario: {x.username}</h6>
                            <h6>Correo electrónico: {x.email}</h6>
                            <h6>Precio total: ${x.amount}</h6>
                            <h6>Estado: {x.state}</h6>
                            <br />
                            {view === x.idPayment ? <div>{x.container.map(item => {
                                return (
                                    <div id={item.idPayment}>
                                        <h6 >Nombre del producto: {item.name}</h6>
                                        <h6>Stock del producto: {item.stock}</h6>
                                        <h6>Precio del producto: ${item.price}</h6>
                                    </div>
                                )
                            })
                            }
                                <h6 onClick={() => setView('')}>Ver menos</h6> </div> : <h6 onClick={(e) => handleClick(e, x.idPayment)}> Ver más...</h6>}
                            {
                                x.state === 'pendiente' ?
                                    <button onClick={(e) => handleAnotherOtherClick(x.userId, x._id)}>Marcar como despachado</button>
                                    :
                                    <button disabled='true' className={styles.invisibleButton}>Marcar como despachado</button>}
                            <br />
                        </div>
                    )
                })}
                {totalPayments && purchaseState === 'despachado' && totalPayments.despachado?.map(x => {
                    return (
                        <div>
                            <h6>Fecha: {x.date.slice(0, 4) + "/" + x.date.slice(5, 7) + "/" + x.date.slice(8, 10)} Hora: {x.date.slice(11, 16)}</h6>
                            <h6>Usuario: {x.username}</h6>
                            <h6>Correo electrónico: {x.email}</h6>
                            <h6>Precio total: ${x.amount}</h6>
                            <h6>Estado: {x.state}</h6>
                            <br />
                            {view === x.idPayment ? <div>{x.container.map(item => {
                                return (
                                    <div id={item.idPayment}>
                                        <h6 >Nombre del producto: {item.name}</h6>
                                        <h6>Stock del producto: {item.stock}</h6>
                                        <h6>Precio del producto: ${item.price}</h6>

                                    </div>
                                )
                            })
                            }
                                <h6 onClick={() => setView('')}>Ver menos</h6> </div> : <h6 onClick={(e) => handleClick(e, x.idPayment)}> Ver más...</h6>}
                            {x.state === 'despachado' ? <button onClick={(e) => handleAnotherClick(x.userId, x._id)}>Marcar como finalizado</button> : <button disabled='true' className={styles.invisibleButton}>Marcar como finalizado</button>}
                            <br />
                        </div>
                    )
                })}
                {totalPayments && purchaseState === 'finalizado' && totalPayments.finalizado?.map(x => {
                    return (
                        <div>
                            <h6>Fecha: {x.date.slice(0, 4) + "/" + x.date.slice(5, 7) + "/" + x.date.slice(8, 10)} Hora: {x.date.slice(11, 16)}</h6>
                            <h6>Usuario: {x.username}</h6>
                            <h6>Correo electrónico: {x.email}</h6>
                            <h6>Precio total: ${x.amount}</h6>
                            <h6>Estado: {x.state}</h6>
                            <br />
                            {view === x.idPayment ? <div>{x.container.map(item => {
                                return (
                                    <div id={item.idPayment}>
                                        <h6 >Nombre del producto: {item.name}</h6>
                                        <h6>Stock del producto: {item.stock}</h6>
                                        <h6>Precio del producto: ${item.price}</h6>

                                    </div>
                                )
                            })
                            }
                                <h6 onClick={() => setView('')}>Ver menos</h6> </div> : <h6 onClick={(e) => handleClick(e, x.idPayment)}> Ver más...</h6>}
                            <br />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}