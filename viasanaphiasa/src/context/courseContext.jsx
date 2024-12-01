import { createContext, useReducer, useContext } from "react"
import { CourseReducer } from "../reducer/couseReducer"
import { apiUrl } from "./constans"
import axios from "axios"
import { AuthContext } from "./authContext"

export const CourseContext = createContext()

const CourseContextProvider = ({ children }) => {
    const [courseState, dispatch] = useReducer(CourseReducer, {
        isLoading: true,
        colection: [],
        video: { videoUrl: "", videoDesc: "" },
        image: { imageUrl: "", imageDesc: ""},
        sound: "",
        language: "VietNamese"
    })
    const { authState } = useContext(AuthContext)


    //load chapter
    const loadChapter = async (language) => {
        if (authState.isAuthenticated) {
            try {
                const response = await axios.get(`${apiUrl}/courses/`, {
                    params: {
                        language: language
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.data.success){
                    dispatch({ type: "COURSE_LOADED_SUCCESS", payload: response.data.chapters })
                }
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

    //load detail in one letter
    const loadDetailLetter = async (lessonId, letterId) => {
        try {
            //get image file
            const ImageResponse = await axios.get(`${apiUrl}/courses/chapter/${lessonId}/lesson/${letterId}/image`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                responseType: 'blob'
            })

            const imageUrl = URL.createObjectURL(ImageResponse.data);
            //get image desc
            const ImgDescRes = await axios.get(`${apiUrl}/courses/chapter/${lessonId}/lesson/${letterId}/image/desc`, {
                params: {
                    language: "VietNamese"
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            //get video file
            const videoRes = await axios.get(`${apiUrl}/courses/chapter/${lessonId}/lesson/${letterId}/video`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                responseType: 'blob'
            })
            const videoUrl = URL.createObjectURL(videoRes.data)

            //get video desc
            const videoDescRes = await axios.get(`${apiUrl}/courses/chapter/${lessonId}/lesson/${letterId}/video/desc`, {
                params: {
                    language: "VietNamese"
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            //get sound
            const soundRes = await axios.get(`${apiUrl}/courses/chapter/${lessonId}/lesson/${letterId}/sound`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                responseType: 'blob'
            })

            const soundUrl = URL.createObjectURL(soundRes.data)

            if (ImgDescRes.data.success) {
                dispatch({
                    type: "LETTER_DETAIL_LOADED_SUCCESS", payload: [{
                        image: { imageUrl: imageUrl, imageDesc: ImgDescRes.data.description },
                        video: { videoUrl: videoUrl, videoDesc: videoDescRes.data.description },
                        sound: {soundUrl: soundUrl}
                    }]
                })
                return { success: true }
            }
            return { success: false, message: "This letter currently has no data" }
        } catch (error) {
            dispatch({
                type: "LETTER_DETAIL_LOADED_SUCCESS", payload: [{
                    image: { imageUrl: '', imageDesc: "" },
                    video: { videoUrl: '', videoDesc: "" }
                }]
            })
            return { success: false, message: error.response }
        }
    }

    

    //uploadFile
    const uploadFile = async (file, nameform, colectionName, chapterId, lessonId, letterId) => {
        if (authState.isAuthenticated) {
            const { Vietnamese, Khmer, English } = nameform
            const data = new FormData();
            data.append('Vietnamese', Vietnamese);
            data.append('Khmer', Khmer);
            data.append('English', English);
            data.append('file', file);

            try {
                const response = await axios.post(`${apiUrl}/courses/chapter/${chapterId}/lesson/${lessonId}/${letterId}/upload${colectionName}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log("i'm respn data:", response.data)
                if (response.data.success)
                    return { success: true, message: response.data.message }

                return { success: false, message: response.data.message }
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data)
                    return { success: false, message: error.response.data.message }
                } else if (error.request) {
                    return { success: false, message: "No response from server" }
                } else
                    return { success: false, message: error.message }
            }
        } else {
            return { success: false, message: "this id private page" }
        }
    }
   

    const setIsLoading = (isLoading) => {
        dispatch({ type: "SET_IS_LOADING", payload: isLoading })
    }

    const setLanguage = ( language ) => {
        try {
            if (!dispatch) {
                throw new Error("Dispatch is not defined.");
            }
    
            if (language === "Khmer") {
                dispatch({ type: "SET_LANGUAGE", payload: "Khmer" });
            } else if (language === "English") {
                dispatch({ type: "SET_LANGUAGE", payload: "English" });
            } else {
                dispatch({ type: "SET_LANGUAGE", payload: "VietNamese" });
            }
        } catch (error) {
            console.error("Error in setLanguage:", error.message);
        }
    };

    const courseContexData = { courseState, loadChapter, loadLesson, loadLetter, loadDetailLetter, setIsLoading, uploadFile, setLanguage }


    return (
        <CourseContext.Provider value={courseContexData}>
            {children}
        </CourseContext.Provider>
    )
}

export default CourseContextProvider