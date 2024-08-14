import { useContext } from "react"
import { AuthContext } from "../../context/authContext"
import { useNavigate } from "react-router-dom"

export const ProtectedRoute = ()=>{
    const {authState} = useContext(AuthContext)
    const navigate = useNavigate()
    if(!authState.isAuthenticated)
        navigate("/login")
}