import express from 'express'
import {verifyToken} from '../utils/verifyUser.js'
const router = express.Router();
import {create} from '../controllers/post.js'

router.post('/create',verifyToken,create)

export default router;