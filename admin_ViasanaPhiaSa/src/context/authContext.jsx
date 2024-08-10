import { Children, createContext, useReducer } from "react"
import axios from "axios"
import { AuthReducer } from "../reducer/authReducer"
import { localStorageTokenName, apiUrl } from "./constans"


export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const { authState, dispatch } = useReducer(AuthReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    //login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success)
                localStorage.setItem(localStorageTokenName, response.data.accessToken)

            return response.data
        } catch (error) {
            if (error.data)
                return error.data
            return { success: false, message: error.message }
        }
    }

    //register
    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm)
            if (response.data.success)
                localStorage.setItem(localStorageTokenName, response.data.accessToken)
            return response.data
        } catch (error) {
            if (error.data)
                return error.data
            return { success: false, message: error.message }
        }
    }

    //context data
    const authContextData = { loginUser, registerUser }
    //retrun coponent provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider