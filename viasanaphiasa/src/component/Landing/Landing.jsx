import MyHeader from "../header/MyHeader"
import MyFooter from "../footer/MyFooter"
import Auth from "../auth/auth"
import { useState } from "react"


const Landing = () => {
    const [language, setLangguage] = useState("Vietnamese")

    return (
        <>
            <MyHeader />
            <div className="LandingContainer">
                <Auth authRoute="login" language={language} isHeaderAndFooter={false}/>
            </div>
            <MyFooter />
        </>
    )
}

export default Landing