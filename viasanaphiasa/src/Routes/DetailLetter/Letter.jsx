import LetterCard from "./LetterCard"
import { CourseContext } from "../../context/courseContext"
import Loading from "../../component/Loading/Loading"

export default class Letter {
    constructor(doc) {
        this.id = doc.id
        this.name = doc.name
        this.totalState = doc.totalState
        this.state = doc.state
        this.video = doc.video
        this.image = doc.image
        this.sound = doc.sound
    }

    renderCard() {
        const data = { id: this.id, name: this.name, lessonId: this.lesson, image: this.image, video: this.video, sound: this.sound }

        if (CourseContext.isLoading)
            return (
                <Loading />
            )
        return (
            <LetterCard totalState={this.totalState} state={this.state} data={data} />
        )
    }
}