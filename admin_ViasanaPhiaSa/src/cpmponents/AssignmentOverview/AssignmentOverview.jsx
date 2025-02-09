import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CourseContext } from "../../context/courseContext";
import { useNavigate, useParams } from "react-router-dom";
import "./AssignmentOverview.css";
import { toast } from "react-toastify";

const AssignmentOverview = () => {
    const navigate = useNavigate();
    const { getTestOverview, deleteTest } = useContext(CourseContext);
    const [loading, setLoading] = useState(false);
    const [assignments, setAssignments] = useState([
        {
            id: "",
            name: {
                Vietnamese: "",
                Khmer: "",
                English: "",
            },
            userGroups: [],
            questions: 0,
        },
    ]);

    // Fetch data function
    const fetchData = async () => {
        setLoading(true);
        const res = await getTestOverview();
        setLoading(false);
        if (res.success) {
            setAssignments(res.assignments);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (testId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this assignment?");
        if (!confirmDelete) return;

        setLoading(true);
        const res = await deleteTest(testId);
        setLoading(false);

        if (res.success) {
            toast.success(res.message);
            fetchData(); // Reload the assignment list after deletion
        } else {
            toast.error(res.error.response.data.message);
        }
    };

    const handleView = async(testId)=>{
        navigate(testId)
    }

    if (loading) return <p>Loading assignments...</p>;

    return (
        <div className="assignment-overview-container">
            <h1 className="title">Assignment Overview</h1>
            <button className="btn btn-add" onClick={() => navigate("post")}>
                +Add Assignment
            </button>
            <table className="assignment-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>User Groups</th>
                        <th>Questions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="no-data">
                                No assignments available
                            </td>
                        </tr>
                    ) : (
                        assignments.map((assignment, index) => (
                            <tr key={assignment.id}>
                                <td>{index + 1}</td>
                                <td>{assignment.name.Vietnamese || "Untitled"}</td>
                                <td>{assignment.userGroups ? assignment.userGroups.join(", ") : "None"}</td>
                                <td>{assignment.questions || 0}</td>
                                <td>
                                    <button className="btn btn-view" onClick={()=>handleView(assignment.id)}>View</button>
                                    <button className="btn btn-edit" >Edit</button>
                                    <button
                                        className="btn btn-delete"
                                        onClick={() => handleDelete(assignment.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AssignmentOverview;