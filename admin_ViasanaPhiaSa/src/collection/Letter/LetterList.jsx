import { useContext, useEffect, useState } from "react"
import { CourseContext } from "../../context/courseContext"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Letter from "./Letter"
import Loading from "../../cpmponents/Loading/Loading"
import AddNewDocument from "../../cpmponents/addNewDocument/addNewDocument"

const LetterList = ()=>{
    const {courseState, loadLetter, setIsLoading} = useContext(CourseContext)
    const [letters, setLetters] = useState([])
    const {chapter, lesson} = useParams()
    const [chapterId, chapterName] = chapter.split("name=")
    const [lessonId, lessonName] = lesson.split("name=")
    const [inPageLoading, setInPageLoading] = useState(courseState.isLoading)
    const [corectColectionName, setCorectColectionName] = useState(0)
    const navigate = useNavigate()
    
    useEffect(()=>{
        const fetchData = async()=>{
            await loadLetter(chapterId, lessonId)
            const sortedData = [...courseState.colection].sort((a, b) => a.name.localeCompare(b.name))
            const letterInstances = sortedData.map(data=> new Letter(data, navigate, setIsLoading))
            setLetters(letterInstances)
        }
        fetchData()
        if (letters[0]) {
            const curentColectionName = letters[0].name.split(' ')[0]
            if (curentColectionName != "Letter") {
                setInPageLoading(true)
                setCorectColectionName(0)
            }
            else {
                setCorectColectionName(corectColectionName + 1)
                if (corectColectionName >= 30) {
                    setInPageLoading(false)
                    setCorectColectionName(30)
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
    if(courseState.isLoading || inPageLoading)
        return <Loading/>
    return (
        <>
            <div className="TapTitle">Data{">"}{chapterName}{">"}{lessonName}</div>
            <div className="list">
                {letters.length > 0 ? letters.map((letter, index) => (
                    letter.renderCard(index)
                )) : ""}
                <AddNewDocument />
            </div>
        </>
    )
}

export default LetterList