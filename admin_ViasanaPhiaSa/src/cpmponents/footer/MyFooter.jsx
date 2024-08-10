import "./footer.css"

const MyFooter = () =>{

    return (
        <div className="MyFooter">
            <ul>
                <span>Thông tin</span>
                <li><a href="">Lộ trình học</a></li>
                <li><a href="">Video</a></li>
                <li><a href="">Âm thanh</a></li>
            </ul>

            <ul>
                <span>Đóng góp</span>
                <li><a href="">Gửi video</a></li>
                <li><a href="">Gửi từ vựng</a></li>
            </ul>

            <ul>
                <span>Liên hệ</span>
                <li><a href="">23520966@gm.uit.edu.vn</a></li>
            </ul>
        </div>
    )
}

export default MyFooter