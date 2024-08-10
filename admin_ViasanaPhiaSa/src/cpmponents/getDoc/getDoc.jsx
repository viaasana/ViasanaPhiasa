import {collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../lib/firebase"

async function getDocuments(CollectionName, ParentId){

    const q = query(collection(db, CollectionName), where("parentId", "==", ParentId))

    const querySnapshot = await getDocs(q)


    return querySnapshot
}

export default getDocuments