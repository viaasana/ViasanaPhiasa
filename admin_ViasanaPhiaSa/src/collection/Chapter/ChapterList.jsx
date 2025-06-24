import { CourseContext } from "../../context/courseContext";
import { useContext, useEffect, useState } from "react";
import AddNewDocument from "../../cpmponents/addNewDocument/addNewDocument";
import Chapter from "./Chapter";
import Loading from "../../cpmponents/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const ChapterList = () => {
    const { courseState, loadChapter, setIsLoading } = useContext(CourseContext);
    const [Chapters, setChapters] = useState([]);
    const navigate = useNavigate()
    const [inPageLoading, setInPageLoading] = useState(courseState.isLoading)
    const [corectColectionName, setCorectColectionName] = useState(0)
    const {authState} = useContext(AuthContext)


    useEffect(() => {
        const fetchData = async () => {
            await loadChapter();
            const sortedData = [...courseState.colection].sort((a, b) => a.name.English.localeCompare(b.name));
            const chapterInstances = sortedData.map(data => new Chapter(data, navigate, setIsLoading));
            setChapters(chapterInstances);
        };

        fetchData();

        if (Chapters[0]) {
            const curentColectionName = Chapters[0].name.English.split(' ')[0]
            if (curentColectionName != "Chapter") {
                setInPageLoading(true)
                setCorectColectionName(0)
            }
            else {
                setCorectColectionName(corectColectionName + 1)
                if (corectColectionName >= 10) {
                    setInPageLoading(false)
                    setCorectColectionName(10)
                }
            }
        }else{
            setInPageLoading(true)
        }
    }, [courseState.isLoading, authState]);
    

    if (courseState.isLoading)
        return <Loading />;

    return (
        <>
            <div className="TapTitle">Data {">"} chapter</div>
            <div className="list">
                {Chapters.length > 0 ? Chapters.map((chapter) => (
                    chapter.renderCard()
                )) : ""}
                <AddNewDocument />
            </div>
        </>
    );
};

export default ChapterList;
