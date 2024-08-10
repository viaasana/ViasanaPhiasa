import "./adminContainer.css"
import { useState } from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import DashBoard from "./dashboardTap/Dashboard"
import UserTap from "./userTap/UserTap"
import DataTap from "./dataTap/DataTap"
import EventTap from "./eventsTap/EventTap"
import UserContribute from "./usersContribute/UserContribute"
import Controller from "../Controller/Controller"


const AdminContainer =() =>{
    
    


    return (
        <div className="admincontainer">
            <Router>
                <Controller />
                <div className="content">
                    <Routes>
                        <Route path="/*" element={<DashBoard/>}/>
                        <Route path="/Dashboard/*" element={<DashBoard/>}/>
                        <Route path="/User/*" element={<UserTap/>} />
                        <Route path="/Data/*" element={<DataTap/>} />
                        <Route path="/Event/*" element={<EventTap/>} />
                        <Route path="/User_contribute/*" element={<UserContribute/>} /> 
                        <Route path="*" element={<h1>oop! Page not found.</h1>}/>
                    </Routes>
                </div>
            </Router>

        </div>
    )
}

export default AdminContainer