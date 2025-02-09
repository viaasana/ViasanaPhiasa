import React, { useState } from "react";
import { useContext } from "react";
import { CourseContext } from "../../context/courseContext";
import "./AddAssignmentPage.css";
import Loading from "../../cpmponents/Loading/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddAssignmentPage = () => {
    const languageMapToBackend = {
        vi: "Vietnamese",
        km: "Khmer",
        en: "English",
    };
    const { getGroups, addTest, courseState, addQuestion } = useContext(CourseContext)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [assignment, setAssignment] = useState({
        title: { vi: "", km: "", en: "" },
        questions: [],
    });
    const [userGroups, setUserGroups] = useState([]);
    const availableGroups = ["Group A", "Group B", "Group C", "Group D"]; // Example groups

    const handleGroupSelection = (e) => {
        const { value, checked } = e.target;
        setUserGroups((prev) =>
            checked ? [...prev, value] : prev.filter((group) => group !== value)
        );
    };

    const handleToggleSelectAll = () => {
        if (userGroups.length === availableGroups.length) {
            // Deselect all groups
            setUserGroups([]);
        } else {
            // Select all groups
            setUserGroups([...availableGroups]);
        }
    };

    const handleAddQuestion = () => {
        setAssignment((prev) => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    text: { vi: "", km: "", en: "" },
                    answers: [
                        { text: { vi: "", km: "", en: "" }, isCorrect: false },
                        { text: { vi: "", km: "", en: "" }, isCorrect: false },
                        { text: { vi: "", km: "", en: "" }, isCorrect: false },
                        { text: { vi: "", km: "", en: "" }, isCorrect: false },
                    ],
                },
            ],
        }));
    };

    const handleDeleteQuestion = (questionIndex) => {
        setAssignment((prev) => {
            const newQuestions = [...prev.questions];
            newQuestions.splice(questionIndex, 1);
            return { ...prev, questions: newQuestions };
        });
    };

    const handleInputChange = (e, path) => {
        const { name, value } = e.target;
        setAssignment((prev) => {
            const newState = { ...prev };
            const keys = path.split(".");
            let current = newState;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newState;
        });
    };

    const handleAnswerChange = (e, questionIndex, answerIndex, field) => {
        const { value, type, checked } = e.target;
        setAssignment((prev) => {
            const newQuestions = [...prev.questions];
            const newAnswers = [...newQuestions[questionIndex].answers];
            
            if (type === "checkbox") {
                // Handle the correct answer checkbox
                newAnswers.forEach((ans, idx) => {
                    newAnswers[idx].isCorrect = idx === answerIndex ? checked : false;
                });
            } else {
                // Handle the text input fields
                const keys = field.split(".");
                let current = newAnswers[answerIndex];
                for (let i = 0; i < keys.length - 1; i++) {
                    current = current[keys[i]];
                }
                current[keys[keys.length - 1]] = value;
            }

            newQuestions[questionIndex].answers = newAnswers;
            return { ...prev, questions: newQuestions };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const res = await addTest(assignment.title)
        if (res.success) {
            const testId = res.testId || null
            if (!testId)
                toast.error(res.message)
            else
                try {
                    await Promise.all(
                        assignment.questions.map(async (question) => {
                            let content, trueAnswer, falseAnswer1, falseAnswer2, falseAnswer3
                            content = { [languageMapToBackend.vi]: question.text.vi, [languageMapToBackend.km]: question.text.km, [languageMapToBackend.en]: question.text.en }
                            const answer = question.answers.find(answer => answer.isCorrect)
                            trueAnswer = { [languageMapToBackend.vi]: answer.text.vi, [languageMapToBackend.km]: answer.text.km, [languageMapToBackend.en]: answer.text.en }
                            const falseAnswers = question.answers.filter(answer => !answer.isCorrect)
                            const [t1, t2, t3] = falseAnswers
                            falseAnswer1 = { [languageMapToBackend.vi]: t1.text.vi, [languageMapToBackend.km]: t1.text.km, [languageMapToBackend.en]: t1.text.en }
                            falseAnswer2 = { [languageMapToBackend.vi]: t2.text.vi, [languageMapToBackend.km]: t2.text.km, [languageMapToBackend.en]: t2.text.en }
                            falseAnswer3 = { [languageMapToBackend.vi]: t3.text.vi, [languageMapToBackend.km]: t3.text.km, [languageMapToBackend.en]: t3.text.en }
                            await addQuestion(testId, content, trueAnswer, falseAnswer1, falseAnswer2, falseAnswer3)
                        })
                    )
                } catch (error) {
                    toast.error(error)
                }

            navigate("..")
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
        setIsLoading(false)
    };

    if (isLoading)
        return <Loading />
    return (
        <div className="AddAssignment-container">
            <h1 className="title">Add Assignment</h1>
            <form onSubmit={handleSubmit}>
                {/* Assignment Title */}
                <div className="form-group">
                    <label className="label">Assignment Title:</label>
                    {["vi", "km", "en"].map((lang) => (
                        <input
                            key={lang}
                            type="text"
                            name={`title.${lang}`}
                            placeholder={`Title (${lang.toUpperCase()})`}
                            value={assignment.title[lang]}
                            onChange={(e) => handleInputChange(e, `title.${lang}`)}
                            className="input"
                        />
                    ))}
                </div>
                {/*Select groups*/}
                <div className="form-group">
                    <label className="label">Assign to User Groups:</label>
                    <button
                        type="button"
                        onClick={handleToggleSelectAll}
                        className="btn btn-select-all"
                    ></button>
                    {availableGroups.map((group) => (
                        <div key={group} className="checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    value={group}
                                    checked={userGroups.includes(group)}
                                    onChange={handleGroupSelection}
                                />
                                {group}
                            </label>
                        </div>
                    ))}
                </div>

                {/* Questions */}
                {assignment.questions.map((question, qIndex) => (
                    <div key={qIndex} className="question-AddAssignment-container">
                        <h2 className="question-title">Question {qIndex + 1}</h2>
                        {["vi", "km", "en"].map((lang) => (
                            <input
                                key={lang}
                                type="text"
                                placeholder={`Question (${lang.toUpperCase()})`}
                                value={question.text[lang]}
                                onChange={(e) => handleInputChange(e, `questions.${qIndex}.text.${lang}`)}
                                className="input"
                            />
                        ))}

                        <h3 className="answer-title">Answers:</h3>
                        {question.answers.map((answer, aIndex) => (
                            <div key={aIndex} className="answer-group">
                                {["vi", "km", "en"].map((lang) => (
                                    <input
                                        key={lang}
                                        type="text"
                                        placeholder={`Answer (${lang.toUpperCase()})`}
                                        value={answer.text[lang]}
                                        onChange={(e) => handleAnswerChange(e, qIndex, aIndex, `text.${lang}`)}
                                        className="input answer-input"
                                    />
                                ))}
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={answer.isCorrect}
                                        onChange={(e) => handleAnswerChange(e, qIndex, aIndex, "isCorrect")}
                                    />
                                    Correct
                                </label>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => handleDeleteQuestion(qIndex)}
                            className="btn btn-delete"
                        >
                            Delete Question
                        </button>
                    </div>
                ))}

                {/* Add Question Button */}
                <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="btn btn-add"
                >
                    Add Question
                </button>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-submit"
                >
                    Submit Assignment
                </button>
                <button
                    type="button"
                    onClick={()=>navigate(-1)}
                    className="btn btn-cancel"
                >Cancle</button>
            </form>
        </div>
    );
};

export default AddAssignmentPage;