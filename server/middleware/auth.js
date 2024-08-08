import jwt from "jsonwebtoken"

const verifyToken = (req, res, next)=>{
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(" ")[1]

    if(!token)
        return res.status(401).json({success: false, mesage: "Access token not found"})

    try {
        const decoder = jwt.verify(token, process.env.ECCESS_TOKEN_SECRET)

        req.userId = decoder.userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({success: false, mesage: "Unverify token"})
    }
}

export default verifyToken