export const CourseReducer = (state, action) =>{
    const {type, payload} = action
    switch(type){
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
            console.log("payload", payload)
            return {
                ...state,
                image: payload[0].image,
                isLoading: false,
                video: payload[0].video,
                sound: payload[0].sound
            }
        default:
            return state
    }
}