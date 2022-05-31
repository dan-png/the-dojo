import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'
// styles & images
import './Sidebar.css'
import {MdDashboard} from 'react-icons/md'
import {MdAdd} from 'react-icons/md'


function Sidebar() {
  const {user} = useAuthContext()
  return (
    <div className='sidebar'>
      <div className="side-content">
        <div className="user">
          <Avatar src={user.photoURL}/>
          <p>Hey, {user.displayName}</p>
        </div>
        <nav className='top'>
          <ul>
            <li>
              <NavLink to='/' className={({isActive})=> isActive ?'active': 'links'} end>
                
                <MdDashboard className='img'/>
                <span>Dashboard</span>
              </NavLink>

            </li>
            <li>
              <NavLink to='/create' className={(navData)=> navData.isActive ? 'active' : 'links' } end>
                <MdAdd  className='img'/>
                <span>New Project</span>
              </NavLink>

            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
export default Sidebar