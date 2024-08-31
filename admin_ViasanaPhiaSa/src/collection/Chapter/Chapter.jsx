import Card from "../../cpmponents/Card/Card"

export default class Chapter{
    constructor(doc, navigateFnc){
        this.id = doc.id
        this.name = doc.name
        this.navigateFnc = navigateFnc

        this.openLsson = this.openLsson.bind(this);

    }

    openLsson(id){
        this.navigateFnc(`/${id}`)
    }

    renderCard(index){
        return (
            <Card key={index|| this.id} 
                    index={index}
                    id={this.id||""}
                    name={this.name||"undefined!"} 
                    status={this.status||0} 
                    handleClick={this.openLsson}
                    childCollectionName = "lesson"
            />
        )
    }
}