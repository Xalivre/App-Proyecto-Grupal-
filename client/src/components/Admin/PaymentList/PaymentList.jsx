import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotalPayments } from "../../../redux/actions"

export default function PaymentList (){

const dispatch= useDispatch();

const totalPayments = useSelector(state => state.totalPayments);

useEffect(()=> {
    dispatch(getTotalPayments())
}, [dispatch])
/*
totalPayments.pendiente
totalPayments.despchado
*/
    return(
        <div>
            HOLA
        </div>
    )
}