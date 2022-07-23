import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function RegisterPage(){
    const dispatch = useDispatch();

    return (
        <div>
            <form>
                <input type="text" placeholder="Correo"></input>
                <input type="text" placeholder="password"></input>
            </form>
        </div>
    )
}

export default RegisterPage;