import { useEffect, useContext, useState } from "react";
import { CourseContext } from "../../context/courseContext";
import { toast } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";
import Letter from "./Letter";
import "./DetailLetter.css";
import Loading from "../../component/Loading/Loading";
import { AuthContext } from "../../context/authContext";

const DetailLetter = () => {
    const textError = {
        VietNamese: "Có lỗi xảy ra khi tải chi tiết bài học",
        Khmer: "មិនអាចទទួលបានព័ត៌មានលម្អិត",
        English: "Error occurred when loading lesson details",
    };

    const { courseState, loadLetter, loadDetailLetter, detailLetterNoVideoAndSound, setCurentLearn, setLetterInstant } =
        useContext(CourseContext);
    const { authState } = useContext(AuthContext);

    // Get parameters at the top level
    const { chapter, lesson, letter } = useParams();
    const [chapterId, chapterName] = chapter.split("name=")
    const [lessonId, lessonName] = lesson.split("name=");
    const letterId = letter;

    const location = useLocation();

    const [haveData, setHaveData] = useState(false);
    const [detail, setDetail] = useState();

    // Fetch detailed data when route changes or authentication state updates
    useEffect(() => {
        const fetchData = async () => {
            await loadLetter(chapterId, lessonId)
            if (courseState.colection?.length) {
                const sortedData = [...courseState.colection].sort((a, b) =>
                    a.createAt.localeCompare(b.createAt)
                );
                const LetterInstant = sortedData.map(data => new Letter(data));
                setLetterInstant(LetterInstant)
            }
            const res = await loadDetailLetter(lessonId, letterId);
            if (res.success) {
                setHaveData(true);
            } else if (!res || res.status != 401) {
                toast.error(res.message)
                // toast.error(textError[courseState.language]);
                setHaveData(false);
            }
        };
        fetchData();
    }, [authState.isAuthenticated, location]);

    // Fetch additional details without video and sound when language changes
    useEffect(() => {
        const fetchData = async () => {
            const res = await detailLetterNoVideoAndSound(lesson, letterId);
            if (res.success) {
                setHaveData(true);
            } else if (!res || res.status != 401) {
                toast.error(res.message)
                // toast.error(textError[courseState.language]);
                // setHaveData(false);
            }
        };
        fetchData();
    }, [courseState.language]);

    useEffect(() => {
        if (courseState.colection?.length) {
            const sortedData = [...courseState.colection].sort((a, b) =>
                a.createAt.localeCompare(b.createAt)
            );
            const LetterInstant = sortedData.map(data => new Letter(data));
            setLetterInstant(LetterInstant)
        }
    }, [courseState.colection])

    // Update the current learning letter when route changes
    useEffect(() => {
        setCurentLearn(letterId);
    }, [location]);

    // Create and set the `Letter` instance when data is ready
    useEffect(() => {
        if (haveData) {
            const doc = {
                id: letterId,
                video: courseState.video,
                image: courseState.image,
                sound: courseState.sound,
            };
            const letterInstant = new Letter(doc);
            setDetail(letterInstant);
        }
    }, [haveData, letterId, courseState]);
    console.log("have data:", haveData)
    console.log("image state: ", courseState.image)

    // Show a loading indicator if data is not yet available
    if (courseState.isLoading || !haveData) {
        return <Loading />;
    }

    // Render the detail card
    return (
        <div className="detail-container">
            {detail && detail.renderCard()}
        </div>
    );
};

export default DetailLetter;
