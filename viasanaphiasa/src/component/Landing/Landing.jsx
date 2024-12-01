import MyHeader from "../header/MyHeader"
import MyFooter from "../footer/MyFooter"
import Auth from "../auth/auth"
import { useState, useRef } from "react"
import Hero from "./Hero"
import CourseLanding from "./courseLanding"
import SiteAbove from "./siteAbove"

const Landing = () => {

    const authRef = useRef(null)
    const instruction = useRef(null)

    const scrollToAuth = () => {
        authRef.current?.scrollIntoView({ behavior: "smooth" })
    };
    const scrollToInstruction = () => {
        instruction.current?.scrollIntoView({ behavior: "smooth" })
    }


    return (
        <>
            <MyHeader />
            <div className="LandingContainer">
                <Hero scrollToInstruction={scrollToInstruction} />
                <div ref={authRef}>
                    <Auth authRoute="login" isHeaderAndFooter={false} />
                </div>
                <div ref={instruction}>
                    <CourseLanding scrollToAuth={scrollToAuth} />
                </div>
                <SiteAbove scrollToAuth={scrollToAuth} />
            </div> 
            <MyFooter />
        </>
    )
}

export default Landing