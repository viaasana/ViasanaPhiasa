export const CourseReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case "COURSE_LOADED_SUCCESS":
            return {
                ...state,
                colection: payload,
                isLoading: false
            }
        case "SET_IS_LOADING":
            return {
                ...state,
                isLoading: payload
            }
        case "LETTER_DETAIL_LOADED_SUCCESS":
            return {
                ...state,
                image: payload[0].image,
                video: payload[0].video,
                sound: payload[0].sound
            }
        case "SET_LANGUAGE":
            return {
                ...state,
                language: payload
            }
        case "CHANGE_CURENT_LEARNING":
            return {
                ...state,
                curentLearn: payload
            }

        case "SET_LETTER_INSTANT":
            return {
                ...state,
                LetterInstant: payload
            }
        case "CLEAR":
            return {
                ...state,
                isLoading: true,
                video: { videoUrl: "", videoDesc: "" },
                image: { imageUrl: "", imageDesc: "" }
            }
        default:
            return state
    }
}