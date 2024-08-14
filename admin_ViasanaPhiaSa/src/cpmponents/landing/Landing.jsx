import { useNavigate } from "react-router-dom"
import MyHeader from "../header/MyHeader"
import MyFooter from "../footer/MyFooter"
import { AuthContext } from "../../context/authContext"
import { useContext } from "react"

const  Landing = ()=>{
    const {authState} = useContext(AuthContext)
    const navigate = useNavigate()
    if(authState.isAuthenticated)
        navigate("/admin")
    return (
    <>
        <MyHeader/>
        <div className="container">
            <div>you are landing</div>
        </div>
        <MyFooter/>
    </>
    )
}

export default Landing