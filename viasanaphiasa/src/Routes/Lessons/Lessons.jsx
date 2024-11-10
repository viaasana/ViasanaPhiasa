
import { CourseContext } from "../../context/courseContext"
import { useContext, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../component/Loading/Loading"
import Lesson from "./Lesson" 
import { AuthContext } from "../../context/authContext"

const LessonsRoute = () => {
    const Taptitle_text = { VietNamese: "Các phần học: ", Khmer: "ផ្នែកសិក្សា៖", English: "Study sections:" }
    const { courseState, loadLesson, setIsLoading, setLanguage } = useContext(CourseContext);
    const {authState} = useContext(AuthContext)
    const [Chapters, setChapters] = useState([]);
    const navigate = useNavigate()
    const {chapter} = useParams()
    const [chapterId, chapterName] = chapter.split("name=")

    useEffect(() => {

        const fetchData = async () => {
            await loadLesson(chapterId);
            const sortedData = [...courseState.colection].sort((a, b) => a.name.localeCompare(b.name));
            const chapterInstances = sortedData.map(data => new Lesson(data, navigate, setIsLoading));
            setChapters(chapterInstances);
            console.log("Lessons: ", courseState.colection)
        };

        fetchData();
    }, [courseState.language, authState, courseState.isLoading])




    if (courseState.isLoading || !Chapters.length)
        return <Loading />;

    return (
        <div className="course-container">
            <div className="course-Taptitle">{Taptitle_text[courseState.language]}</div>
            <div className="list">
                {Chapters.length > 0 ? Chapters.map((chapter) => (
                    chapter.renderCard()
                )) : ""}
            </div>
        </div>
    )
}

export default LessonsRoute