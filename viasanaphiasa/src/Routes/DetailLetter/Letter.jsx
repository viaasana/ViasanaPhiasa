import LetterCard from "./LetterCard"
import { CourseContext } from "../../context/courseContext"
import Loading from "../../component/Loading/Loading"

export default class Letter {
    constructor(doc) {
        this.id = doc.id
        this.name = doc.name
        this.video = doc.video
        this.image = doc.image
        this.sound = doc.sound
        this.createAt = doc.createAt
    }

    renderCard() {
        const data = { id: this.id, name: this.name, lessonId: this.lesson, image: this.image, video: this.video, sound: this.sound }

        if (CourseContext.isLoading)
            return (
                <Loading />
            )
        return (
            <LetterCard  data={data} />
        )
    }
}