import AddNewDocument from "../addNewDocument/addNewDocument"
import GetList from "../../collection/GetList"



const CollectionList = (props)=>{
    const list = props.list
    const link = props.link
    return(
    <>
        <div className="TapTitle">Data {">" + link.map((name)=>{
            console.log(name)   
            return name + ">"
        })}</div>
            <span>Total {list.length}</span>
            <div className="list">
                <div className="cardsList">
                    {
                        list.map((collection) => (
                            <div className="row">
                                <div className="column">
                                    {collection.renderCard(props.openCollection)}
                                </div>
                            </div>
                        ))
                    }
                    <div className="row">
                        <div className="column">
                            <AddNewDocument />
                        </div>
                    </div>
                </div>
            </div>
    </>
    )
}

export default CollectionList