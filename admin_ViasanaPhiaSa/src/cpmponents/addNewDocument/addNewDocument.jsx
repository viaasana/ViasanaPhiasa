import "./AddNewDocument.css"
import addingCardIamge from "../../assets/addingCard.png"
import { useNavigate } from "react-router-dom"
const AddNewDocument = ()=>{
    const navigate = useNavigate()
    const handleAdding = ()=>{
        navigate("post")
    }

    return(
        <>
            <img src={addingCardIamge} alt="" className="addBar" onClick={()=>handleAdding()}/>
        </>
    )
}

export default AddNewDocument