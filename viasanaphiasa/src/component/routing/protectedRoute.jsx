import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/authContext"
import { useNavigate } from "react-router-dom"

export const ProtectedRoute = () => {
    const { authState } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
            if (!authState.isAuthenticated && !authState.authLoading) {
                navigate("/login")
            }
    }, [authState])
}