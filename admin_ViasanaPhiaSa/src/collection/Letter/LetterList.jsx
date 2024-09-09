import { useContext, useEffect, useState } from "react"
import { CourseContext } from "../../context/courseContext"
import { useParams } from "react-router-dom"
import Letter from "./Letter"
import Loading from "../../cpmponents/Loading/Loading"
import AddNewDocument from "../../cpmponents/addNewDocument/addNewDocument"

const LetterList = ()=>{
    const {courseState, loadLetter} = useContext(CourseContext)
    const [letters, setLetters] = useState([])
    const {chapter, lesson} = useParams()
    const [chapterId, chapterName] = chapter.split("name=")
    const [lessonId, lessonName] = lesson.split("name=")
    
    useEffect(()=>{
        const fetchData = async()=>{
            await loadLetter(chapterId, lessonId)
            const sortedData = [...courseState.colection].sort((a, b) => a.name.localeCompare(b.name))
            const letterInstances = sortedData.map(data=> new Letter(data))
            setLetters(letterInstances)
        }
        fetchData()
    })  
    if(courseState.isLoading)
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