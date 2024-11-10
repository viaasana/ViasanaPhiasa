import LetterCard from "./LetterCard"
import { CourseContext } from "../../context/courseContext"
import Loading from "../../component/Loading/Loading"

export default class Letter{
    constructor(doc){
        this.id = doc.id
    }

    renderCard(index){
        const data = {id: this.id, name: this.name, lessonId: this.lesson}



        if(CourseContext.isLoading)
            return(
                <Loading/>
            )
        return (
            <LetterCard totalState={5} state={1}/>  
        )
    }
}