import "./footer.css"
import { useContext, useEffect, useState } from "react"
import { CourseContext } from "../../context/courseContext"

const MyFooter = () => {

    const TEXT = {
        VietNamese: {
            inforTitle: "Thông Tin",
            inforA1: "Lộ Trình Học",
            inforA2: "Video",
            inforA3: "Âm Thanh",

            contriTitle: "Đóng Góp",
            contriA1: "Gửi Video",
            contriA2: "Gửi Từ Vựng",

            contacTittle: "Liên Hệ",
            contacA1: "23520966@gm.uit.edu.vn"
        }
        ,
        English: {
            inforTitle: "Information",
            inforA1: "Learning Path",
            inforA2: "Video",
            inforA3: "Audio",

            contriTitle: "Contribute",
            contriA1: "Submit Video",
            contriA2: "Submit Vocabulary",

            contacTittle: "Contact",
            contacA1: "23520966@gm.uit.edu.vn"
        },
        Khmer: {
            inforTitle: "ព័ត៌មាន",
            inforA1: "ផ្លូវរៀនសូត្រ",
            inforA2: "វីដេអូ",
            inforA3: "អូឌីយ៉ូ",

            contriTitle: "ការរួមចំណែក",
            contriA1: "បញ្ជូនវីដេអូ",
            contriA2: "បញ្ជូនវាក្យសព្ទ",

            contacTittle: "ទាក់ទង",
            contacA1: "23520966@gm.uit.edu.vn"
        }
    }
    const { courseState } = useContext(CourseContext)
    const [text, setText] = useState(TEXT[courseState.language])

    useEffect(() => {
        setText(TEXT[courseState.language])
    }, [courseState.language])



    return (
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-section about">
                    <h3>About Us | Giới Thiệu | អំពីពួកយើង</h3>
                    <p>
                        We are a dedicated platform providing resources and tests for learners. Our goal is to enhance learning through accessible and interactive content.
                        <br />Chúng tôi là một nền tảng tận tâm cung cấp tài nguyên và bài kiểm tra cho người học. Mục tiêu của chúng tôi là nâng cao việc học thông qua nội dung có thể truy cập và tương tác.
                        <br />យើងគឺជាវេទិកាស្មោះត្រង់ដែលផ្ដល់នូវធនធាននិងការធ្វើតេស្តសម្រាប់សិស្ស។ គោលដៅរបស់យើងគឺការបង្កើនការរៀនឲ្យប្រសើរឡើងដោយឆ្លងកាត់មាតិកាដែលអាចចូលដំណើរការបាននិងអន្តរកម្ម។
                    </p>
                </div>
                <div class="footer-section links">
                    <h3>Quick Links | Liên Kết Nhanh | តំណភ្ជាប់រហ័ស</h3>
                    <ul>
                        <li><a href="/home">Home | Trang Chủ | ទំព័រដើម</a></li>
                        <li><a href="/about">About | Giới Thiệu | អំពី</a></li>
                        <li><a href="/courses">Courses | Khoá Học | វគ្គសិក្សា</a></li>
                        <li><a href="/contact">Contact | Liên Hệ | ទំនាក់ទំនង</a></li>
                    </ul>
                </div>
                <div class="footer-section contact">
                    <h3>Contact Us | Liên Hệ | ទំនាក់ទំនង</h3>
                    <p>Email: 23520966@gm.uit.edu.vn</p>
                    <p>Phone: 0867-474-032</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025</p>
                <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 8H7V12H9V21H13V12H16L17 8H13V6.5C13 5.72 13.16 5 14.5 5H17V1H14C10.69 1 9 2.69 9 5.5V8Z" />
                        </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.46 6C21.69 6.36 20.86 6.61 20 6.74C20.88 6.16 21.54 5.26 21.88 4.22C21.04 4.72 20.12 5.09 19.14 5.3C18.36 4.48 17.22 4 16 4C13.66 4 11.83 5.79 11.83 8.09C11.83 8.43 11.86 8.77 11.92 9.09C8.08 8.91 4.75 6.92 2.73 3.97C2.34 4.66 2.13 5.47 2.13 6.31C2.13 7.86 2.91 9.27 4.1 10.12C3.45 10.1 2.83 9.9 2.3 9.61V9.67C2.3 11.94 3.88 13.89 5.94 14.32C5.5 14.44 5.02 14.5 4.52 14.5C4.2 14.5 3.9 14.47 3.6 14.42C4.22 16.34 5.93 17.7 7.94 17.75C6.39 19.02 4.42 19.78 2.34 19.78C1.95 19.78 1.56 19.76 1.18 19.71C3.22 21.02 5.61 21.78 8.18 21.78C16 21.78 20.4 14.88 20.4 8.56C20.4 8.33 20.4 8.1 20.38 7.88C21.23 7.27 21.88 6.47 22.46 6Z" />
                        </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 2C4.24 2 2 4.24 2 7V17C2 19.76 4.24 22 7 22H17C19.76 22 22 19.76 22 17V7C22 4.24 19.76 2 17 2H7ZM17 4C18.66 4 20 5.34 20 7V17C20 18.66 18.66 20 17 20H7C5.34 20 4 18.66 4 17V7C4 5.34 5.34 4 7 4H17ZM12 6C9.24 6 7 8.24 7 11C7 13.76 9.24 16 12 16C14.76 16 17 13.76 17 11C17 8.24 14.76 6 12 6ZM12 8C13.66 8 15 9.34 15 11C15 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11C9 9.34 10.34 8 12 8ZM18 6.5C18 6.78 17.78 7 17.5 7C17.22 7 17 6.78 17 6.5C17 6.22 17.22 6 17.5 6C17.78 6 18 6.22 18 6.5Z" />
                        </svg>
                    </a>
                </div>

            </div>
        </footer>

    )
}

export default MyFooter