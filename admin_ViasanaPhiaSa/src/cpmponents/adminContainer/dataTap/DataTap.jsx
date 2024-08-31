import "./DataTap.css"
import { Routes, Route } from "react-router-dom"
import ChapterList from "../../../collection/Chapter/ChapterList"
import CourseContextProvider from "../../../context/courseContext"
import AddNewChapter from "../../addNewDocument/AddNewChapter"
import LessonList from "../../../collection/Lesson/LessonList"



const DataTap = () =>{

    return(
        <CourseContextProvider>
            <div className="dataTap">   
                <Routes>
                    <Route path="/" element={<ChapterList/>} />
                    <Route path="/post" element={<AddNewChapter/>}/>
                    <Route path="/:chapterId" element={<LessonList/>} />
                </Routes>
            </div>
        </CourseContextProvider>
    )
}

export default DataTap