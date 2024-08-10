import {collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../lib/firebase"
import Lesson from "./Lesson"
import { Routes, Route } from "react-router-dom"
import CollectionList from "../../cpmponents/ColectionList/ColectionList"



export default class LessonList{
    constructor(perentID){
        this.list = []
        this.parentId = perentID
    }

    async getList(){
        const q = query(collection(db, "lesson"), where("parentId", "==", this.parentId))
        const _data = await getDocs(q)
        console.log(_data)
        this.list = await Promise.all(_data.docs.map(async (doc)=>{
            const lesson = new Lesson(doc)
            await lesson.initialize()
            return lesson
        }))
    }

    
}