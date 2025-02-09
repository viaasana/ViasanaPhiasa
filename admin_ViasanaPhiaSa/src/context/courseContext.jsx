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
        image: { imageUrl: "", imageDesc: "" },
        sound: "",
        language: "VietNamese",
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
    //get user list
    const getUerList = async () => {
        try {
            const res = await axios(`${apiUrl}/userAuthRouter/list`)
            return { success: true, users: res.data.users }
        } catch (error) {
            return { success: false, message: error.message }
        }

    }

    //delete user
    const deleteUser = async (id) => {
        setIsLoading(true)
        try {
            console.log(id)
            const res = await axios.delete(`${apiUrl}/userAuthRouter/`, {
                params: { id }
            })
            if (res.data.success) {
                setIsLoading(false)
                return { success: true }
            }
            setIsLoading(false)
            return { success: false }
        } catch {
            return { success: false }
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
                        video: { videoUrl: videoUrl, videoDesc: "videoDesc.data.description" },
                        sound: { soundUrl: soundUrl }
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
    //delete letter

    const deteLetter = async (lessonId, letterId) => {
        if (authState.isAuthenticated) {
            try {
                const response = await axios.delete(`${apiUrl}/courses/chapter/${lessonId}/lesson/${letterId}`)
                if (response.data.success)
                    return { success: true, message: response.data.message }
                return { success: false, message: response.data.message }
            } catch (error) {
                console.log(error)
                return { success: false, message: error }
            }
        }
    }

    const getGroups = async () => {
        if (authState.isAuthenticated)
            try {
                const response = await axios.get(`${apiUrl}/groups`)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
    }

    const addTest = async (name) => {
        if (authState.isAuthenticated) {
            setIsLoading(true)
            try {
                const respnose = await axios.post(`${apiUrl}/courses/assignment/post`, { Vietnamese: name.vi, Khmer: name.km, English: name.en, groupIds: "" })
                setIsLoading(false)
                return { success: true, message: respnose.data.message, testId: respnose.data.testId }
            } catch (error) {
                setIsLoading(false)
                return { success: false, message: error.response.data.message }
            }
        }
    }

    const addQuestion = async (testId, content, trueAnswer, falseAnswer1, falseAnswer2, falseAnswer3) => {
        if (authState.isAuthenticated) {
            setIsLoading(true)
            try {
                const respnose = await axios.post(`${apiUrl}/courses/assignment/${testId}/post`,
                    { content, trueAnswer, falseAnswer1, falseAnswer2, falseAnswer3 })
                setIsLoading(false)
                return { success: true, message: respnose.data.message }
            } catch (error) {
                setIsLoading(false)
                return { success: false, message: error.response.data.message }
            }
        }
    }

    const getTestOverview = async () => {
        try {
            const response = await axios.get(`${apiUrl}/courses/assignment/`)
            return { success: true, assignments: response.data.tests }
        } catch (error) {
            return { success: false, error }
        }
    }

    const getTestById = async (testId) => {
        if (authState.isAuthenticated)
            try {
                const response = await axios.get(`${apiUrl}/courses/assignment/${testId}`)
                return {success: true, message: response.data}
            } catch (error) {
                return {success: false, error}
            }
    }

    const deleteTest = async (testId) => {
        if (authState.isAuthenticated)
            try {
                const response = await axios.delete(`${apiUrl}/courses/assignment/${testId}`)
                return {success: true, message: "Assignment delete successfully"}
            } catch (error) {
                return {success: false, error}
            }
    }

    const setIsLoading = (isLoading) => {
        dispatch({ type: "SET_IS_LOADING", payload: isLoading })
    }



    const courseContexData = {
        courseState,
        loadChapter,
        loadLesson,
        loadLetter,
        loadDetailLetter,
        createChapter,
        createLesson,
        createLetter,
        deleteChapter,
        deleteLesson,
        deteLetter,
        setIsLoading,
        uploadFile,
        getUerList,
        deleteUser,
        getGroups,
        addTest,
        addQuestion,
        getTestOverview,
        deleteTest,
        getTestById
    }


    return (
        <CourseContext.Provider value={courseContexData}>
            {children}
        </CourseContext.Provider>
    )
}

export default CourseContextProvider