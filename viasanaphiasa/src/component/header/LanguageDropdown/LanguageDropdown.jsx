import { useState, useEffect,useContext } from "react"
import { CourseContext } from "../../../context/courseContext"
import "./LanguageDropdown.css"

const LanguageDropdown = () => {
  const {courseState, setLanguage} = useContext(CourseContext)
  console.log(courseState.language)


  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
  };

  return (
    <a>
      <select id="language" value={courseState.language} onChange={handleChange}>
        <option value="English">English</option>
        <option value="Khmer">Khmer</option>
        <option value="VietNamese">Vietnamese</option>
      </select>
    </a>
  );
};

export default LanguageDropdown
