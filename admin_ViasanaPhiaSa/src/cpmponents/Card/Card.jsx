import "./Card.css"

const Card = ({key, id, name, status, handleClick, childCollectionName})=>{
    return(
        <div className="card" onClick={()=>handleClick(childCollectionName, id, name)}>
            <div className="card-content">
                <h2 className="cardTitle">{name}</h2>
                <p className="cardStatus">{status}</p>
            </div>
            <button className="card-delete-button" >
                Delete
            </button>
        </div>
    )
}

export default Card