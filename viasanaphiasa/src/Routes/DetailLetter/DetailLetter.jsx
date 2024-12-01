import { useEffect, useContext, useState } from "react"
import { CourseContext } from "../../context/courseContext"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import Letter from "./Letter"
import "./DetailLetter.css"
import Loading from "../../component/Loading/Loading"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

const DetailLetter = () => {
    const textError = {
        VietNamese: "Có lỗi sảy ra khi tải chi tiết bài học",
        Khmer: "មិនអាចទទួលបានព័ត៌មានលម្អិត",
        English: "Error occurred when loading lesson details"
    }
    const { courseState, loadDetailLetter, setIsLoading } = useContext(CourseContext)
    const [haveData, setHaveData] = useState(false)
    const { lesson, letter } = useParams()
    const [lessonId, lessonName] = lesson.split("name=")
    const [letterId, lettterState] = letter.split("state=")
    const [detail, setDetail] = useState()

    useEffect(() => {
        
        const fetchData = async () => {
            setIsLoading(true)
            const res = await loadDetailLetter(lessonId, letterId)
            if (res.success)
                setHaveData(true)
            else if(res) {
                toast.error(textError[courseState.language])
                setHaveData(false)
            }
        }
        NProgress.start()
        fetchData()
        NProgress.done()
    }, [courseState.language])

    useEffect(() => {
        const doc = { id: letterId, totalState: courseState.colection.length, state: lettterState, video: courseState.video, image: courseState.image, sound: courseState.sound }
        const letterInstant = new Letter(doc)
        setDetail(letterInstant)
    }, [haveData])

    if (courseState.isLoading || !haveData)
        return (
            <Loading />
        )

    return (
        <>
            <div className="detail-container">
                {detail.renderCard()}
            </div>
        </>
    )
}

export default DetailLetter