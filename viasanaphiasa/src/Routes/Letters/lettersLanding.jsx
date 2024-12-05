import { useNavigate } from "react-router-dom"
import { CourseContext } from "../../context/courseContext"
import { useContext } from "react"
import Loading from "../../component/Loading/Loading"

const LetterLanding = ({lessonName, length, legthDesc, buttonName}) => {
    const navigate = useNavigate()
    const {courseState} = useContext(CourseContext)
    
    const handleStart = ()=>{
        if(courseState.LetterInstant[0]){
            navigate(courseState.curentLearn)
        }
    }
    if(courseState.isLoading)
        return (
            <Loading/>
        )
    return (
        <div className="letter">
            <h2>{lessonName}</h2>
            <h3>{length} {legthDesc}</h3>
            <button onClick={handleStart}>{buttonName}</button>
        </div>
    )
}

export default LetterLanding