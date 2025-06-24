import "./StudentAssignment.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseContext } from "../../../context/courseContext";
import { toast } from "react-toastify";
import Loading from "../../../component/Loading/Loading";

const StudentAssignment = () => {
    const navigate = useNavigate();
    const { AssignmentId } = useParams();
    const { getTestById, courseState, checkIfAssignmentSubmited, submitAnswer } = useContext(CourseContext);
    const [loading, setLoading] = useState(true);
    const [assignment, setAssignment] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [trueAnswers, setTrueAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);

    const texts = {
        btn_back: { English: "Back", Vietnamese: "Quay lại", Khmer: "ត្រលប់" },
        btn_submit: { English: "Submit", Vietnamese: "Nộp", Khmer: "ដាក់ស្នើ" },
        lble_Question: { English: "Question", Vietnamese: "Câu hỏi", Khmer: "សំណួរ" },
        lbl_score: { English: "Score:", Vietnamese: "Điểm số:", Khmer: "ពិន្ទុ៖" },
        lbl_submitted: {
            English: "Assignment submitted! Check your answers.",
            Vietnamese: "Bài tập đã nộp! Kiểm tra câu trả lời của bạn.",
            Khmer: "ការងារបានដាក់ស្នើ! ពិនិត្យចម្លើយរបស់អ្នក។"
        }
    };

    const shuffleAnswers = (question) => {
        let validAnswers = question.answers.filter(ans => ans !== null);
        let correctAnswer = validAnswers.shift();

        for (let i = validAnswers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [validAnswers[i], validAnswers[j]] = [validAnswers[j], validAnswers[i]];
        }

        let randomIndex = Math.floor(Math.random() * (validAnswers.length + 1));
        validAnswers.splice(randomIndex, 0, correctAnswer);

        return { ...question, answer: validAnswers };
    };

    const fetchData = async () => {
        setLoading(true);
        const res = await getTestById(AssignmentId);
        const isSubmited = await checkIfAssignmentSubmited(AssignmentId);
        
        setSubmitted(isSubmited.AssignmentSubmitted);
        if (isSubmited.AssignmentSubmitted) {
            setAnswers(isSubmited.userAnswers);
            setTrueAnswers(isSubmited.trueAnswers);
            setScore(isSubmited.score);
        }

        if (res.success) {
            setAssignment({
                nameRes: res.message.nameRes,
                questions: res.message.questions.map(q => shuffleAnswers(q))
            });
        } else {
            toast.error(res);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSelect = (questionId, answerId) => {
        setAnswers(prev => ({ ...prev, [questionId]: answerId }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        const res = await submitAnswer(AssignmentId, answers);

        if (res.success) {
            toast.success(res.message);
            setScore(res.score);
            setSubmitted(true);
        } else {
            toast.error('Failed to submit answers.');
        }
        setLoading(false);
    };

    useEffect(() => {
        console.log("Updated assignment:", assignment);
    }, [assignment]);  // Runs when `assignment` updates
    

    const convertNumerals = (num, language) => {
        const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
        return (language === "Khmer" || language === "km") ? num.toString().split('').map(digit => khmerDigits[digit]).join('') : num;
    };

    if (loading || !assignment) return <Loading />;

    return (
        <div className="StudentAssignment-container">
            <h1 className="title">{assignment.nameRes[courseState.language]}</h1>

            {submitted && score !== null && (
                <div className="score-label">
                    <strong>{texts.lbl_score[courseState.language]}{convertNumerals(score, courseState.language)}%</strong>
                </div>
            )}

            <div className="questions-list">
                {assignment.questions.map((question, qIndex) => (
                    <div key={qIndex} className="question-container">
                        <h3>{texts.lble_Question[courseState.language]} {convertNumerals(qIndex + 1, courseState.language)}:</h3>
                        <p>{question.content[courseState.language]}</p>
                        <div className="answers-list">
                            {question.answer.map((answer, aIndex) => {
                                const correctAnswer = trueAnswers.find(item => item._id === question.id)?.trueAnswer;
                                const selectedAnswer = submitted ? answers.find(item => item.questionId === question.id)?.answerId : null;
                                return (
                                    answer && (
                                        <div
                                            key={aIndex}
                                            className={`answer-container ${submitted
                                                ? correctAnswer === answer.id
                                                    ? 'correct'  // Highlight correct answer
                                                    : (selectedAnswer === answer.id ? 'incorrect' : '')
                                                : ''
                                                }`}
                                        >
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`question-${qIndex}`}
                                                    value={answer.id}
                                                    onChange={() => !submitted && handleSelect(question.id, answer.id)}
                                                    disabled={submitted}
                                                />
                                                {answer.text[courseState.language]}
                                            </label>
                                        </div>
                                    )
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {submitted ? (
                <p className="result-message">{texts.lbl_submitted[courseState.language]}</p>
            ) : (
                <button onClick={handleSubmit} className="btn btn-submit">
                    {texts.btn_submit[courseState.language]}
                </button>
            )}

            <button onClick={() => navigate(-1)} className="btn btn-back">{texts.btn_back[courseState.language]}</button>
        </div>
    );
};

export default StudentAssignment;
