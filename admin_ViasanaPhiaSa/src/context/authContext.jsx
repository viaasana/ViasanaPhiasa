import {createContext, useReducer, useEffect} from "react"
import axios from "axios"
import { AuthReducer } from "../reducer/authReducer"
import { localStorageTokenName, apiUrl } from "./constans"
import setAuthToken from "../util/setAuthToken"


export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch]= useReducer(AuthReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    //check authenticated user
    const loadUser = async() =>{
        if(localStorage[localStorageTokenName]){
            setAuthToken(localStorage[localStorageTokenName])
        }
        
        try {
            const response = await axios.get(`${apiUrl}/auth`)
            if(response.data.success)
                dispatch({
                    type: "SET_AUTH",
                    payload: {isAuthenticated: true, user: response.data.user}

                })
        } catch (error) {
            localStorage.removeItem(localStorageTokenName)
            setAuthToken(null)
            dispatch({
                type: "SET_AUTH",
                payload: {isAuthenticated: false, user: null}
            })
        }
    }   
    useEffect(()=>{
        const func = async ()=>{
            await loadUser()
        }
        func()
    }, [])
    //login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success)
            {
                localStorage.setItem(localStorageTokenName, response.data.accessToken)
                await loadUser()
            }
            return response.data
        } catch (error) {
            if (error.response.data)
                return error.response.data
            return { success: false, message: error.message }
        }
    }

    //logout
    const logout = async()=>{
        localStorage.removeItem(localStorageTokenName)
        setAuthToken(null)
        await loadUser()
    }

    
    //register
    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm)
            if (response.data.success){
                localStorage.setItem(localStorageTokenName, response.data.accessToken)
            }
            return response.data
        } catch (error) {
            if (error.data)
                return error.data
            return { success: false, message: error.message }
        }
    }

    //context data
    const authContextData = { loginUser,logout, registerUser, authState }
    //retrun coponent provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContextProvider