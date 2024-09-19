import Loading from "../../cpmponents/Loading/Loading"
import { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { CourseContext } from "../../context/courseContext"
import AddNewDocument from "../../cpmponents/addNewDocument/addNewDocument"
import { toast } from "react-toastify"


const DetailLetter = () => {
    const { courseState, loadDetailLetter } = useContext(CourseContext)
    const { chapter, lesson, letter } = useParams()
    const [chapterId, chapterName] = chapter.split("name=")
    const [lessonId, lessonName] = lesson.split("name=")
    const [letterId, letterName] = letter.split("name=")
    const [video, setVideo] = useState({
        videoDesc: "",
        videoUrl: ""
    })
    

    useEffect(() => {
        const fetchData = async () => {
            const res = await loadDetailLetter(lessonId, letterId)
            if (courseState.video)
                setVideo({
                    videoUrl: courseState.colection.video,
                    videoDesc: "hhrhrhr"
                })
            toast.error(res.message)
        }
        fetchData()
    }, [])
    console.log(video.videoUrl)
    if (courseState.isLoading)
        return <Loading />

    if (!video.videoUrl || video.videoUrl.length <= 0)

        return (
            <>
                <div className="TapTitle">Data{">"}{chapterName}{">"}{lessonName}</div>
                <div className="list">

                    <AddNewDocument />
                </div>
            </>
        )

    return (
        <>
            <div className="TapTitle">Data{">"}{chapterName}{">"}{lessonName}{">"}{letterName}</div>
            <div className="list">

                <video src={video.videoUrl}></video>
            </div>
        </>
    )


}

export default DetailLetter