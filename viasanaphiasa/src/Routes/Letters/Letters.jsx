import "./Letters.css";
import { CourseContext } from "../../context/courseContext";
import { useContext, useState, useEffect } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import Letter from "../DetailLetter/Letter";
import { AuthContext } from "../../context/authContext";
import LetterLanding from "./lettersLanding";
import Controller from "./controller";
import DetailLetter from "../DetailLetter/DetailLetter";

const LetterRoute = () => {
    const textButton = { VietNamese: "Bắt đầu học", Khmer: "ចាប់ផ្តើម", English: "Start" };
    const textInfor = { VietNamese: "Chữ", Khmer: "អក្សរ", English: "Letter" };

    const { courseState, loadLetter, setCurentLearn, setLetterInstant } = useContext(CourseContext);
    const { authState } = useContext(AuthContext);

    const { chapter, lesson, letter } = useParams(); // Access route params
    const [chapterId, chapterName] = chapter.split("name=");
    const [lessonId, lessonName] = lesson.split("name=");

    const location = useLocation()


    const [Chapters, setChapters] = useState([]);
    const [curent, setCurent] = useState("");

    // Fetch letters when language or authState changes
    useEffect(() => {
        const fetchData = async () => {
            await loadLetter(chapterId, lessonId);
        };
        fetchData();
    }, [courseState.language, authState, location]);

    // Sort and prepare letters when collection changes
    useEffect(() => {
        if (courseState.colection?.length) {
            const sortedData = [...courseState.colection].sort((a, b) =>
                a.createAt.localeCompare(b.createAt)
            );
            const LetterInstant = sortedData.map(data => new Letter(data));
            setChapters(LetterInstant);
            setLetterInstant(LetterInstant)

            // Set default current letter
            setCurentLearn(courseState.LetterInstant[0]?.id || "");
        }
    }, [courseState.colection]);



    return (
        <div className="letter-container">
            <Routes>
                <Route
                    index
                    element={
                        <LetterLanding
                            lessonName={lessonName}
                            length={courseState.LetterInstant.length}
                            lengthDesc={textInfor[courseState.language]}
                            buttonName={textButton[courseState.language]}
                        />
                    }
                />
                <Route path="/:letter" element={<DetailLetter />} />
            </Routes>
            <Controller list={courseState.colection} curent={curent} />
        </div>
    );
};

export default LetterRoute;
