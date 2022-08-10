import React from 'react'
import Style from './Landing.module.css'
import landingImage from '../../img/404.jpg'
function Landing404({message}) {
    return (
        <div className={Style.landingContainer}>
            <h1 className={Style.landingTitle}>{message}</h1>
            <img alt="img" src={landingImage} className={Style.landingImage} />
        </div>
    )
}

export default Landing404