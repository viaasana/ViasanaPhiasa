import "./auth.css"
import logo from "../../assets/logo.png"
import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { AuthContext } from "../../context/authContext"
import { toast } from "react-toastify"

const Login = ({ language }) => {

    const text = {
        Vietnam: {
            h1: "ĐĂNG NHẬP",
            password: "Mật khẩu",
            repeatPassword: "Nhập lại mật khẩu",
            submit_button: "ĐĂNG NHẬP",
            forGotPassword: "Quên mật khẩu?",
            registerAskH2: "Đã có tài khoản",
            registerAskP: "Hãy đăng nhập để bắt đầu học.",
            registerButton: "ĐĂNG KÝ"
        },
        Khmer: {
            h1: "ចូល",
            password: "ពាក្យសម្ងាត់",
            repeatPassword: "បញ្ចូលពាក្យសម្ងាត់ឡើងវិញ",
            submit_button: "ចូល",
            forGotPassword: "ភ្លេចពាក្យសម្ងាត់របស់អ្នក?",
            registerAskH2: "មានគណនីរួចហើយ?",
            registerAskP: "ចូលឥឡូវនេះដើម្បីចាប់ផ្តើមរៀន។",
            registerButton: "ចុះឈ្មោះ"
        },
        English: {
            h1: "LOGIN",
            password: "Password",
            repeatPassword: "Re-enter password",
            submit_button: "LOGIN",
            forGotPassword: "",
            registerAskH2: "Already have an account?",
            registerAskP: "Login now to start learning.",
            registerButton: "SIGN UP"
        }
    }
    let thisText
    if (language == "Khmer")
        thisText = text.Khmer
    else if (language == "English")
        thisText = text.English
    else
        thisText = text.Vietnam
    //////////////////////////////
    const { loginUser } = useContext(AuthContext)
    const [loginForm, setLoginForm] = useState({
        userName: "",
        password: ""
    })

    const { userName, password } = loginForm
    
    const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

    //onsubmit
    const navigate = useNavigate()
    const navigateToAdminTap = ()=>{
        navigate("/admin")
    }


    const login = async event => {
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if(loginData.success)
            {
                toast.success(loginData.message)
                navigateToAdminTap() 
            }
            else
                toast.error(loginData.message)
        } catch (error) {
            console.log(error)
        }
    }
    //navigate
    const openRegister = () => {
        navigate("/register")
    }


    ////
    return (
        <div className="auth-box">
            <div className="login-box">
                <h1>{thisText.h1}</h1>
                <form onSubmit={login}>
                    <div className="input-group">
                        <a>&#9993;</a>
                        <input type="email" placeholder="Email" required name="userName" value={userName} onChange={onChangeLoginForm} />
                    </div>
                    <div className="input-group">
                        <a>&#128274;</a>
                        <input type="password" placeholder={thisText.password} required name="password" value={password} onChange={onChangeLoginForm} />
                    </div>
                    <button type="submit" className="login-btn">{thisText.submit_button}</button>
                    <a href="#" className="forgot-password">{thisText.forGotPassword}</a>
                </form>
            </div>
            <div className="register-box">
                <img src={logo} alt="" className="pencil-icon" />
                <h2>{thisText.registerAskH2}</h2>
                <p>{thisText.registerAskP}</p>
                <button className="register-btn" onClick={() => openRegister()}>{thisText.registerButton}</button>
            </div>
        </div>
    )
}

export default Login