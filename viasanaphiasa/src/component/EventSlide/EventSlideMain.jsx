import React from 'react';
import SetPreviewCard from './EventSlideCard';
import './EventSlide.css';

const SetPreview = () => {
    const sets = [
        {
            title: 'Chôl Chnăm Thmây, lễ hội mừng năm mới của người Khmer',
            link: 'https://vi.wikipedia.org/wiki/L%E1%BB%85_h%E1%BB%99i_Chol_Chnam_Thmay',
            termsCount: '14 tháng 4 - 16 tháng 4',
            creator: 'admin',
            creatorLink: '',
            creatorAvatar: 'https://assets.quizlet.com/static/i/animals/115.70946d9217589e8.jpg',
        },
        {
            title: 'Lễ Sen Dolta - nét đẹp văn hóa của đồng bào Khmer Nam bộ',
            link: 'https://dangcongsan.vn/van-hoa-vung-sau-vung-xa-bien-gioi-hai-dao-vung-dan-toc-thieu-so/tu-truyen-thong-toi-hien-dai/le-sen-dolta-net-dep-van-hoa-cua-dong-bao-khmer-nam-bo-649136.html',
            termsCount: 'Ngày thứ 15 của tháng Khmer',
            creator: 'admin',
            creatorLink: '',
            creatorAvatar: 'https://assets.quizlet.com/static/i/animals/115.70946d9217589e8.jpg',
        },
        // Add more sets here as needed
    ];

    return (
        <div className="SetPreview">
            {sets.map((set, index) => (
                <SetPreviewCard key={index} {...set} />
            ))}
        </div>
    );
};

export default SetPreview;
