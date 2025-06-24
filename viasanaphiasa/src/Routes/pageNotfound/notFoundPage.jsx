import "./notFoundPage.css";
import PageNotFoundIMG from "../../assets/PagenotfoundIcon.png";
import { useContext } from "react";
import { CourseContext } from "../../context/courseContext";
import { useNavigate } from "react-router-dom";

const translations = {
    English: {
        title: "OOPS! PAGE NOT FOUND",
        message: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
        back: "Go Back Home"
    },
    Khmer: {
        title: "អូហូ! ទំព័រមិនមាន",
        message: "ទំព័រដែលអ្នកកំពុងរកមិនអាចមានត្រូវបានលុបបាត់ មានការផ្លាស់ប្តូរឈ្មោះឬមិនមានបណ្តោះអាសន្ន។",
        back: "ត្រលប់ទៅទំព័រដើម"
    },
    Vietnamese: {
        title: "Ôi! Trang không tồn tại",
        message: "Trang bạn đang tìm kiếm có thể đã bị xóa, thay đổi tên hoặc tạm thời không khả dụng.",
        back: "Quay lại trang chủ"
    }
};

const PageNotFound = () => {
    const { courseState } = useContext(CourseContext);
    const navigate = useNavigate();

    return (
        <div className="container">

            <div className="not-found-container">
                <img className="not-found-img" src={PageNotFoundIMG} alt="Page Not Found" />
                <h1>{translations[courseState.language]?.title || "Page Not Found"}</h1>
                <p>{translations[courseState.language]?.message || "Sorry, this page is unavailable."}</p>
                <button className="back-btn" onClick={() => navigate("/course")}>
                    {translations[courseState.language]?.back || "Go Back Home"}
                </button>
            </div>
        </div>
    );
};

export default PageNotFound;
