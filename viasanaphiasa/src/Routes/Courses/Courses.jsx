import "./Course.css"
import MyFooter from "../../component/footer/MyFooter"
import MyHeader from "../../component/header/MyHeader"
import { ProtectedRoute } from "../../component/routing/protectedRoute"
import { Route, Routes } from "react-router-dom"
import ChapterContainer from "../../component/Chapters/Chapter"
import CourseContainer from "./courseContainer"




const CourseRoute = () => {
    ProtectedRoute()//check if loged in
    return (
        <>
            <MyHeader />
            <div className="course">
                <Routes>
                    <Route index  element = {<CourseContainer/>} />
                    <Route path="chapter/*" element = {<ChapterContainer/>} />
                    <Route path="*" element={<h1>oop! Page not found.</h1>}/>
                </Routes>
            </div>
            <MyFooter />
        </>
    )
}

export default CourseRoute 