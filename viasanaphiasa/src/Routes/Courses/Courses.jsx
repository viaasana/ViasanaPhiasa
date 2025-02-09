import "./Course.css"
import { ProtectedRoute } from "../../component/routing/protectedRoute"
import { Route, Routes } from "react-router-dom"
import LessonsRoute from "../Lessons/Lessons"
import LetterRoute from "../Letters/Letters"
import CourseContainer from "./courseContainer"




const CourseRoute = () => {
    ProtectedRoute()
    return (
        <>
            <div className="course">
                <Routes>
                    <Route index  element = {<CourseContainer/>} />
                    <Route path=":chapter/*" element = {<LessonsRoute/>} />
                    <Route path=":chapter/:lesson/*" element={<LetterRoute/>} />
                    <Route path="*" element={<h1>oop! Page not found.</h1>}/>
                </Routes>
            </div>
        </>
    )
}

export default CourseRoute 