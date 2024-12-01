import "./Letters.css"
import { CourseContext } from "../../context/courseContext"
import { useContext, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../component/Loading/Loading"
import Letter from "../DetailLetter/Letter"
import { AuthContext } from "../../context/authContext"

const LetterRoute = () => {
    const textButton = {VietNamese: "Bắt đầu học", Khmer: "ចាប់ផ្តើម", English: "Start"}
    const textInfor = {VietNamese: "Chữ", Khmer: "អក្សរ", English: "Letter"}
    const { courseState, loadLetter, setLanguage } = useContext(CourseContext);
    const { authState } = useContext(AuthContext)
    const [Chapters, setChapters] = useState([]);
    const { chapter, lesson } = useParams()
    const [chapterId, chapterName] = chapter.split("name=")
    const [lessonId, lessonname] = lesson.split("name=")
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            await loadLetter(chapterId, lessonId)
        }
        fetchData();
    }, [courseState.language, authState])
    useEffect(() => {
        const sortedData = [...courseState.colection].sort((a, b) => a.name.localeCompare(b.name))
        const LetterInstant = sortedData.map(data => new Letter(data, navigate))
        setChapters(LetterInstant)
    }, [courseState.colection])


    const handleStart = ()=>{
        const link = courseState.colection[0].id + "state=0"
        navigate(link)
    }

    if (courseState.isLoading )
        return <Loading />;

    return (
        <div className="letter-container">
            <div className="letter">
                <h2>{lessonname}</h2>
                <h3>{courseState.colection.length} {textInfor[courseState.language]}</h3>
                <button onClick={handleStart}>{textButton[courseState.language]}</button>
            </div>
        </div>
    )
}

export default LetterRoute