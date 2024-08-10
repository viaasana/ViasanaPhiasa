import "./DataTap.css"
import Loading from "../../Loading/Loading"
import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import CollectionList from "../../ColectionList/ColectionList"
import GetList from "../../../collection/GetList"

const DataTap = () =>{
    const [loading, setLoading] = useState(true)
    const [collectionList, setCollectionList] = useState([])
    const [curentColection, setCurentColection] = useState("chapters")
    const [curentParent, setCurentParent] = useState([])
    const [curentParentName, setcurentParentName] = useState([])
    
    useEffect(()=>{
        
        const fechData = async()=>{
            try {
                const list = await GetList(curentColection, curentParent[curentParent.length-1])
                setCollectionList(list)
                setLoading(false)
            } catch (error) {
                console.error(error)
            }
        }
        fechData()
    })

    const openCollection =(name, parentID, parentName)=>{
        setLoading(true)
        setCurentParent((prevParent)=>{
            return [...prevParent, parentID]
        })
        setcurentParentName((prevName)=>{
            return [...prevName, parentName]
        })
        setCurentColection(name)
    }
    
/////main render

    if(loading){
        return(
            <Loading/>
        )
    }
    return(
        <div className="dataTap">   
            <Routes>
                <Route path="/*" element={<CollectionList key={curentColection} list={collectionList} openCollection={openCollection} link={curentParentName}/>}/>
            </Routes>
        </div>
    )
}

export default DataTap