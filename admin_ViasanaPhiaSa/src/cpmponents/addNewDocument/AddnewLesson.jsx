import { useParams } from "react-router-dom"
import "./AddnewChapter.css"

import Form from "./Form"




const AddNewLesson = () => {
    const {chapter} = useParams()
    const chapterId = chapter.split("name=")[0]
    return (
        <div className="addingContainer">
            <Form name="Lesson" data={{chapterId: chapterId}}/>
        </div>
    )
}

export default AddNewLesson