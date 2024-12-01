import Login from "./login"
import Register from "./register"
import { AuthContext } from "../../context/authContext"
import { useContext } from "react"
import Loading from "../Loading/Loading"
import { useNavigate } from "react-router-dom"
import MyHeader from "../header/MyHeader"
import MyFooter from "../footer/MyFooter"
import { CourseContext } from "../../context/courseContext"

const Auth = ({authRoute, isHeaderAndFooter})=>{
    const {authState} = useContext(AuthContext)
    const {courseState} = useContext(CourseContext)
    const language = courseState.language
    const isLoading = authState.isLoading
    const spinn = <div><Loading /></div>

    const navigate = useNavigate()
    if(authState.isAuthenticated){
        navigate("/course")
    }

    return(
        <>
            {isHeaderAndFooter&& <MyHeader/>}
            <div className="container">
                {isLoading&&spinn}
                {authRoute==="login"&&!isLoading && <Login language={language}/>}
                {authRoute==="register"&&!isLoading && <Register language={language}/>}
            </div>
            {isHeaderAndFooter&& <MyFooter/>}
        </>
    )
}

export default Auth