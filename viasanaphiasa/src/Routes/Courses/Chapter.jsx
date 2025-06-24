import Card from "../../component/Card/Card"

export default class Chapter{
    constructor(doc, navigateFnc, setIsLoading, language){
        this.id = doc.id
        this.name = doc.name
        this.navigateFnc = navigateFnc
        this.setIsLoading = setIsLoading
        this.lessonCount = doc.lessonCout
        this.openLesson = this.openLesson.bind(this);
        this.language = language

    }

    openLesson(){
        this.setIsLoading(true)
        this.navigateFnc(`${this.id}name=${this.name}`)
    }

    renderCard(index){
        const data = {id:this.id, name:this.name,language:this.language, status:this.lessonCount}
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