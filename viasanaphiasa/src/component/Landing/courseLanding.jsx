import "./courseLanding.css"
import { placeholderImage } from "../../../public/placeholder_image"
import { CourseContext } from "../../context/courseContext"
import { useContext } from "react";
import landing2 from "../../assets/landing_Image2.jpg"
import landing3 from "../../assets/landing_Image3.jpg"


const CourseCard = ({ image, title, focus, duration, format, description, scroll }) => {
    return (
        <div className="course-card">
            <img src={image} alt={title} className="course-card-image" />
            <div className="course-card-content">
                <h3>{title}</h3>
                <div className="course-card-info">
                    {focus && <span>📘 Focus: {focus} </span>}
                    {duration && <span>⏳ Duration: {duration} </span>}
                    {format && <span>📝 Format: {format} </span>}
                </div>
                <p>{description}</p>
                {scroll && <button className="course-card-btn" onClick={scroll}>→</button>}
                {!scroll && <button className="course-card-btn" >→</button>}
            </div>
        </div>
    );
};


const CourseLanding = ({ scrollToAuth }) => {
    const placeholderUrl = placeholderImage()
    const { courseState } = useContext(CourseContext)
    const text = {
        English: {
            titleSpan: "Courses",
            titleH2: "How to get started?",
            testTittle: "Entrance test",
            testFocus: "Khmer language proficiency.",
            testDuration: "20 minutes",
            testFormat: "Multiple-choice and written questions.",
            testDes: "The Entrance Test is designed to assess your proficiency in the Khmer language.",
            courseTitle: "Start learning from your level",
            courseFormat: "Learn with text, audio and animation",
            courseDes: "Experience a dynamic way of learning through an interactive combination of text, engaging audio, and captivating animations."
        },
        Khmer: {
            titleSpan: "វគ្គសិក្សា",
            titleH2: "តើត្រូវចាប់ផ្តើមដោយរបៀបណា?",
            testTittle: "ការប្រលងចូល",
            testFocus: "សមត្ថភាពភាសាខ្មែរ",
            testDuration: "២០ នាទី",
            testFormat: "សំណួរជ្រើសរើសចម្លើយ និងសំណួរសរសេរ",
            testDes: "ការប្រលងចូលត្រូវបានរចនាឡើងដើម្បីវាយតម្លៃសមត្ថភាពភាសាខ្មែររបស់អ្នក។",
            courseTitle: "ចាប់ផ្តើមសិក្សាតាមកម្រិតរបស់អ្នក",
            courseFormat: "សិក្សាជាមួយអត្ថបទ សម្លេង និងអានីម៉េសិន",
            courseDes: "មានបទពិសោធន៍នៃការសិក្សាដោយរបៀបដ៏ទាក់ទាញ តាមរយៈការរួមបញ្ចូលអត្ថបទ សម្លេង និងអានីម៉េសិនដ៏លើកទឹកចិត្ត។"
        }
        ,
        Vietnamese: {
            titleSpan: "Khóa học",
            titleH2: "Làm thế nào để bắt đầu?",
            testTittle: "Bài kiểm tra đầu vào",
            testFocus: "Khả năng ngôn ngữ Khmer",
            testDuration: "20 phút",
            testFormat: "Câu hỏi trắc nghiệm và câu hỏi viết",
            testDes: "Bài kiểm tra đầu vào được thiết kế để đánh giá khả năng ngôn ngữ Khmer của bạn.",
            courseTitle: "Bắt đầu học từ trình độ của bạn",
            courseFormat: "Học với văn bản, âm thanh và hoạt hình",
            courseDes: "Trải nghiệm cách học năng động qua sự kết hợp tương tác giữa văn bản, âm thanh hấp dẫn và hoạt hình sống động."
        }

    }
    const curentText = text[courseState.language] || text["VietNamese"]
    return (
        <div className="course-landing">
            <div className="titleCourseLading">
                <span>{curentText.titleSpan}</span>
                <h2>{curentText.titleH2}</h2>
            </div>
            <div className="course-landing-container">
                <CourseCard
                    image={landing2}
                    title={curentText.testTittle}
                    focus={curentText.testFocus}
                    duration={curentText.testDuration}
                    format={curentText.testFormat}
                    description={curentText.testDes}
                    scroll={null}
                />
                <CourseCard
                    image={landing3}
                    title={curentText.courseTitle}
                    format={curentText.courseFormat}
                    description={curentText.courseDes}
                    scroll={scrollToAuth}
                />
            </div>
        </div>
    )
}

export default CourseLanding