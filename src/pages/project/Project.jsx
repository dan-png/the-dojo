import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import ProjectSummary from './ProjectSummary'

// style
import './Project.css'
import ProjectComments from './ProjectComments'


function Project() {
  const { id } = useParams()
  const { document, error } = useDocument('projects', id)
  
  if (error) {
    return <div className='error'>{ error }</div>
  }
  if (!document) {
    return <div className='loading'>Loading...</div>
  }

  return (
    <div className='project-details'>
      <ProjectSummary project={document} />
      <ProjectComments project={ document}/>
    </div>
  )
}
export default Project