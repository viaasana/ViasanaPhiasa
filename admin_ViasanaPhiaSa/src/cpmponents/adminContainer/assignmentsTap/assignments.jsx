import "./assignments.css"
import AddAssignmentPage from "../../addAssignmentPage/addAssignmentPage"
import AssignmentOverview from "../../AssignmentOverview/AssignmentOverview"
import { Routes, Route } from "react-router-dom"
import ViewAssignment from "../../ViewAssignment/ViewAssignment"


const Assignments = ()=>{

    return(
        <div className="assignments-container">
            <div className="title">Assignments</div>
            <Routes>
                    <Route path="/" element={<AssignmentOverview />} />
                    <Route path="/over-view" element={<AssignmentOverview />} />
                    <Route path="/:assignmentId" element={<ViewAssignment/>} />
                    <Route path="/post" element={<AddAssignmentPage/>} />
            </Routes>
        </div>
    )
}

export default Assignments