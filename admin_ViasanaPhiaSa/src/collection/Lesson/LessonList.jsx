import { useState, useEffect, useContext } from "react"
import { CourseContext } from "../../context/courseContext"
import Lesson from "./Lesson"
import Loading from "../../cpmponents/Loading/Loading"
import { useParams } from "react-router-dom"

const LessonList = () => {
    const { courseState, loadLesson } = useContext(CourseContext)
    const [lessons, setLessons] = useState([])
    const {chapterId} = useParams()
    useEffect(() => {
        const fethData = async () => {
            await loadLesson(chapterId)
            const sortedData = [...courseState.colection].sort((a, b) => a.name.localeCompare(b.name))
            const lessonInstances = sortedData.map(data => new Lesson(data))
            setLessons(lessonInstances)
        }

        fethData()
    }, [loadLesson, courseState.collection])

    if (courseState.isLoading)
        return <Loading />
    return (
        <>
            <div className="TapTitle">Data{">"}chapterName</div>
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