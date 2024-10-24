import express from 'express'
import {verifyToken} from '../utils/verifyUser.js'
const router = express.Router();
import {create,getposts} from '../controllers/post.js'

router.post('/create',verifyToken,create)
router.get('/getposts',getposts)

export default router;