import "./Assignments.css"
import { Routes, Route } from "react-router-dom"
import AssignmentOverview from "./AssignmentOverview/AssignmentOverview"
import SetPreview from "../../component/EventSlide/EventSlideMain"
import { CourseContext } from "../../context/courseContext"
import { useContext } from "react"
import StudentAssignment from "./StudentAssignment/StudentAssignment"

const Assignments = () => {
    const TapEventTiltle = {Vietnamese: "Các sự kiện đặc biệt: ", Khmer: "ព្រឹត្តិការណ៍ពិសេស៖", English: "Special event:" }
    const {courseState} = useContext(CourseContext)
    return (
        <>
            <div className="assignments-container">
                <Routes>
                    <Route path="/" element={<AssignmentOverview />} />
                    <Route path="/:AssignmentId" element={<StudentAssignment/>}/>
                </Routes>
                <div className="Assignment-tap-title">{TapEventTiltle[courseState.language]}</div>
                <SetPreview />
            </div>
        </>
    )
}

export default Assignments