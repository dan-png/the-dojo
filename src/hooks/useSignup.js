import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth, storage, db } from '../firebase/config'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'



export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()


  const signup = async (email, password, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)

    try {
      // 

      // signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)


      if (!userCredential) {
        throw new Error('Could not complete signup')
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${userCredential.user.uid}/${thumbnail.name}`

      const profileImgRef = ref(storage, uploadPath)



      const uploadTask = uploadBytesResumable(profileImgRef, thumbnail);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');

        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((photoURL) => {
            updateProfile(auth.currentUser, { displayName, photoURL })

            // Create users collection
            setDoc(doc(db, 'users', userCredential.user.uid), {
              online: true,
              displayName,
              photoURL
            })

          });
        }
      );










      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }

      navigate('/')

    }
    catch (err) {
      if (!isCancelled) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      }

    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}