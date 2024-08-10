import "./Controller.css"
import {useState} from "react"
import {Link, useLocation } from "react-router-dom"

const Controller = ()=>{
    const [index, setIndex] = useState(0)
    const location = useLocation()
    function handleActiveTap(id){
        setIndex(id)
    }
    return (
        <div className="controler">
            <div className="title">
                Viasana Phiasa
            </div>
            <div className="taps">
                <div className="tap tap-dashboard" style={(index==0)?{backgroundColor: "#26A2EF"}:{backgroundColor: "unset"}} onClick={() => handleActiveTap(0)}><Link to="/" className="link">Dashboard</Link></div>
                <div className="tap tap-User" style={(index==1)?{backgroundColor: "#26A2EF"}:{backgroundColor: "unset"}} onClick={() => handleActiveTap(1)}><Link to="/User" className="link">User</Link></div>
                <div  className="tap tap-Data" style={(index==2)?{backgroundColor: "#26A2EF"}:{backgroundColor: "unset"}} onClick={() => handleActiveTap(2)}><Link to="/Data" className="link">Data</Link> </div>
                <div to="/User_contribute" className="tap tap-contribute" style={(index==3)?{backgroundColor: "#26A2EF"}:{backgroundColor: "unset"}} onClick={() => handleActiveTap(3)}><Link to="/User_contribute" className="link">User contribute</Link> </div>
                <div to="/Event" className="tap tap-Event" style={(index==4)?{backgroundColor: "#26A2EF"}:{backgroundColor: "unset"}} onClick={() => handleActiveTap(4)}><Link to="/Event" className="link">Event</Link> </div>
            </div>
        </div>
    )
}

export default Controller