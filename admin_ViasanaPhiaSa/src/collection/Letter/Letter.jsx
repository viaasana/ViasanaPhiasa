import Card from "../../cpmponents/Card/Card"

export default class Letter{
    constructor(doc, navigateFnc, setIsLoading){
        this.id = doc.id
        this.name = doc.name
        this.lesson = doc.lesson
        this.letter = doc.letter
        this.navigateFnc = navigateFnc
        this.setIsLoading = setIsLoading
        this.letterCount = doc.letterCount
        this.openDetail = this.openDetail.bind(this)
    }

    openDetail(){
        this.setIsLoading(true)
        this.navigateFnc(`${this.id}name=${this.name}`)
    }
    renderCard(index){
        const data = {id: this.id, name: this.name, lessonId: this.lesson}
        return (
            <Card key={index|| this.id} 
                    type = "Letter"
                    index={index}
                    collection={data}
                    handleClick={this.openDetail}
                    childCollectionName = "Letter"
            />
        )
    }
}