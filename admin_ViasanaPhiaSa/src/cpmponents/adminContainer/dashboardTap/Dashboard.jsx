import "./Dashboard.css"
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom"



const DashBoard = () =>{
    const navigate = useNavigate()
    const clickHancle = ()=>{
        navigate("hello")
    }
    return(
        <>
         <span>hello i'm from dashboard</span>            
        <button onClick={()=>clickHancle()}>hello</button>
         <Routes>
            <Route path="/hello/*" element={<h2>Hello i'm say hello page</h2>} />
        </Routes>
        </>
    )
}

export default DashBoard