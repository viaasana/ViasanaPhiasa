import "./Loading.css"

const Loading = ()=>{
    const text = "កខគឃងហឡអ"
    const arrText = text.split('')
    return(
        <div className="loading">
            <div className="tiltle">Loading.....</div>
            <div className="text">
                {
                    arrText.map((char,i)=>{
                        return(
                            <span style={{transform: "rotate("+ (i*360/arrText.length)+ "deg)"}} >{char}</span>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default Loading
