import "./UserTap.css"
import Table from "../../Table/Table";
import { CourseContext } from "../../../context/courseContext";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UserTap = () => {
    const location = useLocation()
    const { courseSate, getUerList } = useContext(CourseContext)
    const columns = ['Name', 'Email', 'ID', 'Progress', "Actions"];

    const [data, setData] = useState()

    const fetch = async () => {
        const res = await getUerList()
        setData(res.users)
    }
    useEffect(() => {
        fetch()
    }, [])
    return (
        <div className="user-container">
            <div className="user-overview-container">
                <div className="title">Users</div>
                <div className="table-container">
                    {data && <Table columns={columns} data={data} onDelete={fetch}/>}
                </div>
            </div>
        </div>
    )
}

export default UserTap