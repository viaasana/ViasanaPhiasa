import mongoose from "mongoose"

import dotenv from "dotenv"

dotenv.config()


let gfs;
mongoose.connection.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
    console.log('GridFSBucket set up');
})


async function deleteFile(fileId) {
    try{
        return new Promise(async()=>{
            const objectId = new mongoose.Types.ObjectId(fileId)
            await gfs.delete(objectId)
        })
    }catch(error){
        console.log("can't delete this file ", error)
    }
}

export default deleteFile