import { CourseContext } from "../../context/courseContext"
import { useContext } from "react"
import "./siteAbove.css"

const SiteAbove = ({scrollToAuth})=>{
    const {courseState} = useContext(CourseContext)
    const text= {
        English: {
            button: "Sign in/Sign up →"
        },  
        Khmer: {
            button: "ចូល/ចុះឈ្មោះ →"
        },
        
        VietNamese: {
            button: "Đăng Nhập/Đăng Ký →"
        }
        
    }
    const curentText  = text[courseState.language] || text.VietNamese
    return(
        <div className="site-above">
            <button onClick={scrollToAuth}>
                {curentText.button}
            </button>
        </div>
        
    )
}

export default SiteAbove