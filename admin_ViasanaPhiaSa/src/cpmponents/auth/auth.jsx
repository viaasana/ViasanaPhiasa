import Login from "./login"
import Register from "./register"

const Auth = ({authRoute, language})=>{
    return(
        <>
        
            {authRoute==="login" && <Login language={language}/>}
            {authRoute==="register" && <Register language={language}/>}
        
        </>
    )
}

export default Auth