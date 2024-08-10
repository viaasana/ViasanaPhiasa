import Collection from "../Collection"
import Card from "../../cpmponents/Card/Card"

export default class Letter extends Collection{
    constructor(doc){
        super(doc)
        const data = {...doc.data()}
        this.childID = data.videoId
        this.imageID = data.videoID.length
    }
    renderCard(openCollection){
        return (
            <Card key={this.id||"undefinded!"} name={this.name||"undefined!"} status={this.status||0} onclick={{}}/>
        )
    }
}