import Projectlist from '../../components/Projectlist'
import {useCollection} from '../../hooks/useCollection'
import Projectfilter from './Projectfilter'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

// Styles
import './Dashboard.css'



function Dashboard() {
  const {user} = useAuthContext()
  const { documents, error } = useCollection('projects')
  const [currentFilter, setCurrentFilter] = useState('all')
  
  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const projects = documents ? documents.filter((document) => {
    switch (currentFilter) {
      case 'all':
        return true
      case 'mine':
        let assignedToMe = false
        document.assignedUsersList.forEach((u) => {
          if (user.uid === u.id) {
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        console.log(document.category, currentFilter)
        return document.category === currentFilter
      default:
        return true
    }
  }): null

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && (<Projectfilter
        currentFilter={currentFilter}
        changeFilter={changeFilter}
      />)}
      {projects && <Projectlist projects={ projects}/> }
    </div>
  )
}
export default Dashboard