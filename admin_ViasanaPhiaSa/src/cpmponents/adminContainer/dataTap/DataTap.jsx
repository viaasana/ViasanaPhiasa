import "./DataTap.css"
import Loading from "../../Loading/Loading"
import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import ChapterList from "../../../collection/Chapter/ChapterList"
import CourseContextProvider from "../../../context/courseContext"

const DataTap = () =>{
    const [loading, setLoading] = useState(false)

/////main render

    if(loading){
        return(
            <Loading/>
        )
    }
    return(
        <CourseContextProvider>
            <div className="dataTap">   
                <Routes>
                    <Route path="/" element={<ChapterList/>} />
                </Routes>
            </div>
        </CourseContextProvider>
    )
}

export default DataTap