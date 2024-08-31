import Card from "../../cpmponents/Card/Card"

export default class Lesson{
    constructor(doc){
        this.id = doc.id
        this.name = doc.name
    }


    renderCard(index){
        return (
            <Card key={index|| this.id} 
                    index={index}
                    id={this.id||""}
                    name={this.name||"undefined!"} 
                    status={this.status||0} 
                    handleClick={"dang rong"}
                    childCollectionName = "lesson"
            />
        )
    }
}