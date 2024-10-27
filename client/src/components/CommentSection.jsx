import { Alert, Button, Textarea } from 'flowbite-react'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import Comment from './Comment'
const CommentSection = ({postId}) => {
    const {currentUser} = useSelector(state =>state.user)
    const [comment, setcomment] = useState('')
    const [commentError, setcommentError] = useState(null)
    const [comments, setcomments] = useState([])
    const navigate = useNavigate()
    console.log(comments);
    
    const handleSubmit = async (e) =>{
       e.preventDefault() 
       if (comment.length>200) {
        return
       }
       try {
        const res = await fetch('/api/comment/create', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({content:comment,postId,userId:currentUser._id}),
    
           });
           const data = await res.json();
           if (res.ok) {
            setcomment('');
            setcommentError(null)
            setcomments([data,...comments])

           }
       } catch (error) {
        setcommentError(error.message)
       }
       
    }
    useEffect(()=>{
        const getComments = async ()=>{
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`);
                if (res.ok) {
                    const data = await res.json()
                    setcomments(data);
                }
            } catch (error) {
                console.log(error.message);
                
            }
        }
        getComments()
    },[postId])
    const handlelike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/sign-in');
                return;
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: 'PUT',
            });
            if (res.ok) {
                const data = await res.json();  // Ensure we await the response
                setcomments(comments.map((comment) =>
                    comment._id === commentId
                        ? {
                              ...comment,
                              likes: data.likes,
                              numberOfLikes: data.likes.length,
                          }
                        : comment
                ));
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleEdit = async (comment,editedContent)=>{
        setcomments(
            comments.map((c)=>
                c._id === comment._id ? { ...c, content: editedContent } : c
)
        )
    }
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {currentUser ?
        (
            <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                <p>signed in as:</p>
                <img className='h-5 w-3 object-cover rounded-full' src={currentUser.profilepicture} alt="" />
                <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
                @{currentUser.username}
                </Link>
            </div>
        ):
        (
            <div className="text-sm text-teal-500 my-5 flex gap-1">
                you must be signed in to comment.
                <Link to={'/sign-in'} className='text-blue-500 hover:underline'>
                sign in
                </Link>
            </div>
        )
        
        }
        {currentUser &&(
            <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
                <Textarea
                placeholder='Add a comment...'
                rows='3'
                maxLength='200'
                onChange={(e)=>setcomment(e.target.value)}
                value={comment}
                />
                <div className="flex justify-between items-center mt-5">
                    <p className='text-gray-500 text-xs'>{200-comment.length} characters remaining</p>
                    <Button outline
                    gradientDuoTone='purpleToBlue'
                    type='submit'
                     >
                        Submit
                    </Button>
                </div>
                {commentError && (
                <Alert color='failure' className='mt-5'>{commentError}</Alert>

                )}
            </form>
        )}
        {comments.length === 0?(
            <p className='text-sm my-5'>No comments yet!</p>
        ):(
            <>
            <div className="text-sm my-5 flex after:items-center gap-1">
                <p>comments</p>
                <div className="border border-gray-400 py-1 px-2 rounded-sm">
                    <p>{comments.length}</p>
                </div>
            </div>
            {comments.map(comment =>(
                <Comment key={comment._id}
                comment={comment} onLike={handlelike}
                onEdit={handleEdit}/>
            ))}
            </>
        )}
    </div>

  )
}

export default CommentSection