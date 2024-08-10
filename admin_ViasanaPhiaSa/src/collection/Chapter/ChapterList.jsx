import Chapter from "./Chapter"
import {getDocs, collection} from "firebase/firestore"
import { db } from "../../lib/firebase"



export default class ChapterList{
    constructor(){
        this.list = []
    }

    async getList(){
        const Ref = collection(db, "chapters")
        const _data = await getDocs(Ref)
        this.list = await Promise.all(_data.docs.map(async (doc)=>{
            const chapter = new Chapter(doc)
            await chapter.initialize()
            return chapter
        }))
    }



}