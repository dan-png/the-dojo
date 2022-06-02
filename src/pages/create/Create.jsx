import { Timestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'

// Styles
import './Create.css'

const categories = [
  {value:'development', label: 'Development'},
  {value:'design', label: 'Design'},
  {value:'sales', label: 'Sales'},
  {value:'marketing', label: 'Marketing'},]

function Create() {
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])
  const { user } = useAuthContext()
  const {addDocument, response} = useFirestore('projects')
  const navigate = useNavigate()

  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

 
  useEffect(() => {
    if (documents) {
      const options = documents.map(user => {
        return {value: user, label: user.displayName}
      })
      setUsers(options)
    }
  },[documents])
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    setFormError(null)

    if (!category) {
      setFormError('Please select a project category')
      return
    }

    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to at least 1 user')
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })

    const project = {
      name,
      details,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }

    await addDocument(project)

    // re
    if (!response.error) {
      navigate('/')
    }
    
  }
  return (
    <div className='create-form'>
      <h2 className='page-title'>
        Create a New Project
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required />
        </label>
        <label>
          <span>Project details:</span>
          <textarea
            onChange={(e) => setDetails(e.target.value)}
            value={details}
            type="text"
            required />
        </label>
        <label>
          <span>Set project due date:</span>
          <input
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            type='date'
            required />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            onChange={(option)=>setCategory(option)}
            options={categories}
          />
        </label>
        <label >
          <span>Assigned to:</span>
          <Select
            onChange={(option)=> setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>
        
        <button className="btn">Add Project</button>
        {formError && <p className='error'>{formError }</p>}
      </form>
    </div>
  )
}
export default Create