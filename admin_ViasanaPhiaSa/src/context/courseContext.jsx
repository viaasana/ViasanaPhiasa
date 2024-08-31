import { createContext, useReducer, useContext } from "react"
import { CourseReducer } from "../reducer/couseReducer"
import { apiUrl } from "./constans"
import axios from "axios"
import { AuthContext } from "./authContext"

export const CourseContext = createContext()

const CourseContextProvider = ({ children }) => {
    const [courseState, dispatch] = useReducer(CourseReducer, {
        isLoading: true,
        colection: []
    })
    const { authState } = useContext(AuthContext)
    //load chapter
    const loadChapter = async () => {
        if (authState.isAuthenticated) {
            try {
                const response = await axios.get(`${apiUrl}/courses/`, {
                    params: {
                        language: "VietNamese"
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.data.success)
                    dispatch({ type: "COURSE_LOADED_SUCCESS", payload: response.data.chapters })
            } catch (error) {
                console.log(error)
                if (error.response.data)
                    return error.response.data
                return { success: false, message: error.message }
            }
        }
        else {
            return { success: false, message: "This is private page" }
        }
    }

    //load lesson
    const loadLesson = async (chapterId) => {
        if (authState.isAuthenticated) {
            try {
                const response = await axios.get(`${apiUrl}/courses/chapter/${chapterId}/`, {
                    params: {
                        language: "VietNamese"
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                if (response.data.success)
                    dispatch({ type: "COURSE_LOADED_SUCCESS", payload: response.data.lessons })
            } catch {
                console.log(error)
                if (error.response.data)
                    return error.response.data
                return { success: false, message: error.message }
            }
        } else
            return { success: false, message: "This is private page" }
    }


    //Create Chapter
    const createChapter = async (nameForm) => {
        if (authState.isAuthenticated) {
            try {
                const response = await axios.post(`${apiUrl}/courses/post`, nameForm)
                if (response.data.success)
                    return { success: true, message: response.data.message }
                else
                    return { success: false, message: response.data.message }
            } catch (error) {
                return { success: false, message: error }
            }
        } else
            return { success: false, message: "This is private page" }
    }

    //delete chapter
    const deleteChapter = async (chapterId) => {
        console.log(chapterId)
        if (authState.isAuthenticated) {
            try {
                const response = await axios.delete(`${apiUrl}/courses/`, { data: { chapterId: chapterId } })
                if (response.data.success)
                    return { success: true, message: response.data.message }
                else
                    return { success: false, message: response.data.message }
            } catch (error) {
                return { success: false, message: error }
            }
        }
    }


    const courseContexData = { courseState, loadChapter, loadLesson, createChapter, deleteChapter }


    return (
        <CourseContext.Provider value={courseContexData}>
            {children}
        </CourseContext.Provider>
    )
}

export default CourseContextProvider