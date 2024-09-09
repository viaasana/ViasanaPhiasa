import Card from "../../cpmponents/Card/Card"

export default class Letter{
    constructor(doc){
        this.id = doc.id
        this.name = doc.name
        this.lesson = doc.lesson
        this.letter = doc.letter
    }


    renderCard(index){
        const data = {id: this.id, name: this.name, lessonId: this.lesson}
        return (
            <Card key={index|| this.id} 
                    type = "Letter"
                    index={index}
                    collection={data}
                    handleClick={"dang rong"}
                    childCollectionName = "Letter"
            />
        )
    }
}