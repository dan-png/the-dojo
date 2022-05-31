import { useState } from 'react'


// Styles
import './Create.css'

function Create() {
  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])


  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(name, details, dueDate)
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
          {/* category select here */}
        </label>
        <label>
          <span>Assigned to:</span>
          {/* assigned users select here */}
        </label>
        
        <button className="btn">Add Project</button>
      </form>
    </div>
  )
}
export default Create