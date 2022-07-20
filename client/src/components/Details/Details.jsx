import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getProductDetails } from '../../redux/actions'

export default function Details(props) {

    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch])

    const product = useSelector((state) => state.details)


    return (
        <div>
            {
                product &&
                (
                    <div>
                        <div>
                            <img src={product.image} />
                            <div>
                                <h1>{product.name}</h1>
                                <h1>{product.price}</h1>
                            </div>
                        </div>
                        <div>
                            <div>
                                {product.description}
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}
