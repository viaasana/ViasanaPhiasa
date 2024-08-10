import "./GetNameForm.css"
import { useState } from "react"
import addingCardIamge from "../../assets/addingCard.png"
import {toast} from "react-toastify"

const AddNewDocument = ()=>{
    const [adding, setAdding] = useState(false)

    var getNameFormPos
    const handleAdding = ()=>{
        const card = document.getElementById("getName")
        if(card){
            getNameFormPos = card.getBoundingClientRect(); 
        }
        setAdding(adding=>!adding)
    }
    
    const GetNameForm = (props)=>{
        const handleCancel = (event) => {
            event.preventDefault()
            setAdding(adding=>adding=!adding)
        }
    
        const handleOk = (event) => {
            event.preventDefault()
            setAdding(adding=>adding=!adding)
            toast.success("Added")
        }
        return(
            <form action="" method="get" id="getName" className="getNameForm" >
                <div>{props.name + " name?"}</div>
                <input type="text" name="nameInput" placeholder="Type here"/>
                <div className="buttons">
                    <button type="reset" id="CacelButton" onClick={handleCancel}>Cancel</button>
                    <button type="submit" id="OkButton" onClick={handleOk}>Ok</button>
                </div>
            </form>
        )
    }

    return(
        <>
            <img src={addingCardIamge} alt="" className="addBar" onClick={()=>handleAdding()}/>
            {adding&&<GetNameForm name="Chapter" rect={getNameFormPos}/>}
        </>
    )
}

export default AddNewDocument