import "./Card.css"
import { useContext, useState } from "react"
import { CourseContext } from "../../context/courseContext"
import Loading from "../Loading/Loading"
import { toast } from "react-toastify"




const Card = ({ key, id, name, status, handleClick }) => {
    const { deleteChapter } = useContext(CourseContext)
    const [deleting, setDeleting] = useState(false)

    const handleDelete = async () => {
        
        setDeleting(true)
        const res =await deleteChapter(id)
        setDeleting(false)
        if(res.success)
            toast.success("Delete successfuly")
        else
            toast.error("Delete un successfuly")
    }
    if (deleting)
        return (<Loading />)

    return (
        <div className="card" onClick={() => handleClick(id)}>
            <div className="card-content">
                <h2 className="cardTitle">{name}</h2>
                <p className="cardStatus">{status}</p>
            </div>
            <div className="button">
                <button className="card-edit-button" onClick={()=>handleEdit}>
                    Edit
                </button>
                <button className="card-delete-button" onClick={handleDelete}>
                    <i class="material-icons">&#xe872;</i>
                </button>
            </div>
        </div>
    )
}

export default Card