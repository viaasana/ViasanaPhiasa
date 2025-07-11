import Card from "../../component/Card/Card"

export default class Lesson{
    constructor(doc, navigateFnc, setIsLoading, language){
        this.id = doc.id
        this.name = doc.name
        this.language = language
        this.chapter = doc.chapter
        this.navigateFnc = navigateFnc
        this.setIsLoading = setIsLoading
        this.letterCount = doc.letterCount
        this.openLetter = this.openLetter.bind(this)
        this.createAt = doc.createAt
    }

    openLetter(){
        this.setIsLoading(true)
        this.navigateFnc(`${this.id}name=${this.name[this.language]}`)
    }

    renderCard(index){
        const data = {id: this.id, name: this.name, language: this.language, chapterId: this.chapter, status: this.letterCount}
        return (
            <Card key={index|| this.id} 
                    type = "Lesson"
                    index={index}
                    collection={data}
                    handleClick={this.openLetter}
                    childCollectionName = "lesson"
            />
        )
    }
}