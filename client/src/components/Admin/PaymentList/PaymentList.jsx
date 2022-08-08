/* eslint-disable no-unused-vars */
import { Style } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeState, getTotalPayments, sortDate, searchUserByEmailAdmin} from "../../../redux/actions";
import styles from "./PaymentList.module.css"

export default function PaymentList() {
    const [view, setView] = useState('')
    const totalPayments = useSelector(state => state.totalPayments);
    const [purchaseState, setPurchaseState] = useState('pendiente')
    const dispatch = useDispatch()
    const [input, setInput] = useState("")

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
    // const handleClickId = (e) => {
    //     e.preventDefault();
    //     dispatch(searchUserByEmailAdmin(input));
    //     setInput("")
    // }

    // console.log(totalPayments)
    // const handleChange = (e) => {
    //     setInput(e.target.value);
    //     console.log(input)
    // }

    return (
        <div className={styles.containerAll}>
            <div className={styles.topPositioning}>
                <div className={styles.buttonsTab}>
                    {/* <button type="submit" onClick={(e) => handleClickId(e)} >Buscar</button>
                    <input onChange={(e) => handleChange(e)} value={input} placeholder="ID usuario" ></input> */}
                    <button>Todos</button>
                    <button className="btnDash" value={'pendiente'} onClick={() => setPurchaseState('pendiente')}> Pendiente </button>
                    <button className="button" value={'despachado'} onClick={() => setPurchaseState('despachado')}> Despachado </button>
                    <button className="btnFinish" value={'finalizado'} onClick={() => setPurchaseState('finalizado')}> Finalizado </button>
                </div>
                <div>
                    <select className={styles.select} onChange={(e) => dispatch(sortDate(e.target.value))}>
                        <option className={styles.option} value="Default">Ordenar por fecha</option>
                        <option className={styles.option} value="Most Recent">Más recientes</option>
                        <option className={styles.option} value="Oldest">Más antiguos</option>
                    </select>
                </div>
            </div>
            <div className={styles.container}>

                {totalPayments && purchaseState === 'pendiente' && totalPayments.pendiente?.map(x => {
                    return (
                        <div className={styles.cardPendienteContainer}>
                            <div className={styles.iconText}>
                                <div className={styles.flex}>
                                    <i class="fa-solid fa-calendar-day"></i>
                                    <p>Fecha:</p>
                                </div>
                                <p><span className={styles.span}>{x.date.slice(0, 4) + "/" + x.date.slice(5, 7) + "/" + x.date.slice(8, 10)} Hora: {x.date.slice(11, 16)}</span></p>
                            </div>

                            <div className={styles.iconText}>
                                <div className={styles.flex}>
                                    <i class="fa-solid fa-user"></i>
                                    <p>Usuario: </p>
                                </div>
                                <p><span className={styles.span}>{x.username}</span></p>
                            </div>

                            <div className={styles.iconText}>
                                <div className={styles.flex}>
                                    <i class="fa-solid fa-envelope"></i>
                                    <p>Correo electrónico:</p>

                                </div>
                                <p><span >{x.email}</span></p>  
                                {/* {le sacamos el classname porque traia el mail con mayus que no iban} */}

                            </div>

                            <div className={styles.iconText}>
                                <div className={styles.flex}>
                                <i class="fa-solid fa-money-bill-1"></i>
                                    <p>Precio total:</p>
                                </div>
                                <p><span className={styles.span}>${x.amount}</span></p>
                            </div>

                            <div className={styles.iconText}>
                                <div className={styles.flex}>
                                    <i class="fa-solid fa-truck-ramp-box"></i>
                                    <p>Estado:</p>
                                </div>
                                <p><span className={styles.span}>{x.state}</span></p>
                            </div>
                            {view === x.idPayment ? <div className={styles.masContenido}>{x.container.map(item => {
                                return (
                                    <div id={item.idPayment}>
                                    <hr />
                                        <p>Nombre del producto: {item.name}</p>
                                        <p>Stock del producto: {item.stock}</p>
                                        <p>Precio del producto: ${item.price}</p>
                                    </div>
                                )
                            })
                            }
                                <p className={styles.vermas} onClick={() => setView('')}>Ver menos</p> </div> : <p className={styles.vermas} onClick={(e) => handleClick(e, x.idPayment)}> Ver más...</p>}
                            {
                                x.state === 'pendiente' ?
                                    <button className="btnDash" onClick={(e) => handleAnotherOtherClick(x.userId, x._id)}>Marcar como despachado</button>
                                    :
                                    <button disabled='true' className={styles.invisibleButton}>Marcar como despachado</button>}
                        </div>
                    )
                })}
                {totalPayments && purchaseState === 'despachado' && totalPayments.despachado?.map(x => {
                    return (
                        {/* <div className={styles.cardDespachadoContainer}>
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
                            {x.state === 'despachado' ? <button className="button" onClick={(e) => handleAnotherClick(x.userId, x._id)}>Marcar como finalizado</button> : <button disabled='true' className={`button ${styles.invisibleButton}`}>Marcar como finalizado</button>}
                            <br />
                        </div> */},
                        
                        <div className={styles.cardDespachadoContainer}>
                            <div className={styles.iconText}>
                                <div className={styles.flex}>
                                    <i class="fa-solid fa-calendar-day"></i>
                                    <p>Fecha:</p>
                                </div>
                                <p><span className={styles.span}>{x.date.slice(0, 4) + "/" + x.date.slice(5, 7) + "/" + x.date.slice(8, 10)} Hora: {x.date.slice(11, 16)}</span></p>
                            </div>

                            <div className={styles.iconText}>
                                <div className={styles.flex}>
                                    <i class="fa-solid fa-user"></i>
                                    <p>Usuario: </p>
                                </div>
                                <p><span className={styles.span}>{x.username}</span></p>
                            </div>

                            <div className={styles.iconText}>
                                <div className={styles.flex}>
                                    <i class="fa-solid fa-envelope"></i>
                                    <p>Correo electrónico:</p>

                                </div>
                                <p><span >{x.email}</span></p>
                                {/* {le sacamos el classname porque traia el mail con mayus que no iban} */}

                            </div>

                            <div className={styles.iconText}>
                                <div className={styles.flex}>
                                <i class="fa-solid fa-money-bill-1"></i>
                                    <p>Precio total:</p>
                                </div>
                                <p><span className={styles.span}>${x.amount}</span></p>
                            </div>

                            <div className={styles.iconText}>
                                <div className={styles.flex}>
                                    <i class="fa-solid fa-truck-ramp-box"></i>
                                    <p>Estado:</p>
                                </div>
                                <p><span className={styles.span}>{x.state}</span></p>
                            </div>
                            {view === x.idPayment ? <div className={styles.masContenido}>{x.container.map(item => {
                                return (
                                    <div id={item.idPayment}>
                                    <hr />
                                        <p>Nombre del producto: {item.name}</p>
                                        <p>Stock del producto: {item.stock}</p>
                                        <p>Precio del producto: ${item.price}</p>
                                    </div>
                                )
                            })
                            }
                                <p className={styles.vermas} onClick={() => setView('')}>Ver menos</p> </div> : <p className={styles.vermas} onClick={(e) => handleClick(e, x.idPayment)}> Ver más...</p>}
                            {
                                x.state === 'despachado' ?
                                    <button className="button" onClick={(e) => handleAnotherClick(x.userId, x._id)}>Marcar como finalizado</button>
                                    :
                                    <button disabled='true' className={` button ${styles.invisibleButton}`}>Marcar como finalizado</button>}
                        </div>
                    )
                })}
                {totalPayments && purchaseState === 'finalizado' && totalPayments.finalizado?.map(x => {
                    return (
                        {/* <div className={styles.cardFinalizadoContainer}>
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
                        </div> */},
                        
                        <div className={styles.cardFinalizadoContainer}>
                            <div className={styles.iconText}>
                                <div className={styles.flex}>
                                    <i class="fa-solid fa-calendar-day"></i>
                                    <p>Fecha:</p>
                                </div>
                                <p><span className={styles.span}>{x.date.slice(0, 4) + "/" + x.date.slice(5, 7) + "/" + x.date.slice(8, 10)} Hora: {x.date.slice(11, 16)}</span></p>
                            </div>

                            <div className={styles.iconText}>
                                <div className={styles.flex}>
                                    <i class="fa-solid fa-user"></i>
                                    <p>Usuario: </p>
                                </div>
                                <p><span className={styles.span}>{x.username}</span></p>
                            </div>

                            <div className={styles.iconText}>
                                <div className={styles.flex}>
                                    <i class="fa-solid fa-envelope"></i>
                                    <p>Correo electrónico:</p>

                                </div>
                                <p><span >{x.email}</span></p>
                                {/* {le sacamos el classname porque traia el mail con mayus que no iban} */}

                            </div>

                            <div className={styles.iconText}>
                                <div className={styles.flex}>
                                <i class="fa-solid fa-money-bill-1"></i>
                                    <p>Precio total:</p>
                                </div>
                                <p><span className={styles.span}>${x.amount}</span></p>
                            </div>

                            <div className={styles.iconText}>
                                <div className={styles.flex}>
                                    <i class="fa-solid fa-truck-ramp-box"></i>
                                    <p>Estado:</p>
                                </div>
                                <p><span className={styles.span}>{x.state}</span></p>
                            </div>
                            {view === x.idPayment ? <div className={styles.masContenido}>{x.container.map(item => {
                                return (
                                    <div id={item.idPayment}>
                                    <hr />
                                        <p>Nombre del producto: {item.name}</p>
                                        <p>Stock del producto: {item.stock}</p>
                                        <p>Precio del producto: ${item.price}</p>
                                    </div>
                                )
                            })
                            }
                                <p className={styles.vermas} onClick={() => setView('')}>Ver menos</p> </div> : <p className={styles.vermas} onClick={(e) => handleClick(e, x.idPayment)}> Ver más...</p>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}