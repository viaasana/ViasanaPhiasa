import "./Dashboard.css"
import { useState, useEffect } from "react"
import { useContext } from "react";
import { CourseContext } from "../../../context/courseContext";
import { useLocation } from "react-router-dom";

const ProgressCircle = ({ percentage, lable, color }) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);

    

    useEffect(() => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1; 
            setAnimatedPercentage(progress);

            if (progress >= percentage) {
                clearInterval(interval);
            }
        }, 10); 

        return () => clearInterval(interval);
    }, [percentage]);

    const deg = 360 * percentage / 100

    return (
        <div className="progress-circle">
            <div className="circle-content" style={{
                background: `conic-gradient(${color} ${animatedPercentage * 3.6}deg, #e0e0e0 ${animatedPercentage * 3.6}deg)`
            }}>
                <span className="percentage">
                    {percentage}%
                </span>
            </div>
            <p>{lable}</p>
        </div>
    )


}


const DashBoard = () => {
    const [statUser, setStatUser] = useState(0)
    const [statEvent, setStatEvent] = useState(0)
    const [statChapter, setStatChapter] = useState(1)

    const location = useLocation()
    const {courseSate, getUerList} = useContext(CourseContext)
    const columns = ['Name', 'Email', 'ID', 'Progress', "Edit"];

    const [length, setLength] = useState(0)
        
    useEffect(()=>{
        const fetch = async()=>{
            const res =await getUerList()
            setStatUser(res.users.length)
        }
        fetch()
    },[location])

    return (
        <div className="dashboard-container">
            <div className="title">Dashboard</div>
            <div className="stats-container">
                <div className="stat-item user">
                    <span>Users: <br />{statUser}</span>
                    <div className="icon-container">
                        <img src="https://img.icons8.com/ios-filled/50/000000/user-group-man-man.png" alt="users-icon" className="icon" />
                    </div>
                </div>
                <div className="stat-item event">
                    <span>Events: <br />{statEvent}</span>
                    <div className="icon-container">
                        <img src="https://img.icons8.com/ios-filled/50/000000/calendar.png" alt="events-icon" className="icon" />
                    </div>
                </div>
                <div className="stat-item chapter">
                    <span>Chapters: <br />{statChapter}</span>
                    <div className="icon-container">
                        <img src="https://img.icons8.com/ios-filled/50/000000/book.png" alt="lessons-icon" className="icon" />
                    </div>
                </div>
            </div>
            <div className="progress-container">

                <ProgressCircle percentage={30} lable="User completed" color="#6485E5" />
                <ProgressCircle percentage={100} lable="User finish game" color="#3963DD" />

            </div>
        </div>
    )
}

export default DashBoard