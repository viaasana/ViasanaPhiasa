import "./adminContainer.css"
import { Routes, Route} from "react-router-dom"

import DashBoard from "./dashboardTap/Dashboard"
import UserTap from "./userTap/UserTap"
import DataTap from "./dataTap/DataTap"
import EventTap from "./eventsTap/EventTap"
import UserContribute from "./usersContribute/UserContribute"
import Controller from "../Controller/Controller"
import MyHeader from "../header/MyHeader"
import MyFooter from "../footer/MyFooter"
import { ProtectedRoute } from "../routing/protectedRoute"


const AdminContainer =() =>{
    
    
    ProtectedRoute()//check if already login


    return (
        <>
        <MyHeader/>
            <div className="container">
                <div className="admincontainer">
                <Controller/>
                <Routes>
                            <Route path="/*" element={<DashBoard/>}/>
                            <Route path="Dashboard/*" element={<DashBoard/>}/>
                            <Route path="User/*" element={<UserTap/>} />
                            <Route path="Data/*" element={<DataTap/>} />
                            <Route path="Event/*" element={<EventTap/>} />
                            <Route path="User_contribute/*" element={<UserContribute/>} /> 
                            <Route path="*" element={<h1>oop! Page not found.</h1>}/>
                </Routes>

                </div>
            </div>
        <MyFooter/>
        </>

    )
}

export default AdminContainer