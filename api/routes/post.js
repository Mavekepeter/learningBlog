import express from 'express'
import {verifyToken} from '../utils/verifyUser.js'
const router = express.Router();
import {create,getposts,deletepost} from '../controllers/post.js'

router.post('/create',verifyToken,create)
router.get('/getposts',getposts)
router.delete('/deletepost/:postId/:userId',verifyToken,deletepost)

export default router;