import { useState, useEffect, useContext } from "react"
import { CourseContext } from "../../context/courseContext"
import Lesson from "./Lesson"
import Loading from "../../cpmponents/Loading/Loading"
import { useParams, useNavigate } from "react-router-dom"
import AddNewDocument from "../../cpmponents/addNewDocument/addNewDocument"

const LessonList = () => {
    const { courseState, loadLesson, setIsLoading } = useContext(CourseContext)
    const [inPageLoading, setInPageLoading] = useState(courseState.isLoading)
    const [corectColectionName, setCorectColectionName] = useState(0)
    const [lessons, setLessons] = useState([])
    const {chapter} = useParams()
    const [chapterId, chapterName] = chapter.split("name=")
    const navigate = useNavigate()
    
    useEffect(() => {
        const fethData = async () => {
            await loadLesson(chapterId)
            const sortedData = [...courseState.colection].sort((a, b) => a.name.English.localeCompare(b.name))
            const lessonInstances = sortedData.map(data => new Lesson(data, navigate, setIsLoading))
            setLessons(lessonInstances)
        }

        fethData()

        if (lessons[0]) {
            const curentColectionName = lessons[0].name.English.split(' ')[0] || "Lesson"
            if (curentColectionName != "Lesson") {
                setInPageLoading(true)
                setCorectColectionName(0)
            }
            else {
                setCorectColectionName(corectColectionName + 1)
                if (corectColectionName >= 20) {
                    setInPageLoading(false)
                    setCorectColectionName(10)
                }
            }
        }else{
            setCorectColectionName(corectColectionName + 1)
            if (corectColectionName >= 30) {
                setInPageLoading(false)
                setCorectColectionName(30)
            }
        }
    }, [courseState])
    if (courseState.isLoading || inPageLoading)
        return <Loading />
    return (
        <>
            <div className="TapTitle">Data{">"}{chapterName}</div>
            <div className="list">
                {lessons.length > 0 ? lessons.map((chapter, index) => (
                    chapter.renderCard()
                )) : ""}
                <AddNewDocument />
            </div>
        </>
    )
}

export default LessonList