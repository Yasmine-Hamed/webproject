import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api.js'

function ItemDetails() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const loadItem = async () => {
      try {
        const response = await api.get(`/items/${id}`)
        setTitle(response.data.title)
        setDescription(response.data.description)
        setError('')
      } catch (err) {
        setError('Item not found or failed to load.')
      } finally {
        setLoading(false)
      }
    }
    loadItem()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')

    try {
      await api.put(`/items/${id}`, { title, description })
      setMessage('Item updated successfully.')
    } catch (err) {
      setError('Failed to update item. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <section className="page-content">
        <p>Loading item...</p>
      </section>
    )
  }

  return (
    <section className="page-content">
      <h2>Edit Item</h2>
      <form className="item-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <div className="form-actions">
          <button className="button" type="submit" disabled={saving}>
            {saving ? 'Updating...' : 'Update Item'}
          </button>
          <button className="button secondary" type="button" onClick={() => navigate('/items')}>
            Back to List
          </button>
        </div>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </section>
  )
}

export default ItemDetails
