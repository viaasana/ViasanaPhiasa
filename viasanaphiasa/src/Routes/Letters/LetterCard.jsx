import "./LetterCard.css"
import { useContext, useState } from "react"
import { CourseContext } from "../../context/courseContext"


const LetterCard = ({totalState, state}) => {
    const ControlerText = {Khmer:{prev:"ត្រឡប់", next:"បន្ទាប់"},
                             VietNamese:{prev: "Quay lại", next:"Tiếp"},
                              English:{prev: "Previous", next:"Next"}}
    const notYetLearnState = totalState-state
    const {courseState} = useContext(CourseContext)
    

    return (
        <div className="Letter-card-container">
            <div className="learning-box">
                <div className="video-container">
                    <video src="https://github.com/viaasana/tu_luyen_chu_viet_tieng_khmer_nam_bo/blob/main/video/conconants_video/3.mp4?raw=true" autoPlay controls loop></video>
                    <span>How to write the consonant ឃ </span>
                </div>
                <div className="image-container">
                    <img src="https://github.com/viaasana/tu_luyen_chu_viet_tieng_khmer_nam_bo/blob/main/image/nguyen%20am/3.png?raw=true&quot" alt="" />
                    <span>ឃ្មុំ</span>
                </div>
            </div>
            <div className="controler-box">
                <div className="buttonBox prevButton">&laquo;{ControlerText[courseState.language]["prev"]}</div>
                <div className="buttonBox nameButton">Consonant ឃ</div>
                <div className="buttonBox speakerButton">🔊</div>
                <div className="buttonBox nextButton">{ControlerText[courseState.language]["next"]}&raquo;</div>
            </div>
            <div className="state-box">
                {Array.from({length: state}).map((index)=>(
                    <div key={index} className="stateBar learned"></div>
                ))}
                {Array.from({length: notYetLearnState}).map((index)=>(
                    <div key={index} className="stateBar"></div>
                ))}
            </div>
        </div>
    )
}

export default LetterCard