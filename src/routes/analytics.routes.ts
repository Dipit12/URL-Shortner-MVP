import express, {Request,Response} from 'express'
import { getAnalytics } from '../controllers/analytics.controller.js'
const router = express.Router()


router.get("/api/v1/analytics/:shortenURL",getAnalytics)

export default router