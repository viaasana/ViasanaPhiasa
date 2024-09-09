import "./AddnewChapter.css"

import Form from "./Form"
import { useParams } from "react-router-dom"




const AddNewLetter = () => {
    const {chapter, lesson} = useParams()
    const chapterId = chapter.split("name=")[0]
    const lessonID = lesson.split("name=")[0]
    return (
        <div className="addingContainer">
            <Form name="Letter" data={{chapterId: chapterId, lessonId: lessonID}}/>
        </div>
    )
}

export default AddNewLetter