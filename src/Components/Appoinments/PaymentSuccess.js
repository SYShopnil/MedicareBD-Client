import React from 'react'
import {useLocation} from 'react-router-dom'
import Navbar from '../Home/Navber/Navber'

const PaymentSuccess = (props) => {
    // const {appointmentId, txId} = useParams() //get the txId and appointment id from url
    const {search} = useLocation()
    const appointmentId = search.split ("?")[1].split("&")[0].split ("=")[1] //get the appointmentId from url
    const txId = search.split ("?")[1].split("&")[1].split ("=")[1] //get the txtId from url
    return (
        <div>
            <Navbar/>
            <h1>Your appointment has been successfully confirmed</h1>
            <h2>Appointment Id: {appointmentId}</h2>

            <h1>Your Transaction Id is: </h1>
            <h2>Transaction ID: {txId}</h2>
        </div>
    )
}

export default PaymentSuccess
