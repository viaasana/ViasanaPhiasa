import "./Card.css"
import { useContext, useState } from "react"
import { CourseContext } from "../../context/courseContext"
import Loading from "../Loading/Loading"
import { toast } from "react-toastify"




const Card = ({type, collection, handleClick }) => {
    const {id, name, status, chapterId, lessonId} = collection

    return (
        <div className="card">
            <div className="content" onClick={() => handleClick?handleClick(id, name):""}>
                <div className="card-content">
                    <h2 className="cardTitle">{name}</h2>
                    <p className="cardStatus">{status}</p>
                </div>
            </div>


        </div>
    )
}

export default Card