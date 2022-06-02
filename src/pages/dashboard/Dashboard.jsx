import Projectlist from '../../components/Projectlist'
import {useCollection} from '../../hooks/useCollection'

// Styles
import './Dashboard.css'

function Dashboard() {

  const {documents, error} = useCollection('projects')

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <Projectlist projects={ documents}/> }
    </div>
  )
}
export default Dashboard