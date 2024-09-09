import { CourseContext } from "../../context/courseContext";
import { useContext, useEffect, useState } from "react";
import AddNewDocument from "../../cpmponents/addNewDocument/addNewDocument";
import Chapter from "./Chapter";
import Loading from "../../cpmponents/Loading/Loading";
import { useNavigate } from "react-router-dom";

const ChapterList = () => {
    const { courseState, loadChapter,setIsLoading } = useContext(CourseContext);
    const [Chapters, setChapters] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            await loadChapter();
            const sortedData = [...courseState.colection].sort((a, b)=> a.name.localeCompare(b.name));
            const chapterInstances = sortedData.map(data => new Chapter(data, navigate, setIsLoading));
            setChapters(chapterInstances);
        };

        fetchData();
    });
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
