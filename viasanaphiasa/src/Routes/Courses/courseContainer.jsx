import "./Course.css"
import { CourseContext } from "../../context/courseContext"
import { useContext, useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Loading from "../../component/Loading/Loading"
import Chapter from "./Chapter"
import { AuthContext } from "../../context/authContext"
import SetPreview from "../../component/EventSlide/EventSlideMain"

const CourseContainer = () => {
    const Taptitle_text = { Vietnamese: "Các phần học: ", Khmer: "ផ្នែកសិក្សា៖", English: "Study sections:" }
    const TapEventTiltle = {Vietnamese: "Các sự kiện đặc biệt: ", Khmer: "ព្រឹត្តិការណ៍ពិសេស៖", English: "Special event:" }
    const { courseState, loadChapter, setIsLoading } = useContext(CourseContext);
    const {authState} = useContext(AuthContext)
    const [Chapters, setChapters] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            await loadChapter(courseState.language);
        };
    
        fetchData();
    }, [courseState.language, authState.isAuthenticated]);
    
    useEffect(() => {
        const sortedData = [...courseState.colection].sort((a, b) => a.createAt.localeCompare(b.createAt)); 
        const chapterInstances = sortedData.map(data => new Chapter(data, navigate, setIsLoading, courseState.language));
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

export default CourseContainer