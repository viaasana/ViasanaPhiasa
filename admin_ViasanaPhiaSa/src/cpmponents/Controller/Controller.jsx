import "./Controller.css"
import { useNavigate, useLocation } from "react-router-dom"

const Controller = ()=>{
    let index = 0
    const location = useLocation()
    const pathName = location.pathname.split("/")[2]
    const controlerComponent = ["", "user","data", "user_contribute", "event", "assignments"]
    controlerComponent.forEach((name, id)=>{
        if(name==pathName)
            index = id
    })

    const navigate = useNavigate()
    const handleActiveTap = (path)=>{
        navigate(path)
    }

    return (
        <div className="controler">
            <div className="title">
                Viasana Phiasa
            </div>
            <div className="taps">
                <div className="tap tap-dashboard" style={(index==0)?{backgroundColor: "#26A2EF"}:{backgroundColor: "unset"}} onClick={() => handleActiveTap("/admin/")}>Dashboard</div>
                <div className="tap tap-User" style={(index==1)?{backgroundColor: "#26A2EF"}:{backgroundColor: "unset"}} onClick={() => handleActiveTap("/admin/user")}>Users</div>
                <div  className="tap tap-Data" style={(index==2)?{backgroundColor: "#26A2EF"}:{backgroundColor: "unset"}} onClick={() => handleActiveTap("/admin/data")}>Data</div>
                <div to="/User_contribute" className="tap tap-contribute" style={(index==3)?{backgroundColor: "#26A2EF"}:{backgroundColor: "unset"}} onClick={() => handleActiveTap("/admin/user_contribute")}>User's contributions</div>
                <div to="/Event" className="tap tap-Event" style={(index==4)?{backgroundColor: "#26A2EF"}:{backgroundColor: "unset"}} onClick={() => handleActiveTap("/admin/event")}>Events</div>
                <div className="tap tap-assignments" style={(index==5)?{backgroundColor: "#26A2EF"}:{backgroundColor: "unset"}} onClick={()=>{handleActiveTap("/admin/assignments")}}>Assignments</div>
            </div>
        </div>
    )
}

export default Controller