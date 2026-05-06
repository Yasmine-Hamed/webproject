import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import ItemsList from './pages/ItemsList.jsx'
import ItemForm from './pages/ItemForm.jsx'
import ItemDetails from './pages/ItemDetails.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<ItemsList />} />
            <Route path="/items/new" element={<ItemForm />} />
            <Route path="/items/:id" element={<ItemDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
