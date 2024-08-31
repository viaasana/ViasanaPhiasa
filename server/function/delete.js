import Lesson from "../module/lesson.js"
import Letter from "../module/letter.js"
import Chapter from "../module/chapter.js"
import textContents from "../module/textContent.js"


const Delete = async (type, id) => {
    let colection
    switch (type) {
        case "Chapter":
            colection = await Chapter.findById(id)
            await textContents.findByIdAndDelete(colection.name)
            await Chapter.findByIdAndDelete(id)
            const lessons = await Lesson.find({ chapter: id })
            lessons.map(async (l) => {
                await Delete("Lesson", l.id)
            })
            break;
        case "Lesson":
            colection = await Lesson.findById(id)
            break;
        case "Letter":
            colection = await Letter.findById(id)
            break;
        default:
            break;
    }


}

export default Delete