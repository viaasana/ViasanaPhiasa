import "./LetterCard.css"


const LetterCard = ({ data }) => {

    const video = data.video
    const image = data.image
    const { videoUrl, videoDesc } = video
    const { imageUrl, imageDesc } = image


    return (
        <div className="Letter-card-container">
            <div className="learning-box">
                <div className="video-container">
                    <video autoPlay controls loop onError={(e) => console.error("Video error:", e.target)}
                    >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <span>{videoDesc}</span>
                    <audio src=""></audio>
                </div>
                <div className="image-container">
                    <img src={imageUrl} alt="" />
                    <span>{imageDesc}</span>
                </div>
            </div>
        </div>
    )
}

export default LetterCard