import express from 'express'
const router = express.Router()
import {verifyToken} from '../utils/verifyUser.js'
import {createComment,getPostComments,likeComment,editComment} from '../controllers/comment.js'
router.post('/create',verifyToken,createComment)
router.get('/getpostComments/:postId',getPostComments)
router.put('/likeComment/:commentId',verifyToken,likeComment);
router.put('/editComment/:commentId',verifyToken,editComment);


export default router