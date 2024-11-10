import "./Course.css"
import { CourseContext } from "../../context/courseContext"
import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Loading from "../../component/Loading/Loading"
import Chapter from "./Chapter"
import { AuthContext } from "../../context/authContext"

const CourseContainer = () => {
    const Taptitle_text = { Vietnamese: "Các phần học: ", Khmer: "ផ្នែកសិក្សា៖", English: "Study sections:" }
    const { courseState, loadChapter, setIsLoading, setLanguage } = useContext(CourseContext);
    const {authState} = useContext(AuthContext)
    const [Chapters, setChapters] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {
            console.log(courseState.language)
            await loadChapter(courseState.language);
            console.log(courseState.colection)
            const sortedData = [...courseState.colection].sort((a, b) => a.name.localeCompare(b.name));
            const chapterInstances = sortedData.map(data => new Chapter(data, navigate, setIsLoading));
            setChapters(chapterInstances);
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

export default CourseContainer