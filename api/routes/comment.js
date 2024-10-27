import express from 'express'
const router = express.Router()
import {verifyToken} from '../utils/verifyUser.js'
import {createComment,getPostComments,likeComment} from '../controllers/comment.js'
router.post('/create',verifyToken,createComment)
router.get('/getpostComments/:postId',getPostComments)
router.put('/likeComment/:commentId',verifyToken,likeComment);


export default router