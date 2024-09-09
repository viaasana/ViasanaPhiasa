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
        default:
            return state
    }
}