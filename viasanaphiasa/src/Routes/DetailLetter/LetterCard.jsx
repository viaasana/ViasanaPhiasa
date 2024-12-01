import "./LetterCard.css"
import { useContext, useState } from "react"
import { CourseContext } from "../../context/courseContext"


const LetterCard = ({totalState, state, data}) => {
    const ControlerText = {Khmer:{prev:"ត្រឡប់", next:"បន្ទាប់"},
                             VietNamese:{prev: "Quay lại", next:"Tiếp"},
                              English:{prev: "Previous", next:"Next"}}
    const notYetLearnState = totalState-state
    const {courseState} = useContext(CourseContext)
    const video = data.video
    const image = data.image
    const name = data.name
    const {videoUrl, videoDesc} = video
    const {imageUrl, imageDesc} = image

    

    return (
        <div className="Letter-card-container">
            <div className="learning-box">
                <div className="video-container">
                    <video src={videoUrl} autoPlay controls loop></video>
                    <span>{videoDesc}</span>
                </div>
                <div className="image-container">
                    <img src={imageUrl} alt="" />
                    <span>{imageDesc}</span>
                </div>
            </div>
            <div className="controler-box">
                <div className="buttonBox prevButton">&laquo;{ControlerText[courseState.language]["prev"]}</div>
                <div className="buttonBox nameButton">{name}</div>
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