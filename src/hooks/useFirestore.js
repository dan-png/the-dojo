

import { addDoc, collection, deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore"
import { useReducer, useState, useEffect } from "react"
import { db } from '../firebase/config'

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'UPDATED_DOCUMENT':
      return {
        isPending: false, document: action.payload, success: true, error: null
      }
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }

    default:
      return state
  }
}

export const useFirestore = (collectn) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // Collection Ref
  const ref = collection(db, collectn)



  // Only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (docn) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const createdAt = Timestamp.fromDate(new Date())
      const addedDocument = await addDoc(ref, { ...docn, createdAt })
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })

    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })

    }
  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {

      await deleteDoc(doc(db, collectn, id))
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })

    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete' })
    }
  }


  // update documents
  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const updatedDocument = await updateDoc(doc(db, collectn, id), updates)
      dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument })
      return updatedDocument

    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
      return null
    }
  }

  // Clean up function
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, updateDocument, response }
}