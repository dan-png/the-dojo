import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
// styles & Images
import './Navbar.css'
import {GiTempleGate } from 'react-icons/gi'

function Navbar() {
  const { logout, isPending } = useLogout()
  const {user} = useAuthContext()
  return (
    <div className='navbar'>
      <ul>
        <li className="logo">
          <GiTempleGate className='img'/>
          <span>Dojo</span>
        </li>
        {!user && 
          (<>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
          </>)
        }
        
        { user && (
          <li>
          {!isPending && <button className='btn' onClick={logout}>Logout</button>}
          {isPending && <button className='btn' disabled>Logging out...</button>}
        </li>
        )}
        
      </ul>
    </div>
  )
}
export default Navbar