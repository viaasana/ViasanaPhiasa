import "./header.css"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/authContext"
import { CourseContext } from "../../context/courseContext"
import { useNavigate } from "react-router-dom"
import LanguageDropdown from "./LanguageDropdown/LanguageDropdown"


const MyHeader = () => {
    const TEXT = {
        VietNamese: {
            a1: " Thông Báo",
            a2: " Hỗ Trợ",
        },
        Khmer: {
            a1: " សេចក្តីជូនដំណឹង",
            a2: " គាំទ្រ",
        },
        English: {
            a1: " Notification",
            a2: " Help"
        }
    }
    const navigate = useNavigate()
    const { authState, logout } = useContext(AuthContext)
    const { courseState } = useContext(CourseContext)
    const [text, setText] = useState(TEXT.VietNamese)

    useEffect(() => {
        setText(TEXT[courseState.language])
    }, [courseState.language])

    const openLogin = () => {
        navigate("/login")
    }
    const handleLogout = () => {
        logout()
        navigate("/login")
    }
    const backHome = () => {
        navigate("/course")
    }

    const FindingForm = () => {
        return (
            <form action="/search/" className="s1des7sv should-flexFullWidth" role="search">
                <div className="s14t061d">
                    <div className="s1nrkzwy">
                        <svg
                            aria-label="search"
                            class="AssemblyIcon AssemblyIcon--medium"
                            role="img"
                        >
                            <path d="M10 2C14.4183 2 18 5.58172 18 10C18 12.2316 17.0878 14.2082 15.5807 15.5807C14.2082 17.0878 12.2316 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4ZM21.7071 20.2929C21.3166 20.6834 20.6834 20.6834 20.2929 20.2929L17.2929 17.2929C16.9024 16.9024 16.9024 16.2692 17.2929 15.8787C17.6834 15.4882 18.3166 15.4882 18.7071 15.8787L21.7071 18.8787C22.0976 19.2692 22.0976 19.9024 21.7071 20.2929Z"></path>
                        </svg>
                    </div>
                    <div className="slk9g45">
                        <div className="w1j2fuwu">
                            <div
                                role="combobox"
                                aria-haspopup="listbox"
                                aria-owns="react-autowhatever-site-header-global-search-autosuggest"
                                aria-expanded="false"
                                className="react-autosuggest__container"
                                aria-label="Tìm kiếm"
                            >
                                <div className="iriwrw5">
                                    <label className="AssemblyInput" htmlFor="GlobalSearchBar">
                                        <input
                                            autoComplete="off"
                                            aria-autocomplete="list"
                                            aria-controls="react-autowhatever-site-header-global-search-autosuggest"
                                            className="AssemblyInput-input AssemblyInput-placeholder"
                                            id="GlobalSearchBar"
                                            aria-label="Tìm kiếm"
                                            placeholder="Tìm kiếm bài kiểm tra thử"
                                            type="text"
                                            defaultValue=""
                                        />
                                    </label>
                                </div>
                                <div
                                    id="react-autowhatever-site-header-global-search-autosuggest"
                                    role="listbox"
                                    className="react-autosuggest__suggestions-container"
                                    aria-label="Tìm kiếm"
                                    data-testid="globalSearchDropdownContainer"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        )
    }


    const UserButton = () => {
        if (authState.isAuthenticated)
            return (
                <div className="dropdown">
                    <button className="dropbtn">{authState.user.userName.split("@")[0]}
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a onClick={handleLogout}>Logout</a>
                    </div>
                </div>
            )
        return (
            <div className="dropdown">
                <button className="dropbtn" onClick={openLogin}>Login
                    <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                </div>
            </div>
        )
    }


    return (
        <div className="MyHeader">
            <h1 onClick={backHome}>វាសនាភាសា</h1>
            <a className="formContainer"><FindingForm /></a>
            <div className="navbar">


                <a href="#home" >
                    <svg height={".875rem"} fill="white" viewBox="3 2.5 14 14" x="0" y="0" class="shopee-svg-icon icon-notification-2"><path d="m17 15.6-.6-1.2-.6-1.2v-7.3c0-.2 0-.4-.1-.6-.3-1.2-1.4-2.2-2.7-2.2h-1c-.3-.7-1.1-1.2-2.1-1.2s-1.8.5-2.1 1.3h-.8c-1.5 0-2.8 1.2-2.8 2.7v7.2l-1.2 2.5-.2.4h14.4zm-12.2-.8.1-.2.5-1v-.1-7.6c0-.8.7-1.5 1.5-1.5h6.1c.8 0 1.5.7 1.5 1.5v7.5.1l.6 1.2h-10.3z"></path><path d="m10 18c1 0 1.9-.6 2.3-1.4h-4.6c.4.9 1.3 1.4 2.3 1.4z"></path></svg>
                    {text.a1}
                </a>
                <a href="#news">
                    <svg height=".875rem" viewBox="0 0 16 16" width="16" class="shopee-svg-icon icon-help-center"><g fill="none" fill-rule="evenodd" transform="translate(1)"><circle cx="7" cy="8" r="7" stroke="currentColor"></circle><path fill="currentColor" d="m6.871 3.992c-.814 0-1.452.231-1.914.704-.462.462-.693 1.089-.693 1.892h1.155c0-.484.099-.858.297-1.122.22-.319.583-.473 1.078-.473.396 0 .715.11.935.33.209.22.319.517.319.902 0 .286-.11.55-.308.803l-.187.209c-.682.605-1.1 1.056-1.243 1.364-.154.286-.22.638-.22 1.045v.187h1.177v-.187c0-.264.055-.506.176-.726.099-.198.253-.396.462-.572.517-.451.825-.737.924-.858.275-.352.418-.803.418-1.342 0-.66-.22-1.188-.66-1.573-.44-.396-1.012-.583-1.716-.583zm-.198 6.435c-.22 0-.418.066-.572.22-.154.143-.231.33-.231.561 0 .22.077.407.231.561s.352.231.572.231.418-.077.572-.22c.154-.154.242-.341.242-.572s-.077-.418-.231-.561c-.154-.154-.352-.22-.583-.22z"></path></g></svg>
                    {text.a2}
                </a>
                <LanguageDropdown />
                <UserButton />
            </div>
        </div>
    )
}

export default MyHeader