import express from 'express'
const router = express.Router()
import {verifyToken} from '../utils/verifyUser.js'
import {createComment,getPostComments} from '../controllers/comment.js'
router.post('/create',verifyToken,createComment)
router.get('/getpostComments/:postId',getPostComments)

export default router