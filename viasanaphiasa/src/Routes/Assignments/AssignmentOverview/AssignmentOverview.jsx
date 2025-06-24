import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CourseContext } from "../../../context/courseContext";
import { useNavigate, useParams } from "react-router-dom";
import "./AssignmentOverview.css";
import { toast } from "react-toastify";

const AssignmentOverview = () => {
    const navigate = useNavigate();
    const { userGetTestOverView, courseState } = useContext(CourseContext);

    const Taptitle_text = { Vietnamese: "Các bài tập: ", Khmer: "ទូទៅនៃកិច្ចការ៖", English: "Assignments Overview:" };
    const columns_title = {
        title: { English: "Title", Vietnamese: "Tiêu đề", Khmer: "ចំណងជើង" },
        Groups: { English: "User Groups", Vietnamese: "Nhóm người dùng", Khmer: "ក្រុមអ្នកប្រើ" },
        Questions: { English: "Questions", Vietnamese: "Câu hỏi", Khmer: "សំណួរ" },
        Score: { English: "Score", Vietnamese: "Điểm số", Khmer: "ពិន្ទុ" },
        Actions: { English: "Actions", Vietnamese: "Hành động", Khmer: "សកម្មភាព" }
    };

    const buttonText = {
        doAssignment: { English: "Do Assignment", Vietnamese: "Làm bài tập", Khmer: "ធ្វើកិច្ចការ" },
        view: { English: "View", Vietnamese: "Xem", Khmer: "មើល" }
    };

    const [loading, setLoading] = useState(false);
    const [assignments, setAssignments] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        const res = await userGetTestOverView();
        setLoading(false);
        if (res.success) {
            setAssignments(res.assignments);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAction = (testId) => {
        navigate(testId);
    };

    if (loading) return <p>Loading assignments...</p>;

    return (
        <>
            <div className="Assignment-tap-title">{Taptitle_text[courseState.language]}</div>
            <div className="assignment-overview-container">
                <table className="assignment-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{columns_title.title[courseState.language]}</th>
                            <th>{columns_title.Groups[courseState.language]}</th>
                            <th>{columns_title.Questions[courseState.language]}</th>
                            <th>{columns_title.Score[courseState.language]}</th>
                            <th>{columns_title.Actions[courseState.language]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="no-data">
                                    No assignments available
                                </td>
                            </tr>
                        ) : (
                            assignments.map((assignment, index) => {
                                const isSubmitted = assignment.score !== "-"; // Check if assignment is submitted
                                return (
                                    <tr key={assignment.id}>
                                        <td>{index + 1}</td>
                                        <td>{assignment.name[courseState.language] || "Untitled"}</td>
                                        <td>{assignment.userGroups ? assignment.userGroups.join(", ") : "None"}</td>
                                        <td>{assignment.questions || 0}</td>
                                        <td>{assignment.score}{assignment.score!="-"?"%":""}</td>
                                        <td>
                                            <button 
                                                className={`btn ${isSubmitted ? "btn-view" : "btn-do"}`} 
                                                onClick={() => handleAction(assignment.id)}
                                            >
                                                {isSubmitted 
                                                    ? buttonText.view[courseState.language] 
                                                    : buttonText.doAssignment[courseState.language]}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AssignmentOverview;
