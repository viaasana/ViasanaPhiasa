import { apiUrl } from "../context/constans";
import axios from "axios"


export default class Collection{
    constructor(doc){
        this.id = doc.id
        this.nameId = doc.name
        this.name = "laoding.........."
        
    }
    
    async initialize(){
        this.name = await this.renderName();
    }
    
    async renderName(){
        const response = await axios.get(`${apiUrl}/getText/${textId}`,{language: "Vietnamese"} )
        return response.data
    }
}