import { CourseContext } from "../../context/courseContext"
import { useContext, useEffect } from "react"

const ChapterList = () => {
    const { courseState, loadChapter } = useContext(CourseContext)

    useEffect(() => {
        const fechData = async()=>{
            await loadChapter()
        }
        fechData()
    }, [])
    let body = (
        <>
            <div className="TapTitle">Data {">"} chapter</div>
            <div className="list">
                
            </div>
        </>
    )

    return <>{body}</>
}


export default ChapterList