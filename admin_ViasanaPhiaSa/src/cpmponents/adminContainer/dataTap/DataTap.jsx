import "./DataTap.css"
import { Routes, Route } from "react-router-dom"
import ChapterList from "../../../collection/Chapter/ChapterList"
import CourseContextProvider from "../../../context/courseContext"
import AddNewChapter from "../../addNewDocument/AddNewChapter"
import AddNewLesson from "../../addNewDocument/AddnewLesson"
import LessonList from "../../../collection/Lesson/LessonList"
import LetterList from "../../../collection/Letter/LetterList"
import AddNewLetter from "../../addNewDocument/AddNewLetter"
import AddDetailForm from "../../addNewDocument/AddDetailForm"
import DetailLetter from "../../../collection/DetailLetter/DetailLetter"

const DataTap = () => {

    return (
        <CourseContextProvider>
            <div className="dataTap">
                <Routes>
                    <Route path="/" element={<ChapterList />} />
                    <Route path="/post" element={<AddNewChapter />} />
                    <Route path="/:chapter" element={<LessonList />} />
                    <Route path="/:chapter/post" element={<AddNewLesson />} />
                    <Route path="/:chapter/:lesson" element={<LetterList />} />
                    <Route path="/:chapter/:lesson/post" element={<AddNewLetter />} />
                    <Route path="/:chapter/:lesson/:letter/" element={<DetailLetter/>} />
                    <Route path="/:chapter/:lesson/:letter/post" element={<AddDetailForm/> } />
                </Routes>
            </div>
        </CourseContextProvider>
    )
}

export default DataTap