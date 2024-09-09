import Lesson from "../module/lesson.js"
import Letter from "../module/letter.js"
import Chapter from "../module/chapter.js"
import textContents from "../module/textContent.js"


const Delete = async (type, id) => {
    let collection=null
    switch (type) {
        case "Chapter":
            collection = await Chapter.findById(id)
            if(collection){
                await textContents.findByIdAndDelete(collection.name)
                const lessons = await Lesson.find({ chapter: id })
                await Chapter.findByIdAndDelete(id)
                lessons.map(async (l) => {
                    await Delete("Lesson", l.id)
                })
            }
            break;
        case "Lesson":
            collection = await Lesson.findById(id)
            if(collection){
                await textContents.findByIdAndDelete(collection.name)
                const letters = await Letter.find({lesson: collection.id})
                await Lesson.findByIdAndDelete(id)
                letters.map(async(letter)=>{
                    await Delete("Letter", letter.id)
                })
            }
            break;
        case "Letter":
            collection = await Letter.findById(id)
            if(collection){
                await textContents.findByIdAndDelete(collection.name)
                await Letter.findByIdAndDelete(id)
            }
            break;
        default:
            break;
    }


}

export default Delete