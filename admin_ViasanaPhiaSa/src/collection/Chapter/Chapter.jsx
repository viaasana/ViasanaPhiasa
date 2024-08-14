import Collection from "../Collection"
import Card from "../../cpmponents/Card/Card"

export default class Chapter extends Collection{
    constructor(doc){
        super(doc)
    }

    renderCard(openCollection){
        return (
            <Card key={this.id||"undefinded!"} 
                    id={this.id||""}
                    name={this.name||"undefined!"} 
                    status={this.status||0} 
                    handleClick={openCollection}
                    childCollectionName = "lesson"
            />
        )
    }
}