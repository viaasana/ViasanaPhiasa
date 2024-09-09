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
    //load letter
    const loadLetter = async (chapterId, lessonId) => {
        try {
            const response = await axios.get(`${apiUrl}/courses/chapter/${chapterId}/lesson/${lessonId}`, {
                params: {
                    language: "VietNamese"
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (response.data.success)
                dispatch({ type: "COURSE_LOADED_SUCCESS", payload: response.data.letters })
        } catch (error) {
            console.log(error)
            if (error.response.data)
                return error.response.data
            return { success: false, message: error.message }
        }
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
    //create lesson
    const createLesson = async (nameForm, chapterId) => {
        if (authState.isAuthenticated) {
            try {
                const response = await axios.post(`${apiUrl}/courses/chapter/${chapterId}/post`, nameForm)
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

    //create letter
    const createLetter = async (nameform, chapterId, lessonId) => {
        if (authState.isAuthenticated) {
            try {
                const response = await axios.post(`${apiUrl}/courses/chapter/${chapterId}/lesson/${lessonId}/post`, nameform)
                if (response.data.success)
                    return { success: true, message: response.data.message }
                else
                    return { success: false, message: response.data.message }
            } catch (error) {
                return { success: false, message: error }
            }
        } else {
            return { success: false, message: "This is private page" }
        }
    }
    //delete chapter
    const deleteChapter = async (chapterId) => {
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

    //delete lesson
    const deleteLesson = async (lessonId) => {
        if (authState.isAuthenticated) {
            try {
                const response = await axios.delete(`${apiUrl}/courses/chapter/${lessonId}`)
                if (response.data.success)
                    return { success: true, message: response.data.message }
                return { success: false, message: response.data.message }
            } catch (error) {
                console.log(error)
                return { success: false, message: error }
            }
        }
        return { success: false, message: "This is private page" }
    }

    const deteLetter = async (lessonId,letterId) => {
        if (authState.isAuthenticated) {
            try {
                const response = await axios.delete(`${apiUrl}/courses/chapter/${lessonId}/lesson/${letterId}`)
            } catch (error) {

            }
        }
    }

    const setIsLoading = (isLoading) => {
        dispatch({ type: "SET_IS_LOADING", payload: isLoading })
    }

    const courseContexData = { courseState, loadChapter, loadLesson, loadLetter, createChapter, createLesson, createLetter, deleteChapter, deleteLesson, deteLetter, setIsLoading }


    return (
        <CourseContext.Provider value={courseContexData}>
            {children}
        </CourseContext.Provider>
    )
}

export default CourseContextProvider