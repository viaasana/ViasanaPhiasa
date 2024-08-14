import { createContext, useReducer } from "react"
import { CourseReducer } from "../reducer/couseReducer"
import { apiUrl } from "./constans"
import axios from "axios"


export const CourseContext = createContext()

const CourseContextProvider = ({children}) =>{
    const [courseState, dispatch] = useReducer(CourseReducer, {
        isLoading: true,
        colection: []
    })
    //loadData
    const loadChapter = async ()=>{
        try {
            const response = await axios.get(`${apiUrl}/courses/`)
            if(response.data.success)
                dispatch({type: "COURSE_LOADED_SUCCESS", payload: response.data.chapters})
            console.log(response.data.chapters)
        } catch (error) {
            console.log(error)
            if(error.response.data)
                return error.response.data
            return { success: false, message: error.message }
        }
    }

    const courseContexData = {courseState, loadChapter}

    return (
        <CourseContext.Provider value={courseContexData}>
            {children}
        </CourseContext.Provider>
    )
}

export default CourseContextProvider