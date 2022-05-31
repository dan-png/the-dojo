import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth, db } from "../firebase/config";
import { doc, updateDoc } from 'firebase/firestore'
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    // sign the user out
    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      // update online state
      const { uid } = userCredential.user

      const userRef = doc(db, 'users', uid)

      await updateDoc(userRef, {
        online: true
      })

      if (!userCredential) {
        throw new Error('Could not complete Login')
      }

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: userCredential.user })
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }


    } catch (err) {
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

  return { login, isPending, error }
}