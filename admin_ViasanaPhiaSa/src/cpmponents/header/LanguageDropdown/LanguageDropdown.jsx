import { useState, useEffect, useContext } from "react"
import { CourseContext } from "../../../context/courseContext"
import "./LanguageDropdown.css"

const LanguageDropdown = () => {
  const { courseState, setLanguage } = useContext(CourseContext)


  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
  };

  return (
    <a>
      <svg width="16" height=".875rem" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8.00004C14.6673 4.31814 11.6825 1.33337 8.00065 1.33337C4.31875 1.33337 1.33398 4.31814 1.33398 8.00004C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.33464 8.00004C5.33464 11.6819 6.52854 14.6667 8.0013 14.6667C9.47406 14.6667 10.668 11.6819 10.668 8.00004C10.668 4.31814 9.47406 1.33337 8.0013 1.33337C6.52854 1.33337 5.33464 4.31814 5.33464 8.00004Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1.33398 8H14.6673" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      <select id="language" value={courseState.language} onChange={handleChange}>
        <option value="English">English</option>
        <option value="Khmer">ភាសាខ្មែរ</option>
        <option value="VietNamese">Tiếng Việt</option>
      </select>
    </a>
  );
};

export default LanguageDropdown
