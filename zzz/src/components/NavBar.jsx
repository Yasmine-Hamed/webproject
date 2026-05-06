import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <header className="navbar">
      <div className="nav-brand">ZZZ React App</div>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/items">Items</NavLink>
        <NavLink to="/items/new">Add Item</NavLink>
      </nav>
    </header>
  )
}

export default NavBar
