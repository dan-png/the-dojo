import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase/config"

export const useDocument = (collectn, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  // realtime data for document
  useEffect(() => {
    const docRef = doc(db, collectn, id)
    const unsub = onSnapshot(docRef, (doc) => {
      if (doc.data()) {
        setDocument({ ...doc.data(), id: doc.id })
        setError(null)
      } else {
        setError('No such documents exists')
      }

    }, (err) => {
      console.log(err.message)
      setError('failed to get document')
    })

    // unsubscribe on unmount
    return () => unsub()
  }, [collectn, id])

  return { document, error }
}