import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api.js'

function ItemForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      await api.post('/items', { title, description })
      setMessage('Item added successfully.')
      setTitle('')
      setDescription('')
      navigate('/items')
    } catch (err) {
      setError('Could not add item. Please check the fields and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-content">
      <h2>Add New Item</h2>
      <form className="item-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter item title"
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter item description"
          />
        </label>

        <div className="form-actions">
          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Item'}
          </button>
        </div>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </section>
  )
}

export default ItemForm
