import "./Hero.css";
import { placeholderImage } from "../../../public/placeholder_image";
import { CourseContext } from "../../context/courseContext"
import { useContext } from "react";
import laddingImage1 from "../../assets/ladding_Image1.jpg"


const Hero = ({scrollToInstruction}) => {

    
    const {courseState} = useContext(CourseContext)
    const placeHoderUrl = placeholderImage()

    
    const text= {
        English: {
            h1: "Learn Modern",
            h1_hightlight: "Khmer",
            p: "Discover the beauty of the Khmer language and culture with our interactive learning platform. Whether you're a beginner or looking to deepen your skills, our website offers engaging lessons, practical exercises, and rich resources to help you master Khmer at your own pace. Start your journey today!",
            button: "Start Learning Now →"
        },  
        Khmer: {
            h1: "រៀន",
            h1_hightlight: "ភាសាខ្មែរ",
            p: "ស្វែងយល់អំពីស្រស់សោភា និងវប្បធម៌ខ្មែរ ជាមួយវេទិកាសិក្សាអន្តរកម្មរបស់យើង។ មិនថាអ្នកជាអ្នកថ្មីឬកំពុងស្វះស្វែងដើម្បីជ្រាបច្បាស់ជាងមុន វេបសាយរបស់យើងផ្តល់នូវមេរៀនគួរឲ្យចាប់អារម្មណ៍ ការសាកល្បងជាក់ស្តែង និងធនធានសម្បូរបែបដើម្បីជួយអ្នកបញ្ជេញភាសាខ្មែរ។ ចាប់ផ្តើមដំណើររបស់អ្នកថ្ងៃនេះ!",
            button: "ចាប់ផ្តើមរៀនឥឡូវនេះ →"
        },
        
        VietNamese: {
            h1: "Học Tiếng",
            h1_hightlight: " Khmer",
            p: "Khám phá vẻ đẹp của ngôn ngữ và văn hóa Khmer với nền tảng học tập tương tác của chúng tôi. Dù bạn là người mới bắt đầu hay đang muốn nâng cao kỹ năng, trang web của chúng tôi cung cấp các bài học hấp dẫn, bài thực hành thiết thực, và tài nguyên phong phú để giúp bạn thành thạo tiếng Khmer theo tốc độ của mình. Bắt đầu hành trình của bạn ngay hôm nay!",
            button: "Bắt đầu học ngay →"
        },
        
    }
    const curentText  = text[courseState.language] || text.VietNamese
    
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{curentText.h1} <span className="highlight">{curentText.h1_hightlight}</span></h1>
        <p>{curentText.p}</p>
        <button className="cta-button" onClick={scrollToInstruction}>{curentText.button}</button>
      </div>
      <div className="hero-image">
        <img
          src={laddingImage1}
          alt="Course Preview"
          className="image"
        />
      </div>
    </section>
  );
};

export default Hero;
