import React from 'react'
import {useLocation} from 'react-router-dom'
import Navbar from '../Home/Navber/Navber'

const PaymentFailed = (props) => {
    // const {appointmentId, txId} = useParams() //get the txId and appointment id from url
    const {search} = useLocation()
    const err = search.split ("?")[1].split("&")[0].split ("=")[1].split("%").join(" ") //get the payment error from url
    return (
        <div>
            <Navbar/>
            <h1>Your appointment Payment is pending</h1>
            <h1>Your Transaction Declined because of {err} </h1>
        </div>
    )
}

export default PaymentFailed
