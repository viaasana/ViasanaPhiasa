import {db} from "../lib/firebase"
import { doc, getDoc} from 'firebase/firestore'

export default class Collection{
    constructor(doc){
        const data = {...doc.data()}
        this.id = doc.id
        this.nameId = data.nameId
        this.name = "laoding.........."

    }

    async initialize(){
        this.name = await this.renderName();
    }

    async renderName(){
        try {
            const docRef = doc(db, "contents", this.nameId);
            const docSnap = await getDoc(docRef);
                
            if (docSnap.exists()) {
                return docSnap.data().English
            } else {
                // docSnap.data() will be undefined in this case
                return "undefine!"
            }
        } catch (error) {
            console.error(error)
            return "undefine"
        }
    }
}