import ChapterList from "./Chapter/ChapterList"
import LessonList from "./Lesson/LessonList"

const GetList = async (collectionName, childOf)=>{
    let colectionList
    if(collectionName=="chapters")
    {
        colectionList = new ChapterList()
    }else if(collectionName=="lesson"){
        colectionList = new LessonList(childOf)
    }
    await colectionList.getList()
    return colectionList.list
}

export default GetList