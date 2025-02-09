import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CourseContext } from '../../context/courseContext';
import "./ViewAssignment.css"

const ViewAssignment = () => {
    const { assignmentId } = useParams();
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState(null);
    const {getTestById} = useContext(CourseContext)
    useEffect(() => {
        // Fetch the assignment data based on the assignmentId
        const fetchAssignment = async () => {
            try {
                const response = await getTestById(assignmentId);
                
                setAssignment(response.message);
            } catch (error) {
                console.error('Error fetching assignment:', error);
            }
        };

        fetchAssignment();
    }, [assignmentId]);

    if (!assignment) {
        return <div>Loading...</div>;
    }

    return (
        <div className="ViewAssignment-container">
            <h1 className="title">Assignment Details</h1>

            {/* Assignment Title */}
            <div className="assignment-title">
                <h2>Title:</h2>
                {["Vietnamese", "Khmer", "English"].map((lang) => (
                    <p key={lang}>{assignment.nameRes[lang]}</p>
                ))}
            </div>

            {/* Questions */}
            <div className="questions-list">
                <h2>Questions:</h2>
                {assignment.questions.map((question, qIndex) => (
                    <div key={qIndex} className="question-container">
                        <h3>Question {qIndex + 1}:</h3>
                        {["Vietnamese", "Khmer", "English"].map((lang) => (
                            <p key={lang}>{question.content[lang]}</p>
                        ))}

                        {/* Answers */}
                        <div className="answers-list">
                            <h4>Answers:</h4>
                            <div className="answer-container correct-answer">
                                {["Vietnamese", "Khmer", "English"].map((lang) => (
                                    <p key={lang}>{question.trueAsw[lang]}</p>
                                ))}
                                <p className='correct-answer'>✅ Correct</p>
                            </div>

                            {[question.falseAsw1, question.falseAsw2, question.falseAsw3].map((falseAsw, aIndex) => (
                                <div key={aIndex} className="answer-container incorrect-answer">
                                    {["Vietnamese", "Khmer", "English"].map((lang) => (
                                        <p key={lang}>{falseAsw[lang]}</p>
                                    ))}
                                    <p className='incorrect-answer'>❌ Incorrect</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Back Button */}
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-back"
            >
                Back
            </button>
        </div>
    );
};

export default ViewAssignment;