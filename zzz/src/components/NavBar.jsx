import { NavLink, useNavigate } from 'react-router-dom'

function NavBar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="nav-brand">Student Management System</div>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        {token ? (
          <>
            <NavLink to="/items">Students</NavLink>
            <NavLink to="/items/new">Add Student</NavLink>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  )
}

export default NavBar
