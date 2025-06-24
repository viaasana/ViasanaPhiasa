import "./Controller.css"
import { Speaker, NextIcon, PrevIcon } from "../../assets/Icon"
import { CourseContext } from "../../context/courseContext"
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Controller = () => {
    const { courseState, setCurentLearn, setIsLoading, getIndex } = useContext(CourseContext)
    const [length, setLength] = useState(courseState.LetterInstant ? courseState.LetterInstant.length : 0 )
    const [state, setState] = useState(courseState.LetterInstant ?
                                        courseState.LetterInstant.indexOf(item=>item.id == courseState.curentLearn) :
                                        0)
    const [notYetLearnState, setNotYetLearnState] = useState(length - state)
    const [nextButtonDisable, setNextButtonDisable] = useState((state >= length) ? true : false)
    const [prevButtonDisable, setPrevButtonDisable] = useState((state == 0) ? true : false)
    const navigate = useNavigate()

    useEffect(() => {
        const currentIndex = getIndex()
        setState(currentIndex)
        setLength(courseState.LetterInstant ? courseState.LetterInstant.length : 0)
        setNotYetLearnState(length - state)
        setNextButtonDisable((state >= length-1) ? true : false)
        setPrevButtonDisable((state <= 0) ? true : false)
    }, [courseState.curentLearn, courseState.LetterInstant])

    const handleNext = () => {
        setIsLoading(true)
        console.log(courseState.curentLearn)
        console.log(courseState.LetterInstant)
        const nextState = courseState.LetterInstant[state + 1]
        navigate(`./${nextState.id}`)
    }
    const handlePrev = () => {
        setIsLoading(true)
        const prevState = courseState.LetterInstant[state - 1]
        navigate(`./${prevState.id}`)
    }

    return (
        <>
            <div className="controler-box">
                <div className="buttonBox prevButton" onClick={!prevButtonDisable ? handlePrev : () => { }}>
                    <PrevIcon disable={prevButtonDisable} />
                </div>
                <div className="buttonBox nameButton">
                    {(courseState.LetterInstant[state]) && <span>{courseState.LetterInstant[state].name[courseState.language]}</span>}
                </div>
                <div className="buttonBox speakerButton">
                    <Speaker audioSrc={courseState.sound} />
                </div>
                <div className="buttonBox nextButton" onClick={!nextButtonDisable ? handleNext : () => { }}>
                    <NextIcon disable={nextButtonDisable} />
                </div>
            </div>
            <div className="state-box">
                {Array.from({ length: state+1 }).map((index) => (
                    <div key={index} className="stateBar learned"></div>
                ))}
                {Array.from({ length: notYetLearnState-1 }).map((index) => (
                    <div key={index} className="stateBar"></div>
                ))}
            </div>
        </>
    )
}


export default Controller