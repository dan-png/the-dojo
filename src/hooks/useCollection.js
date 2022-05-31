import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { db } from "../firebase/config"

export const useCollection = (collectn, _q, _ordBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // if we don't use a ref --> an infinite loop in useEffect
  // _q(uery) is an array and is 'different on every function call
  const q = useRef(_q).current
  const ordBy = useRef(_ordBy).current

  useEffect(() => {
    let ref = collection(db, collectn)

    if (q) {
      ref = query(ref, where(...q))
    }
    if (ordBy) {
      ref = query(ref, where(...q), orderBy(...ordBy))
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = []
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id })
      })

      // update state
      setDocuments(results)
      setError(null)

    }, (error) => {
      console.log(error)
      setError('Could not fetch the data')
    })

    // unsubscribe  on unmount
    return () => unsub()


  }, [collectn, q, ordBy])

  return { documents, error }
}
