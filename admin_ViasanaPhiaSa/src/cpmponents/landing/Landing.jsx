import { useNavigate } from "react-router-dom"

const  Landing = ()=>{
    const navigateTo =useNavigate()
    const handleClickButton = ()=>{
        navigateTo("/login")
    
    }
    return (
    <>
        <div>you are landing</div>
        <button  onClick={()=>handleClickButton()}>click to login</button>
    </>
    )
}

export default Landing