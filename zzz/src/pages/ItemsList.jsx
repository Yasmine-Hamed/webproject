import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api.js'

function ItemsList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadItems = async () => {
    try {
      setLoading(true)
      const response = await api.get('/Student')
      setItems(response.data)
      setError('')
    } catch (err) {
      setError('Could not load students. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return
    try {
      await api.delete(`/Student/${id}`)
      setItems((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      setError('Failed to delete student.')
    }
  }

  return (
    <section className="page-content">
      <div className="page-header">
        <h2>Students</h2>
        <Link className="button" to="/items/new">
          Add New Student
        </Link>
      </div>

      {loading && <p>Loading students...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && items.length === 0 && <p>No students found.</p>}

      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item-card">
            <div>
              <h3>{item.firstName} {item.lastName}</h3>
              <p>{item.email}</p>
            </div>
            <div className="item-actions">
              <Link className="link-button" to={`/items/${item.id}`}>
                View / Edit
              </Link>
              <button className="button danger" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ItemsList
