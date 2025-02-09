import "./auth.css"
import logo from "../../assets/logo.png"
import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { AuthContext } from "../../context/authContext"
import { toast } from "react-toastify"

const  Register = ({language})=>{
    const text = {
        Vietnam: {
            h1: "ĐĂNG KÝ",
            password: "Mật khẩu",
            repeatPassword: "Nhập lại mật khẩu",
            submit_button: "ĐĂNG KÝ",
            forGotPassword: "Quên mật khẩu?",
            registerAskH2: "Đã có tài khoản?",
            registerAskP: "Hãy đăng nhập ngay để bắt đầu học.",
            registerButton: "ĐĂNG NHẬP"
        },
        Khmer:{
            h1: "ចុះឈ្មោះ",
            ពាក្យសម្ងាត់: "ពាក្យសម្ងាត់",
            repeatPassword: "បញ្ចូលពាក្យសម្ងាត់ឡើងវិញ",
            submit_button: "ចុះឈ្មោះ",
            forGotPassword: "ភ្លេចពាក្យសម្ងាត់របស់អ្នក?",
            registerAskH2: "ចុះឈ្មោះគណនី",
            registerAskP: "ចុះឈ្មោះឥឡូវនេះដើម្បីចាប់ផ្តើមរៀន។",
            registerButton: "ចូល"
        },
        English:{
            h1: "REGISTER",
            password: "Password",
            repeatPassword: "Re-enter password",
            submit_button: "REGISTER",
            forGotPassword: "Forgot your password?",
            registerAskH2: "Register an account",
            registerAskP: "Register now to start learning.",
            registerButton: "LOGIN"
        }
    }
    let thisText
    if(language=="Khmer")
        thisText = text.Khmer
    else if(language=="English")
        thisText = text.English
    else
        thisText = text.Vietnam
//////////////
    const {registerUser} = useContext(AuthContext)
    const [registerForm, setRegisterForm] = useState({
        userName: "",
        password: "",
    })
    const [canRegister, setCanRegister] = useState(false)
    
    const {userName, password} = registerForm
    
    const onChangeRegisterForm = (event)=>setRegisterForm({...registerForm, [event.target.name]: event.target.value})
    //check password is similar
    const checkPassword = (event)=>{
        if(event.target.value==password)
            setCanRegister(true)
        
    }
    
    const navigate = useNavigate()
    //onsubmit
    const navigateToLogin = ()=>{
        navigate("/login")
    }
    const register = async(event)=>{
        event.preventDefault()
        try {
            const registerData = await registerUser(registerForm)
            console.log(registerData)
            if(registerData.success)
            {
                toast.success(registerData.message)
                navigateToLogin()
            }
            else
                toast.error(registerData.message)
        } catch (error) {
            console.log(error)
        }
    }

    //navigate
    const openLogin = ()=>{
        navigate("/login")
    }


    return (
    <div className="auth-box">
        <div className="login-box">
            <h1>{thisText.h1}</h1>
            <form onSubmit={register}>
                <div className="input-group">
                    <input type="email" placeholder="Email" required name="userName" value={userName} onChange={onChangeRegisterForm}/>
                </div>
                <div className="input-group">
                    <input type="password" placeholder={thisText.password} required name="password" value={password} onChange={onChangeRegisterForm}/>
                </div>
                <div className="input-group">
                    <input type="password" placeholder={thisText.repeatPassword} required onChange={checkPassword}/>
                </div>
                {canRegister&&<button type="submit" className="login-btn">{thisText.submit_button}</button>}
                <a href="#" className="forgot-password">{thisText.forGotPassword}</a>
            </form>
        </div>
        <div className="register-box">
            <img src={logo} alt="" className="pencil-icon"/>
            <h2>{thisText.registerAskH2}</h2>
            <p>{thisText.registerAskP}</p>
            <button className="register-btn" onClick={()=>openLogin()}>{thisText.registerButton}</button>
        </div>
    </div>
    )
}

export default Register