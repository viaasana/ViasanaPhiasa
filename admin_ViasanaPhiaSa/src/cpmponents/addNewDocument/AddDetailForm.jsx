import "./AddDetailform.css"
import { useState } from "react"

const AddDetailForm = () => {
    const [dataInput, setDataInput] = useState({
        videoUrl: "",
        imageUrl: "",
        ImageDiscriptionVietnam: "",
        ImageDiscriptionKhmer: "",
        ImageDiscriptionEnglish: "",
        VideoDiscriptionVietnam: "",
        VideoDiscriptionKhmer: "",
        VideoDiscriptionEnglish: "",
    })



    const handleInputChange = (valueChangeName, value)=>{
        setDataInput((preData)=>({
            ...preData,
            [valueChangeName]: value
        }))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(dataInput)
    }

    

    return (
        <div className="container">

            <div className="AddDetailContainer">
                <div className="tiltle">
                    <div className="space"></div>
                    <span>Vietnamese</span>
                    <span>Khmer</span>
                    <span>English</span>
                </div>
                <form className="getVideo">
                    <input type="file" name="getVideo" accept="video/mp4,video/x-m4v,video/*" onChange={(e)=>handleInputChange("videoUrl", e.target.value)}/>
                    <input type="text" placeholder="Video description" onChange={(e)=>handleInputChange("VideoDiscriptionVietnam", e.target.value)} />
                    <input type="text" placeholder="Video description" onChange={(e)=>handleInputChange("VideoDiscriptionKhmer", e.target.value)}/>
                    <input type="text" placeholder="Video description" onChange={(e)=>handleInputChange("VideoDiscriptionEnglish", e.target.value)}/>
                </form>
                <form className="getImage">
                    <input type="file" name="getImage" accept="image/png, image/gif, image/jpeg" onChange={(e)=>handleInputChange("imageUrl", e.target.value)}/>
                    <input type="text" placeholder="Image description" onChange={(e)=>handleInputChange("ImageDiscriptionVietnam", e.target.value)}/>
                    <input type="text" placeholder="Image description" onChange={(e)=>handleInputChange("ImageDiscriptionKhmer", e.target.value)}/>
                    <input type="text" placeholder="Image description" onChange={(e)=>handleInputChange("ImageDiscriptionEnglish", e.target.value)}/>
                    <div className="submit">
                        <button name="submit" onClick={(e)=>handleSubmit(e)}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddDetailForm