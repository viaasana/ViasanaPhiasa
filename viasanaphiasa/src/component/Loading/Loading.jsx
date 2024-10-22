import "./Loading.css"

const Loading = ()=>{
    const text = "កខគឃងហឡអ"
    const arrText = text.split('')
    return(
        <div className="loadingContainer">
            <div className="loading">
                <div className="tiltle">Loading.....</div>
                <div className="text">
                    {
                        arrText.map((char,i)=>{
                            return(
                                <span key={i} style={{transform: "rotate("+ (i*360/arrText.length)+ "deg)"}} >{char}</span>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}


export default Loading
