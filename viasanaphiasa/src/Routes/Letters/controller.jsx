import "./Controller.css"
import { Speaker, NextIcon, PrevIcon } from "../../assets/Icon"
import { CourseContext } from "../../context/courseContext"
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Controller = () => {
    const {courseState, setCurentLearn} = useContext(CourseContext)
    const length = courseState.LetterInstant?courseState.LetterInstant.length:0
    const [state, setState] = useState(courseState.LetterInstant?courseState.LetterInstant.indexOf(courseState.curentLearn):0)
    const [notYetLearnState, setNotYetLearnState] = useState(length-state)
    const [nextButtonDisable, setNextButtonDisable]  = useState((state>=length)?true:false)
    const [prevButtonDisable, setPrevButtonDisable] = useState((state==0)?true:false)
    const navigate = useNavigate()
    const location = useLocation()


    useEffect(()=>{
        const currentIndex = courseState.LetterInstant?courseState.LetterInstant.findIndex(
            (item) => item.id === courseState.curentLearn
        ):0;
        setState(currentIndex)
        setNotYetLearnState(length-state)
        setNextButtonDisable((state>=length)?true:false)
        setPrevButtonDisable((state==0)?true:false)
    },[courseState.curentLearn, location, courseState.LetterInstant])

    const handleNext =()=>{
        setCurentLearn(courseState.LetterInstant[state+1])
        navigate(`./${courseState.LetterInstant[state+1].id}`)
    }
    const handlePrev =()=>{
        setCurentLearn(courseState.LetterInstant[state-1])
        navigate(`./${courseState.LetterInstant[state-1].id}`)
    }

    return (    
        <>
            <div className="controler-box">
                <div className="buttonBox prevButton" onClick={!prevButtonDisable?handlePrev:()=>{}}>
                    <PrevIcon disable={prevButtonDisable}/>
                </div>
                <div className="buttonBox nameButton">
                    {(courseState.LetterInstant[state])&&<span>{courseState.LetterInstant[state].name}</span>}
                </div>
                <div className="buttonBox speakerButton">
                    <Speaker audioSrc={courseState.sound}/>
                </div>
                <div className="buttonBox nextButton" onClick={!nextButtonDisable?handleNext:()=>{}}>
                    <NextIcon disable={nextButtonDisable}/>
                </div>
            </div>
            <div className="state-box">
                {Array.from({ length: state }).map((index) => (
                    <div key={index} className="stateBar learned"></div>
                ))}
                {Array.from({ length: notYetLearnState }).map((index) => (
                    <div key={index} className="stateBar"></div>
                ))}
            </div>
        </>
    )
}


export default Controller