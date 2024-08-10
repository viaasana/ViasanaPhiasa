import Collection from "../Collection"
import Card from "../../cpmponents/Card/Card"

export default class Lesson extends Collection{
    constructor(doc){
        super(doc)
        const data = {...doc.data()}
        this.childID = data.lettersId
        this.status = data.status
    }
    renderCard(openCollection){
        return (
            <Card key={this.id||"undefinded!"} name={this.name||"undefined!"} status={this.status||0} onclick={()=>{this.headelCardClick()}}/>
        )
    }
}