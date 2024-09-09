import Card from "../../cpmponents/Card/Card"


export default class Chapter{
    constructor(doc, navigateFnc, setIsLoading){
        this.id = doc.id
        this.name = doc.name
        this.navigateFnc = navigateFnc
        this.setIsLoading = setIsLoading
        this.lessonCount = doc.lessonCout
        this.openLesson = this.openLesson.bind(this);

    }

    openLesson(){
        this.setIsLoading(true)
        this.navigateFnc(`${this.id}name=${this.name}`)
    }

    renderCard(index){
        const data = {id:this.id, name:this.name, status:this.lessonCount}
        return (
            <Card key={index|| this.id} 
                    type = "Chapter"
                    index={index}
                    collection={data}
                    handleClick={this.openLesson}
                    childCollectionName = "lesson"
            />
        )
    }
}