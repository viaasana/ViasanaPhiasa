
import { CourseContext } from "../../context/courseContext"
import { useContext, useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import Loading from "../../component/Loading/Loading"
import Lesson from "./Lesson" 
import { AuthContext } from "../../context/authContext"
import SetPreview from "../../component/EventSlide/EventSlideMain"

const LessonsRoute = () => {
    const Taptitle_text = { Vietnamese: "Các phần học: ", Khmer: "ផ្នែកសិក្សា៖", English: "Study sections:" }
    const { courseState, loadLesson, setIsLoading } = useContext(CourseContext);
    const {authState} = useContext(AuthContext)
    const [Chapters, setChapters] = useState([]);
    const navigate = useNavigate()
    const {chapter} = useParams()
    const [chapterId, chapterName] = chapter.split("name=")
    const location = useLocation()
    const TapEventTiltle = {Vietnamese: "Các sự kiện đặc biệt: ", Khmer: "ព្រឹត្តិការណ៍ពិសេស៖", English: "Special event:" }

    useEffect(() => {
        const fetchData = async () => {
            await loadLesson(chapterId);
        };
    
        fetchData();
    }, [courseState.language, authState.isAuthenticated, location]);
    
    useEffect(() => {
        const sortedData = [...courseState.colection].sort((a, b) => a.createAt.localeCompare(b.createAt));
        const chapterInstances = sortedData.map(data => new Lesson(data, navigate, setIsLoading, courseState.language));
        setChapters(chapterInstances);
    }, [courseState.colection]);




    if (courseState.isLoading)
        return <Loading />;

    return (
        <div className="course-container">
            <div className="course-Taptitle">{Taptitle_text[courseState.language]}</div>
            <div className="list">
                {Chapters.length > 0 ? Chapters.map((chapter) => (
                    chapter.renderCard()
                )) : ""}
            </div>
            <div className="course-Taptitle">{TapEventTiltle[courseState.language]}</div>
            <SetPreview/>
        </div>
    )
}

export default LessonsRoute