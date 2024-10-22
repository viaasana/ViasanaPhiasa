import "./Course.css"
import MyFooter from "../../component/footer/MyFooter"
import MyHeader from "../../component/header/MyHeader"
import { ProtectedRoute } from "../../component/routing/protectedRoute"

const Course = () => {
    ProtectedRoute();//check if loged in
    return (
        <>
            <MyHeader />
            <div className="course-container">
                this is course route 
            </div>
            <MyFooter />
        </>
    )
}

export default Course