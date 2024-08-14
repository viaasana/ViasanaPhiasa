export const CourseReducer = (state, action) =>{
    const {type, payload} = action
    switch(type){
        case "COURSEL_LOADED_SUCCESS":
            return {
                ...state,
                colection: payload,
                isLoading: false
            }
        default:
            return state
    }
}