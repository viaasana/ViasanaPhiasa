import "./AddDetailform.css"
import { useState } from "react"
import { useContext } from "react"
import { CourseContext } from "../../context/courseContext"
import { toast } from "react-toastify"
import { useParams, useNavigate } from "react-router-dom"

const AddDetailForm = () => {
    const { uploadFile } = useContext(CourseContext)
    const navigate = useNavigate()
    const { chapter, lesson, letter } = useParams()
    const chapterId = chapter.split("name=")[0]
    const lessonId = lesson.split("name=")[0]
    const letterId = letter.split("name=")[0]

    const [dataInput, setDataInput] = useState({
        video: "",
        image: "",
        sound: "",
        ImageDiscriptionVietnam: "",
        ImageDiscriptionKhmer: "",
        ImageDiscriptionEnglish: "",
        VideoDiscriptionVietnam: "",
        VideoDiscriptionKhmer: "",
        VideoDiscriptionEnglish: "",
    })



    const handleInputChange = (valueChangeName, value) => {
        setDataInput((preData) => ({
            ...preData,
            [valueChangeName]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const VideoNameForm = {Vietnamese: dataInput.VideoDiscriptionVietnam, Khmer: dataInput.VideoDiscriptionKhmer, English: dataInput.VideoDiscriptionEnglish}
        const res2 = await uploadFile(dataInput.video, VideoNameForm, "video", chapterId, lessonId, letterId)

        const ImageNameForm = { Vietnamese: dataInput.ImageDiscriptionVietnam, Khmer: dataInput.ImageDiscriptionKhmer, English: dataInput.ImageDiscriptionEnglish }
        const res1 = await uploadFile(dataInput.image, ImageNameForm, "image", chapterId, lessonId, letterId)
        
        const res3 = await uploadFile(dataInput.sound, ImageNameForm, "sound", chapterId, lessonId, letterId)

        if (res2.success && res1.success && res3.success)
            toast.success(res3.message)
        else
            toast.error( (!res2.success && res2.message) || (!res1.success && res1.message) || (!res3.success && res3.message))
    }

    const handleCancel = (e) => {
        e.preventDefault()
        navigate(-1)
    };


    return (
        <div className="container">

            <div className="AddDetailContainer">
                <form className="getAudio">
                    <span>Upload audio</span>
                    <input type="file" accept="audio/*;capture=microphone" onChange={(e) => handleInputChange("sound", e.target.files[0])}/>
                </form>
                <form className="getVideo">
                    <span>Upload video</span>
                    <input type="file" name="getVideo" accept="video/mp4,video/x-m4v,video/*" onChange={(e) => handleInputChange("video", e.target.files[0])} />
                    <input type="text" placeholder="Vietnamese Video description" onChange={(e) => handleInputChange("VideoDiscriptionVietnam", e.target.value)} />
                    <input type="text" placeholder="Khmer Video description" onChange={(e) => handleInputChange("VideoDiscriptionKhmer", e.target.value)} />
                    <input type="text" placeholder="English Video description" onChange={(e) => handleInputChange("VideoDiscriptionEnglish", e.target.value)} />
                </form>
                <form className="getImage">
                    <span>Upload image</span>
                    <input type="file" name="getImage" accept="image/png, image/gif, image/jpeg" onChange={(e) => handleInputChange("image", e.target.files[0])} />
                    <input type="text" placeholder="Vietnamese Image description" onChange={(e) => handleInputChange("ImageDiscriptionVietnam", e.target.value)} />
                    <input type="text" placeholder="Khmer Image description" onChange={(e) => handleInputChange("ImageDiscriptionKhmer", e.target.value)} />
                    <input type="text" placeholder="English Image description" onChange={(e) => handleInputChange("ImageDiscriptionEnglish", e.target.value)} />
                    <div className="submit">
                        <button name="submit" className="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
                    </div>
                    <div className="cancle">
                        <button name="cancle" className="cancle" onClick={(e) => handleCancel(e)}>Cancle</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddDetailForm