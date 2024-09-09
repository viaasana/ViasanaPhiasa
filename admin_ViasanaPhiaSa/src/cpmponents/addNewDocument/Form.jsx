import React, { useContext, useState } from 'react';
import "./Form.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CourseContext } from '../../context/courseContext';
import Loading from '../Loading/Loading';

const Form = ({ name, data }) => {
  const {chapterId, lessonId} = data
  const navigate = useNavigate()
  const { createChapter, createLesson, createLetter } = useContext(CourseContext)
  const [activeTab, setActiveTab] = useState('Vietnamese');
  const [posting, setPosting] = useState(false)
  const [documentData, setDocumentData] = useState({
    Vietnamese: "",
    Khmer: "",
    English: "",
  });

  const handleTabClick = (language) => {
    setActiveTab(language);
  };

  const handleInputChange = (language, value) => {
    setDocumentData((prevData) => ({
      ...prevData,
      [language]: value,
    }));
  };

  const handleSubmit = async () => {
    // Implement submit logic here
    setPosting(true)
    const addChapter = async () => {
      const data = {
        Vietnamese: name + ' ' + documentData.Vietnamese,
        Khmer: name + ' ' + documentData.name,
        English: name + ' ' + documentData.English,
      }
      const createResponses = await createChapter(data)
      if (createResponses.success) {
        toast.success(createResponses.message)
        navigate(-1)
      } else {
        setPosting(false)
        toast.error("Add new Chapter fail")

      }
    }

    const addLesson = async () => {
      const data = {
        Vietnamese: name + ' ' + documentData.Vietnamese,
        Khmer: name + ' ' + documentData.name,
        English: name + ' ' + documentData.English,
      }
      const createResponses = await createLesson(data, chapterId)
      if (createResponses.success) {
        toast.success(createResponses.message)
        navigate(-1)
      } else {
        setPosting(false)
        toast.error(createResponses.message)
      }
    }

    const addLetter = async () => {
      const data = {
        Vietnamese: name + ' ' + documentData.Vietnamese,
        Khmer: name + ' ' + documentData.Khmer,
        English: name + ' ' + documentData.English,
      }
      const createResponses = await createLetter(data, chapterId, lessonId)
      if (createResponses.success) {
        toast.success(createResponses.message)
        navigate(-1)

      }else {
        setPosting(false)
        toast.error(createResponses.message)
      }
    }

    if (name == "Chapter")
      await addChapter()
    else if (name == "Lesson")
      await addLesson()
    else if(name== "Letter")
      await addLetter()
  };

  const handlePreview = () => {
    const data = {
      Vietnamese: name + ' ' + documentData.Vietnamese,
      Khmer: name + ' ' + documentData.name,
      English: name + ' ' + documentData.English,
    }
    console.log('Document preview:', data);
  };

  const handleCancel = () => {
    // Implement cancel logic here
    setDocumentData({
      Vietnamese: "",
      Khmer: "",
      English: "",

    });
    navigate(-1)
  };
  if (posting)
    return (<Loading />)

  return (
    <div className="add-document" >
      <h1>Add New {name}</h1>
      <div className="tabs">
        {['Vietnamese', 'Khmer', 'English'].map((language) => (
          <button
            key={language}
            onClick={() => handleTabClick(language)}
            className={activeTab === language ? 'active' : ''}
          >
            {language}
          </button>
        ))}
      </div>
      <div className="form-content">
        <div>
          <label>Document Title ({activeTab}):</label><br />
          <div className="input-wrapper">
            <span className="input-prefix">{name}</span>
            <input
              type="text"
              value={documentData[activeTab]}
              onChange={(e) => handleInputChange(activeTab, e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="buttons">
        <button onClick={handlePreview}>Preview</button>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Form;
