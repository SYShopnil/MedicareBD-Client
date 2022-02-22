import React from 'react'
import AddDoctor from '../../Admins/AddDoctor/AddDoctor'
import Navbar from '../../Home/Navber/Navber'
import DoctorImage from '../../../assert/doctor.jpg'
import {Link, useHistory} from 'react-router-dom'

const SignUpDoctor = () => {
    const history = useHistory();
    const goLogin = () => {
        history.push("/login");
    };
    return (
        <div className = {`row`}>
            <div className = {`col-12`}>
                <Navbar/>
            </div>
            <div className = {`col-12 col-md-7`} >
                <AddDoctor/>
            </div>
            <div className = {`d-none d-md-flex justify-content-center align-center   col-md-4 pt-5 p-5`}>
                <img className = {`opacity-25`} src= {`${DoctorImage}`} alt="Doctor image" />
            </div>

             <Link to="/login">
                <p
                className="text-success mt-2"
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={goLogin}
                >
                Our user? please Login
                </p>
          </Link>
        </div>
    )
}

export default SignUpDoctor
