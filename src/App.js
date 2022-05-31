import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { PrivateRoute } from './components/PrivateRoute'

// Pages and Components
import Create from './pages/create/Create'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Project from './pages/project/Project'
import Navbar from './components/Navbar';
import UsersStatusbar from './components/UsersStatusbar';

// Styles
import './App.css'
import Sidebar from './components/Sidebar';


function App() {

  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <Router>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              {/* users */}
              <Route element={<PrivateRoute user={user} redirectPath='/login' />}>
                <Route path='/' element={<Dashboard />} />
                <Route path='/create' element={<Create />} />
                <Route path='/projects/:id' element={<Project />} />
              </Route>

              {/* !users */}
              <Route element={<PrivateRoute user={!user} redirectPath='/' />}>
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
              </Route>
            </Routes>
          </div>
          {user && <UsersStatusbar />}
        </Router>
      )}

    </div>
  );
}

export default App
