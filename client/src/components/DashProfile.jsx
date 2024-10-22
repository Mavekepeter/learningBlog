import { Alert, Button, TextInput } from 'flowbite-react'
import {useEffect, useRef, useState} from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
    const {currentUser} = useSelector(state =>state.user)
    const [imagefile, setImagefile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFileuploadProgress, setImageFileuploadProgress] = useState(null)
    const [imageFileuploadError, setImageFileuploadError] = useState(null)    
    const filePickerRef = useRef(null)
    const handleImageChange = (e) =>{
        const file = e.target.files[0];
        if (file) {
            setImagefile(file);
            setImageFileUrl(URL.createObjectURL(file))
        }
    };
useEffect(()=>{
    if (imagefile) {
        uploadImage();
    }
},[imagefile])   
   const uploadImage = async()=>{
    setImageFileuploadError(null)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imagefile.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,imagefile);

    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress = 
        (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        setImageFileuploadProgress(progress.toFixed(0))
      },
      (error)=>{
        setImageFileuploadError('could not upload image(File must be less than 2MB)');
        setImageFileuploadProgress(null);
        setImagefile(null);
        setImageFileUrl(null);

      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadurl)=>{
          setImageFileUrl(downloadurl)
        })
      }
      
    )

    
   } 
  return (
    <div className='max-w-lg max-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
        onClick={()=>filePickerRef.current.click()}>

          {imageFileuploadProgress && (
            <CircularProgressbar value={imageFileuploadProgress || 0} text={`${imageFileuploadProgress}%`}
            strokeWidth={5}
            styles={{
              root:{
                width:'100%',
                height:'100%',
                position:'absolute',
                top:0,
                left:0
              },
              path:{
                stroke:`rgba(62,152,199,${imageFileuploadProgress / 100})`
              }
            }}
            
            />
          )
          }

        <img src={imageFileUrl || currentUser.profilepicture} alt="user" 
        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileuploadProgress && imageFileuploadProgress < 100 && 'opacity-60'}`}/>
        </div>
          {imageFileuploadError &&  <Alert color='failure'>{imageFileuploadError}</Alert>}
        <TextInput type='text' id='username' placeholder='username'
        defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' placeholder='email'
        defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='password'/>
       <Button type='submit' gradientDuoTone='purpleToBlue'outline>
         Update
       </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
      <span className='cursor-pointer'>Delete Account</span>
      <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default DashProfile
