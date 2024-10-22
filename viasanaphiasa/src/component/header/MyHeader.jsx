import "./header.css"
import { useContext } from "react"
import { AuthContext } from "../../context/authContext"
import { useNavigate } from "react-router-dom"

const MyHeader = () => {
    const navigate = useNavigate()
    const {authState, logout} = useContext(AuthContext)



    const openLogin = () => {
        navigate("/login")
    }
    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    
    const  UserButton = () => {
        if (authState.isAuthenticated)
            return (
                <div className="dropdown">
                    <button className="dropbtn">{authState.user.userName.split("@")[0]}
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a onClick={handleLogout}>Logout</a>
                    </div>
                </div>
        )
        return (
            <div className="dropdown">
                <button className="dropbtn" onClick={openLogin}>Login
                    <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                </div>
            </div>
        )
    }
    

    return (
        <div className="MyHeader">
            <h1>វាសនាភាសា</h1>
            <div className="navbar">
                <a href="#home">Home</a>
                <a href="#news">News</a>
                <UserButton />
            </div>
        </div>
    )
}

export default MyHeader