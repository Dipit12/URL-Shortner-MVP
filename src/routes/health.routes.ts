import express, {Request,Response} from 'express'

const router = express.Router()

router.get("/api/v1/health", (req:Request,res:Response) =>{
    res.status(200).json({
        msg:"API is up and running"
    })
})

export default router