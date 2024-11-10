import { useState, useEffect } from "react"
import "./LanguageDropdown.css"

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Viet Nam");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown}>
        {selectedLanguage} ▼
      </button>
      {isOpen && (
        <div style={styles.dropdownContent}>
          <button onClick={() => selectLanguage("Viet Nam")} >
            Viet Nam
          </button>
          <button onClick={() => selectLanguage("Khmer")} >
            Khmer
          </button>
          <button onClick={() => selectLanguage("English")}>
            English
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown
