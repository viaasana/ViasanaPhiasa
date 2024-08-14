import "./notFoundPage.css"
import MyHeader from "../../cpmponents/header/MyHeader"
import MyFooter from "../../cpmponents/footer/MyFooter"
import PageNotFoundIMG from "../../assets/PagenotfoundIcon.png"


const PageNotFound = () => {

    return (
        <>
            <MyHeader />
            <div className="container">
                <img src={PageNotFoundIMG} />
                <span><h1>OPPS! PAGE NOT FOUND</h1> <br/>
                <span>Page you are locking for might have  been removed had its name change or is temporarily unavailable </span>
                </span>
                
            </div>
            <MyFooter />
        </>
    )

}

export default PageNotFound