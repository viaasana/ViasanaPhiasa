import "./Course.css"
import { CourseContext } from "../../context/courseContext"
import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Loading from "../../component/Loading/Loading"
import Chapter from "./Chapter"

const CourseContainer = () => {
    const Taptitle_text = {Vietnamese: "Các phần học: ",Khmer: "ផ្នែកសិក្សា៖",  English: "Study sections:"}
    const { courseState, loadChapter, setIsLoading, setLanguage } = useContext(CourseContext);
    const [Chapters, setChapters] = useState([]);
    const navigate = useNavigate()
    const [inPageLoading, setInPageLoading] = useState(courseState.isLoading)
    const [corectColectionName, setCorectColectionName] = useState(0)

    useEffect(() => {
        console.log("fetching data")
        const fetchData = async () => {
            await loadChapter();
            const sortedData = [...courseState.colection].sort((a, b) => a.name.localeCompare(b.name));
            const chapterInstances = sortedData.map(data => new Chapter(data, navigate, setIsLoading));
            setChapters(chapterInstances);
        };

        fetchData();

        if (Chapters[0]) {
            const curentColectionName = Chapters[0].name.split(' ')[0]
            if (curentColectionName != "Chapter") {
                setInPageLoading(true)
                setCorectColectionName(0)
            }
            else {
                setCorectColectionName(corectColectionName + 1)
                if (corectColectionName >= 10) {
                    setInPageLoading(false)
                    setCorectColectionName(10)
                }
            }
        }
    }, [courseState]);

    if(courseState.isLoading)
        setLanguage(courseState.language)
    console.log(courseState.language)

    if (courseState.isLoading)
        return <Loading />;

    return (
        <div className="course-container">
            <div className="Taptitle">{Taptitle_text[courseState.language]}</div>
            <div className="list">
                {Chapters.length>0?Chapters.map((chapter) => (
                    chapter.renderCard()
                )) : ""}
                {Chapters.length>0?Chapters.map((chapter) => (
                    chapter.renderCard()
                )) : ""}    
            </div>
        </div>
    )
}

export default CourseContainer