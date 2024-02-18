import { Router } from 'express'
import { addCelebrant } from "../controllers/celebrants"
import validateRequest from '../middleware/validate.request'
const router = Router()

router.post('/birthdays', validateRequest, addCelebrant)

export default router