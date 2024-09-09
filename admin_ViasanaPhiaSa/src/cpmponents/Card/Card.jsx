import "./Card.css"
import { useContext, useState } from "react"
import { CourseContext } from "../../context/courseContext"
import Loading from "../Loading/Loading"
import { toast } from "react-toastify"




const Card = ({type, collection, handleClick }) => {
    const { deleteChapter, deleteLesson, deteLetter } = useContext(CourseContext)
    const [deleting, setDeleting] = useState(false)
    const {id, name, status, chapterId, lessonId} = collection
    const handleDelete = async () => {
        let response
        setDeleting(true)
        if (type == "Chapter")
            response = await deleteChapter(id)
        else if (type == "Lesson")
            response = await deleteLesson(id)
        else if(type == "Letter")
            response = await deteLetter(lessonId, id)
        setDeleting(false)
        if (response.success)
            toast.success("Delete successfuly")
        else
            toast.error("Delete un successfuly")
    }
    if (deleting)
        return (<Loading />)

    return (
        <div className="card">
            <div className="content" onClick={() => handleClick(id, name)}>
                <div className="card-content">
                    <h2 className="cardTitle">{name}</h2>
                    <p className="cardStatus">{status}</p>
                </div>
            </div>
            <div className="button">
                <button className="card-edit-button" onClick={() => handleEdit}>
                    Edit
                </button>
                <button className="card-delete-button" onClick={handleDelete}>
                    <i className="material-icons">&#xe872;</i>
                </button>
            </div>

        </div>
    )
}

export default Card