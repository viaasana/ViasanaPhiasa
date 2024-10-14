import Loading from "../../cpmponents/Loading/Loading"
import { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { CourseContext } from "../../context/courseContext"
import AddNewDocument from "../../cpmponents/addNewDocument/addNewDocument"
import { toast } from "react-toastify"
import "./DetailLetter.css"


const DetailLetter = () => {
    const { courseState, loadDetailLetter, setIsLoading } = useContext(CourseContext)
    const { chapter, lesson, letter } = useParams()
    const [chapterId, chapterName] = chapter.split("name=")
    const [lessonId, lessonName] = lesson.split("name=")
    const [letterId, letterName] = letter.split("name=")
    const [haveData, setHaveData] = useState(false)



    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const res = await loadDetailLetter(lessonId, letterId)
            if (res.success)
                setHaveData(true)
            else
                setHaveData(false)
            toast.error(res.message)
            console.log(res.message)
        }
        fetchData()
    }, [])

    if (courseState.isLoading)
        return <Loading />

    if (!courseState.image || courseState.image.length <= 0 || !haveData)

        return (
            <>
                <div className="TapTitle">Data{">"}{chapterName}{">"}{lessonName}{">"}{letterName}</div>
                <div className="list">
                    <AddNewDocument />
                </div>
            </>
        )

    return (
        <>
            <div className="TapTitle">Data{">"}{chapterName}{">"}{lessonName}{">"}{letterName}</div>
            <div className="list">
                <div className="detail">
                    <img src={courseState.image.imageUrl} alt="" />
                    <span>{courseState.image.imageDesc}</span>
                    <video src={courseState.video.videoUrl} autoPlay controls></video>
                    <audio controls>
                        <source src={courseState.sound.soundUrl} type="audio/mpeg" />
                        Your browser does not support the audio tag.
                    </audio>
                </div>
            </div>
        </>
    )


}

export default DetailLetter