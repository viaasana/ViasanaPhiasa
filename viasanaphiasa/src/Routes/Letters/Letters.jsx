import "./Letters.css"
import { CourseContext } from "../../context/courseContext"
import { useContext, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../component/Loading/Loading"
import Letter from "./Letter"
import { AuthContext } from "../../context/authContext"

const LetterRoute = () => {
    const { courseState,loadLetter, setIsLoading, setLanguage } = useContext(CourseContext);
    const {authState} = useContext(AuthContext)
    const [Chapters, setChapters] = useState([]);
    const navigate = useNavigate()
    const {chapter, lesson} = useParams()
    const [chapterId, chapterName] = chapter.split("name=")
    const [lessonId, lessonname] = lesson.split("name=")

    useEffect(() => {

        const fetchData = async () => {
            await loadLetter(chapterId, lessonId);
            const sortedData = [...courseState.colection].sort((a, b) => a.name.localeCompare(b.name));
            const chapterInstances = sortedData.map(data => new Letter(data));
            setChapters(chapterInstances);
        };

        fetchData();
    }, [courseState.language, authState, courseState.isLoading])




    if (courseState.isLoading || !Chapters.length)
        return <Loading />;

    return (
        <div className="letter-container">
            <div className="letter">
                {Chapters.length > 0 ? Chapters.map((chapter) => (
                    chapter.renderCard()
                )) : ""}
            </div>
        </div>
    )
}

export default LetterRoute