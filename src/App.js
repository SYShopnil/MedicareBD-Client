import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Admin from "./Components/Admins/Admin/Admin";
import Appoinments from "./Components/Appoinments/Appoinments";
import PaymentSuccess from "./Components/Appoinments/PaymentSuccess";
import PaymentFailed from "./Components/Appoinments/PaymentFailed";
import ShowDoctorByCategory from "./Components/Appoinments/ShowDoctorByCategory";
import Dashboad from "./Components/Dashboad/Dashboad";
import Doctor from "./Components/Doctors/Doctor/Doctor";
import Home from "./Components/Home/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import NotFound from "./Components/NotFound/NotFound";
import PatientPanel from "./Components/PateintPanel/PatientPanel/PatientPanel";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import AmbulanceService from "./Components/Services/AmbulanceService";
import BloodBankService from "./Components/Services/BloodBankService";
import OxygenService from "./Components/Services/OxygenService";
import {
  checkUserLoginAction,
  loginUserData,
  loginUserFailed,
} from "./redux/Authentication/actions/Action";
import { baseUrl } from "./utils/baseUrl/baseurl";
import AddDoctor from "./Components/Admins/AddDoctor/AddDoctor";
import SignUpDoctor from "./Components/Doctors/SignUpDoctor/SignUpDoctor";

function App({ checkLogin, loginInfo, loadUserSuccess, loadUserFailed }) {
  useEffect(() => {
    return (async () => {
      const { isLoggedIn, headers } = loginInfo;

      if (isLoggedIn) {
        console.log("hello");
        const data = await axios.get(
          `${baseUrl}/user/get/own/profile`,
          headers
        );
        console.log({ data });
        if (data.status == 202) {
          loadUserSuccess(data.data);
        } else {
          console.log("hello");
          loadUserFailed();
        }
      }
    })();
  }, []);
  // console.log(loginInfo.isLoggedIn);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home></Home>
          </Route>
           <Route exact path="/signUp/doctor">
            <SignUpDoctor/>
          </Route>
          <Route exact path="/doctor/show" component={ShowDoctorByCategory} />
          <Route exact path="/login" >
            <Login></Login>
          </Route>
          <PrivateRoute path="/doctor">
            <Doctor></Doctor>
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin></Admin>
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboad/>
          </PrivateRoute>
          <PrivateRoute  path="/patientPanel">
            <PatientPanel></PatientPanel>
          </PrivateRoute>
          <Route exact path="/signup">
            <Signup></Signup>
          </Route>
          <PrivateRoute exact path="/appoinments">
            <Appoinments></Appoinments>
          </PrivateRoute>
          <PrivateRoute exact path="/bloodBank">
            <BloodBankService></BloodBankService>
          </PrivateRoute>
          <PrivateRoute exact path="/ambulanceService">
            <AmbulanceService></AmbulanceService>
          </PrivateRoute>
          <PrivateRoute exact path="/oxygenService">
            <OxygenService></OxygenService>
          </PrivateRoute>
          <Route exact path="/">
            <Home></Home>
          </Route>
          {/* new page  */}
          <Route exact path="/appointment/payment/success">
            <PaymentSuccess/>
          </Route>

          {/* new page  */}
          <Route exact path="/appointment/payment/failed">
            <PaymentFailed/>
          </Route>

          
          <Route exact path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loginInfo: state.login
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch(checkUserLoginAction()),
    loadUserSuccess: (data) => dispatch(loginUserData(data)),
    loadUserFailed: () => dispatch(loginUserFailed()),
  };
};

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
