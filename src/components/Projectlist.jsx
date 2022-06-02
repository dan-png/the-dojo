import { Link } from 'react-router-dom'
import Avatar from './Avatar'

// styles
import './Projectlist.css'

function Projectlist({projects}) {
  return (
    <div className='project-list'>
      {projects.length === 0 && <p>No Projects yet!!</p>}
      {projects.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <ul>
              {project.assignedUsersList.map(user => (
                <li key={user.photoURL}>
                  <Avatar src={ user.photoURL}/>
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  )
}
export default Projectlist